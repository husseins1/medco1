import assert from 'node:assert/strict'
import { readFileSync } from 'node:fs'
import { createRequire } from 'node:module'
import { test } from 'node:test'
import { runInNewContext } from 'node:vm'
import { createServerClient, type CookieMethodsServer } from '@supabase/ssr'
import { NextRequest, type NextResponse } from 'next/server.js'
import ts from 'typescript'

const require = createRequire(import.meta.url)
const env = {
  NODE_ENV: 'production',
  NEXT_PUBLIC_SUPABASE_URL: 'https://project.supabase.co',
  NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY: 'test-publishable-key',
}

// Load the server modules with isolated dependencies; no real users or emails
// are needed, while callback tests still exercise the installed Supabase SDK.
function loadModule<T>(path: string, mocks: Record<string, unknown>): T {
  const source = readFileSync(new URL(path, import.meta.url), 'utf8')
  const { outputText } = ts.transpileModule(source, {
    compilerOptions: {
      module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2020, esModuleInterop: true,
    },
  })
  const exports: Record<string, unknown> = {}
  runInNewContext(outputText, {
    exports,
    require: (id: string): unknown => id in mocks ? mocks[id] : require(id),
    process: { env },
    URL,
  })
  return exports as T
}

interface CallbackModule {
  GET(request: NextRequest): Promise<NextResponse>
}

interface AuthOptions {
  verificationError?: boolean
  acceptanceError?: boolean
  refreshError?: boolean
}

function callbackHarness(options: AuthOptions = {}): {
  callback: CallbackModule
  calls: string[]
  accepted: string[][]
} {
  const calls: string[] = []
  const accepted: string[][] = []
  const user = { id: 'invited-user', email: 'invitee@example.com', aud: 'authenticated' }
  const sessionResponse = (refreshToken: string): object => ({
    access_token: 'test-access-token', refresh_token: refreshToken,
    token_type: 'bearer', expires_in: 3600, user,
  })
  const fetchAuth: typeof fetch = async (input, init): Promise<Response> => {
    const request = new Request(input, init)
    const url = new URL(request.url)
    calls.push(url.pathname)
    if (url.pathname === '/auth/v1/verify') {
      if (options.verificationError) {
        return Response.json({ msg: 'Token has expired or is invalid', code: 'otp_expired' }, { status: 403 })
      }
      return Response.json(sessionResponse('verified-refresh-token'))
    }
    if (url.pathname === '/auth/v1/token') {
      const body: unknown = await request.json()
      if (url.searchParams.get('grant_type') === 'pkce') {
        assert.equal((body as { auth_code: string }).auth_code, 'test-code')
        assert.equal((body as { code_verifier: string }).code_verifier, 'test-verifier')
        return Response.json(sessionResponse('verified-refresh-token'))
      }
      assert.equal((body as { refresh_token: string }).refresh_token, 'verified-refresh-token')
      if (options.refreshError) {
        return Response.json({ msg: 'Refresh failed', code: 'refresh_token_not_found' }, { status: 400 })
      }
      return Response.json(sessionResponse('rotated-refresh-token'))
    }
    assert.fail(`Unexpected auth request: ${url.pathname}`)
  }
  const callback = loadModule<CallbackModule>('../src/app/auth/callback/route.ts', {
    '@supabase/ssr': {
      createServerClient: (
        url: string, key: string, options: Parameters<typeof createServerClient>[2]
      ): ReturnType<typeof createServerClient> => createServerClient(url, key, {
        ...options, global: { fetch: fetchAuth },
      }),
    },
    'next/server': require('next/server'),
    '@/lib/invite': {
      acceptInvitation: async (...args: string[]): Promise<{ success: boolean; error?: string }> => {
        accepted.push(args)
        return options.acceptanceError
          ? { success: false, error: 'Invitation cancelled' }
          : { success: true }
      },
    },
    '@/lib/prisma': { profile: { findUnique: async (): Promise<object> => ({ id: user.id }) } },
    '@/lib/meta/capi': { sendMetaEvent: async (): Promise<void> => assert.fail('Unexpected Lead event') },
  })
  return { callback, calls, accepted }
}

function invitationRequest(query: string): NextRequest {
  const staleSession = {
    access_token: 'stale-access-token', refresh_token: 'revoked-refresh-token',
    expires_at: 1, user: { id: 'old-user', email: 'old@example.com' },
  }
  const cookie = `base64-${Buffer.from(JSON.stringify(staleSession)).toString('base64url')}`
  return new NextRequest(`https://tabibtree.com/auth/callback?${query}`, {
    headers: { cookie: `sb-project-auth-token=${cookie}` },
  })
}

