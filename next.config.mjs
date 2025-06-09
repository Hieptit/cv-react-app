/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    unoptimized: true,
  },
  env: {
    NEXT_PUBLIC_SUPABASE_URL: 'https://yhbwfspcdrgnnpzkqmag.supabase.co',
    NEXT_PUBLIC_SUPABASE_ANON_KEY: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InloYndmc3BjZHJnbm5wemtxbWFnIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDk0MDEyMjAsImV4cCI6MjA2NDk3NzIyMH0.G1RiH_N5FyM-EjV4jqdYlBcYESPpKNZSMmiU1NkQOx0'
  }
}

export default nextConfig
