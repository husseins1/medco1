'use server'

import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'
import { createClient } from '@/utils/supabase/server'

export async function clearStuckAuthSession(): Promise<void> {
  const supabase = await createClient()
  try {
    await supabase.auth.signOut()
  } catch {
    // Best-effort revocation; local cookie cleanup below is what unblocks the user.
  }

  const cookieStore = await cookies()
  for (const { name } of cookieStore.getAll()) {
    if (name.startsWith('sb-')) {
      cookieStore.delete(name)
    }
  }

  redirect('/signup')
}
