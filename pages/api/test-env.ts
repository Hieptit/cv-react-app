import { NextApiRequest, NextApiResponse } from 'next'

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  res.status(200).json({
    NEXT_PUBLIC_SUPABASE_URL: process.env.NEXT_PUBLIC_SUPABASE_URL,
    // Không hiển thị ANON_KEY vì lý do bảo mật
    hasAnonKey: !!process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
  })
} 