import { createServerClient } from '@supabase/ssr'
import { NextResponse, type NextRequest } from 'next/server'
import type { EmailOtpType, Session, User } from '@supabase/supabase-js'
import { acceptInvitation } from '@/lib/invite'
import { sendMetaEvent } from '@/lib/meta/capi'
import prisma from '@/lib/prisma'
import { z } from 'zod'

const emailOtpTypeSchema = z.enum([
  'email', 'signup', 'invite', 'magiclink', 'recovery', 'email_change',
] satisfies EmailOtpType[])

function getRedirectUrl(request: Request, origin: string, path: string): string {
  const forwardedHost = request.headers.get('x-forwarded-host')
  const base = process.env.NODE_ENV !== 'development' && forwardedHost
    ? `https://${forwardedHost}`
    : origin
  try {
    const destination = new URL(path, base)
    if (destination.origin === new URL(base).origin) return destination.toString()
  } catch {
    // Invalid destinations must not prevent the auth link from being verified.
  }
  return new URL('/dashboard', base).toString()
}

export async function GET(request: NextRequest): Promise<NextResponse> {
  const { searchParams, origin } = new URL(request.url)
  const response = NextResponse.redirect(
    getRedirectUrl(request, origin, searchParams.get('next') || '/dashboard')
  )

  function authError(message: string): NextResponse {
    const url = new URL(getRedirectUrl(request, origin, '/auth/auth-error'))
    url.searchParams.set('error', message)
    // Keep session updates and cookie deletions on error redirects too.
    response.headers.set('Location', url.toString())
    return response
  }

  let invitationId = searchParams.get('invitation_id')
  const legacyRedirect = searchParams.get('redirect')
  if (!invitationId && legacyRedirect) {
    try {
      invitationId = new URL(legacyRedirect, origin).searchParams.get('invitation_id')
    } catch {
      return authError('Invalid invitation redirect')
    }
  }

  const code = searchParams.get('code')
  const tokenHash = searchParams.get('token_hash')
  const type = emailOtpTypeSchema.safeParse(searchParams.get('type'))
  if (!code && (searchParams.has('token_hash') || searchParams.has('type'))) {
    if (!tokenHash || !type.success) return authError('Invalid verification parameters')
  }

  const hasAuthCredentials = Boolean(code || tokenHash)
  // Supabase's initial auth listener reads storage before verification. Hide
  // the previous session, but retain its cookie names for stale chunk cleanup.
  const authCookies = new Map(request.cookies.getAll().map(({ name, value }) => [
    name,
    hasAuthCredentials && /^sb-.+-auth-token(?:\.\d+)?$/.test(name) ? '' : value,
  ]))

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY!,
    {
      cookies: {
        getAll() {
          return Array.from(authCookies, ([name, value]) => ({ name, value }))
        },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value, options }) => {
            authCookies.set(name, value)
            request.cookies.set(name, value)
            response.cookies.set(name, value, {
              ...options,
              sameSite: 'lax',
              httpOnly: true,
              secure: process.env.NODE_ENV === 'production',
              path: '/',
            })
          })
        },
      },
    }
  )

  async function handleAuthSuccess(user: User, session?: Session | null): Promise<NextResponse> {
    if (invitationId) {
      if (!user.email) return authError('Missing invitation email')

      const result = await acceptInvitation(invitationId, user.id, user.email)
      if (!result.success) return authError(result.error || 'Invitation acceptance failed')

      // Refresh the verified session after Profile changes so the JWT contains
      // the invited role and tenant, even if the browser arrived with old cookies.
      const { error } = await supabase.auth.refreshSession(session ?? undefined)
      if (error) return authError(error.message)
    } else if (user.email) {
      const profile = await prisma.profile.findUnique({
        where: { email: user.email },
        select: { id: true },
      })
      if (!profile) await sendMetaEvent('Lead', { email: user.email })
    }
    return response
  }

  if (code) {
    const { data, error } = await supabase.auth.exchangeCodeForSession(code)
    if (error) return authError(error.message)
    if (!data.user || !data.session) return authError('Missing verified session')
    return handleAuthSuccess(data.user, data.session)
  }

  if (tokenHash && type.success) {
    const { data, error } = await supabase.auth.verifyOtp({
      token_hash: tokenHash,
      type: type.data,
    })
    // A failed one-time link must not fall back to a different browser user.
    if (error) return authError(error.message)
    if (!data.user || !data.session) return authError('Missing verified session')
    return handleAuthSuccess(data.user, data.session)
  }

  const { data: { user }, error } = await supabase.auth.getUser()
  if (error || !user) return authError(error?.message || 'Missing authenticated user')
  return handleAuthSuccess(user)
}
