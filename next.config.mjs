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
    NEXT_PUBLIC_SUPABASE_URL: 'https://fnxteqtnogvkrqtazkyd.supabase.co',
    NEXT_PUBLIC_SUPABASE_ANON_KEY: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZueHRlcXRub2d2a3JxdGF6a3lkIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDk2MDkxNDMsImV4cCI6MjA2NTE4NTE0M30.4ArywxNUNRJn5A-NQefVrFlvO1VA9qhBWYWhpYRiOxM',
    NEXT_PUBLIC_SITE_URL: 'http://45.76.161.44'
  }
}

export default nextConfig