for (const query of [
  'token_hash=test-token&type=signup&invitation_id=invitation-1',
  `token_hash=test-token&type=magiclink&redirect=${encodeURIComponent('https://tabibtree.com/auth/callback?invitation_id=invitation-1')}`,
]) {
  test(`invitation verifies and refreshes its new session: ${query.split('&')[1]}`, async () => {
    const { callback, calls, accepted } = callbackHarness()
    const response = await callback.GET(invitationRequest(query))
    assert.equal(response.headers.get('location'), 'https://tabibtree.com/dashboard')
    assert.deepEqual(calls, ['/auth/v1/verify', '/auth/v1/token'])
    assert.deepEqual(accepted, [['invitation-1', 'invited-user', 'invitee@example.com']])
    const cookie = response.cookies.get('sb-project-auth-token')
    assert.ok(cookie)
    assert.ok(cookie.value.startsWith('base64-'))
    const session = JSON.parse(Buffer.from(cookie.value.slice(7), 'base64url').toString()) as { refresh_token: string }
    assert.equal(session.refresh_token, 'rotated-refresh-token')
    assert.equal(cookie.httpOnly, true)
    assert.equal(cookie.secure, true)
  })
}

test('PKCE retains code verifier while isolating the old browser session', async () => {
  const { callback, calls, accepted } = callbackHarness()
  const request = invitationRequest('code=test-code&invitation_id=invitation-1')
  request.cookies.set('sb-project-auth-token-code-verifier',
    `base64-${Buffer.from(JSON.stringify('test-verifier')).toString('base64url')}`)
  const response = await callback.GET(request)
  assert.equal(response.headers.get('location'), 'https://tabibtree.com/dashboard')
  assert.deepEqual(calls, ['/auth/v1/token', '/auth/v1/token'])
  assert.deepEqual(accepted, [['invitation-1', 'invited-user', 'invitee@example.com']])
})

test('verification replaces old chunked session cookies', async () => {
  const { callback, calls } = callbackHarness()
  const request = invitationRequest('token_hash=token&type=magiclink&invitation_id=invitation-1')
  const value = request.cookies.get('sb-project-auth-token')!.value
  request.cookies.delete('sb-project-auth-token')
  request.cookies.set('sb-project-auth-token.0', value.slice(0, 40))
  request.cookies.set('sb-project-auth-token.1', value.slice(40))
  const response = await callback.GET(request)
  assert.equal(response.headers.get('location'), 'https://tabibtree.com/dashboard')
  assert.deepEqual(calls, ['/auth/v1/verify', '/auth/v1/token'])
  assert.equal(response.cookies.get('sb-project-auth-token.0')?.maxAge, 0)
  assert.equal(response.cookies.get('sb-project-auth-token.1')?.maxAge, 0)
  assert.ok(response.cookies.get('sb-project-auth-token')?.value)
})

test('invalid OTP reports verification error without falling back to stale browser session', async () => {
  const { callback, calls, accepted } = callbackHarness({ verificationError: true })
  const response = await callback.GET(invitationRequest('token_hash=expired&type=magiclink&invitation_id=invitation-1'))
  const destination = new URL(response.headers.get('location')!)
  assert.equal(destination.pathname, '/auth/auth-error')
  assert.equal(destination.searchParams.get('error'), 'Token has expired or is invalid')
  assert.deepEqual(calls, ['/auth/v1/verify'])
  assert.deepEqual(accepted, [])
})

for (const options of [{ acceptanceError: true }, { refreshError: true }]) {
  test(`invitation failure retains auth cookies: ${Object.keys(options)[0]}`, async () => {
    const { callback } = callbackHarness(options)
    const response = await callback.GET(invitationRequest('token_hash=token&type=magiclink&invitation_id=invitation-1'))
    assert.equal(new URL(response.headers.get('location')!).pathname, '/auth/auth-error')
    assert.ok(response.headers.get('set-cookie'))
  })
}

for (const query of ['token_hash=token&type=unknown', 'token_hash=', 'type=magiclink', 'redirect=http%3A%2F%2F%5B']) {
  test(`malformed callback stays on auth error page: ${query}`, async () => {
    const { callback, calls } = callbackHarness()
    const response = await callback.GET(invitationRequest(query))
    assert.equal(new URL(response.headers.get('location')!).pathname, '/auth/auth-error')
    assert.deepEqual(calls, [])
  })
}

