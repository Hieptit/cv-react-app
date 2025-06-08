import { createClient } from "@supabase/supabase-js"

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

export type Profile = {
  id: string
  name: string | null
  job_title: string | null
  bio: string | null
  avatar_url: string | null
  email: string | null
  created_at: string
  updated_at: string
}

export type Project = {
  id: string
  user_id: string
  name: string
  description: string | null
  demo_url: string | null
  repository_url: string | null
  created_at: string
  updated_at: string
}
