import { createClient } from '@supabase/supabase-js'

const url = process.env.NEXT_PUBLIC_SUPABASE_URL!
const serviceRole = process.env.SUPABASE_SERVICE_ROLE_KEY
const anonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

// Server-side Supabase instance — prefer service role key (keep secret).
// If service role key is not provided (or is an empty string), fall back to the anon key
// so the dev server and API don't crash. Note: fallback may be restricted by RLS.
const keyToUse = serviceRole || anonKey
if (!url || !keyToUse) {
  // let createClient throw later if missing — but avoid accessing undefined vars here
  // (we still call createClient to keep code path consistent)
}

export const supabaseAdmin = createClient(url, keyToUse, {
  auth: { persistSession: false },
})

// Export flag so code can detect whether admin privileges are available
export const usingServiceRole = Boolean(serviceRole)

// Debug helper: do not log secrets. This prints presence of required envs.
if (process.env.NODE_ENV !== 'production') {
  try {
    // eslint-disable-next-line no-console
    console.log('supabase: urlPresent=', Boolean(url), 'anonKeyPresent=', Boolean(process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY), 'serviceRolePresent=', Boolean(serviceRole))
  } catch (e) {
    /* ignore */
  }
}