test('callback blocks external next destination after verification', async () => {
  const { callback } = callbackHarness()
  const response = await callback.GET(invitationRequest('token_hash=token&type=magiclink&next=//other.example'))
  assert.equal(response.headers.get('location'), 'https://tabibtree.com/dashboard')
})

test('proxy leaves callback verification to the route even with revoked browser cookies', async () => {
  const middleware = loadModule<{ updateSession(request: NextRequest): Promise<NextResponse> }>(
    '../src/utils/supabase/middleware.ts', {
      '@supabase/ssr': { createServerClient: (): never => assert.fail('Proxy must not create callback auth client') },
      'next/server': require('next/server'),
    }
  )
  const response = await middleware.updateSession(invitationRequest('token_hash=token&type=magiclink'))
  assert.equal(response.headers.get('x-middleware-next'), '1')
})

for (const isSignedIn of [false, true]) {
  test(`proxy redirect preserves session cookie changes: signed in=${isSignedIn}`, async () => {
    const middleware = loadModule<{ updateSession(request: NextRequest): Promise<NextResponse> }>(
      '../src/utils/supabase/middleware.ts', {
        '@supabase/ssr': {
          createServerClient: (_url: string, _key: string, options: { cookies: CookieMethodsServer }): object => ({
            auth: { getUser: async (): Promise<object> => {
              await options.cookies.setAll?.([{
                name: 'sb-project-auth-token', value: isSignedIn ? 'refreshed-session' : '',
                options: { maxAge: isSignedIn ? 3600 : 0, path: '/' },
              }], {})
              return { data: { user: isSignedIn ? { id: 'user-1' } : null } }
            } },
          }),
        },
        'next/server': require('next/server'),
      }
    )
    const path = isSignedIn ? '/signup' : '/dashboard'
    const response = await middleware.updateSession(new NextRequest(`https://tabibtree.com${path}`))
    assert.equal(new URL(response.headers.get('location')!).pathname, isSignedIn ? '/dashboard' : '/signup')
    assert.equal(response.cookies.get('sb-project-auth-token')?.value, isSignedIn ? 'refreshed-session' : '')
    assert.equal(response.cookies.get('sb-project-auth-token')?.maxAge, isSignedIn ? 3600 : 0)
  })
}

test('invitation email uses Supabase hash and returned verification type', async () => {
  let emailHtml = ''
  const actions = loadModule<{ createInvitation(data: FormData): Promise<{ success?: boolean }> }>(
    '../src/app/dashboard/invite/actions.ts', {
      '@/utils/supabase/server': { createClient: async (): Promise<object> => ({
        auth: { getUser: async (): Promise<object> => ({ data: { user: { id: 'admin', email: 'admin@example.com' } } }) },
      }) },
      '@/lib/prisma': {
        profile: { findUnique: async (args: { where: { id?: string } }): Promise<object | null> =>
          args.where.id ? { role: 'ADMIN', tenantId: 'tenant-1' } : null },
        invitation: {
          findFirst: async (): Promise<null> => null,
          create: async (): Promise<object> => ({ id: 'invitation-1' }),
        },
      },
      '@/lib/invite': { getInviteExpiry: (): Date => new Date() },
      'next/cache': { revalidatePath: (): void => {} },
      '@/lib/plans/enforce': { enforceDoctorLimit: async (): Promise<object> => ({ allowed: true }) },
      '@/utils/supabase/service-role': { serviceRoleClient: { auth: { admin: {
        generateLink: async (): Promise<object> => ({ data: { properties: {
          action_link: 'https://project.supabase.co/auth/v1/verify?token=wrong&type=magiclink',
          hashed_token: 'returned-hash', verification_type: 'signup',
        } }, error: null }),
      } } } },
      '@/lib/site-url': { absoluteUrl: (path: string): string => `https://tabibtree.com${path}` },
      '@/lib/resend': { emails: { send: async (email: { html: string }): Promise<object> => {
        emailHtml = email.html
        return { error: null }
      } } },
    }
  )
  const data = new FormData()
  data.set('email', 'invitee@example.com')
  data.set('role', 'RECEPTIONIST')
  assert.equal((await actions.createInvitation(data)).success, true)
  const link = new URL(emailHtml.match(/href="([^"]+)"/)![1])
  assert.equal(link.searchParams.get('token_hash'), 'returned-hash')
  assert.equal(link.searchParams.get('type'), 'signup')
  assert.equal(link.searchParams.get('invitation_id'), 'invitation-1')
  assert.equal(link.searchParams.has('redirect'), false)
})
