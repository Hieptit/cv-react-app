"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { supabase } from "@/lib/supabase"
import { Button } from "@/components/ui/button"
import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { User, Briefcase, Mail, ArrowRight } from "lucide-react"
import Link from "next/link"

export default function HomePage() {
  const [user, setUser] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const router = useRouter()

  useEffect(() => {
    const checkUser = async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser()
      setUser(user)
      setLoading(false)

      if (user) {
        router.push("/dashboard")
      }
    }

    checkUser()
  }, [router])

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600"></div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-pink-100">
      {/* Hero Section */}
      <div className="container mx-auto px-4 py-16 text-center">
        <h1 className="text-5xl font-bold text-gray-900 mb-6">Portfolio Management Platform</h1>
        <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
          Create, manage, and showcase your professional portfolio with ease. Build your online presence and connect
          with opportunities.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link href="/auth/signup">
            <Button size="lg" className="flex items-center gap-2">
              Get Started
              <ArrowRight className="h-4 w-4" />
            </Button>
          </Link>
          <Link href="/auth/signin">
            <Button variant="outline" size="lg">
              Sign In
            </Button>
          </Link>
        </div>
      </div>

      {/* Features Section */}
      <div className="container mx-auto px-4 py-16">
        <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">
          Everything you need to showcase your work
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
          <Card className="text-center">
            <CardHeader>
              <User className="h-12 w-12 text-blue-600 mx-auto mb-4" />
              <CardTitle>Profile Management</CardTitle>
              <CardDescription>
                Create and customize your professional profile with photo, bio, and contact information
              </CardDescription>
            </CardHeader>
          </Card>

          <Card className="text-center">
            <CardHeader>
              <Briefcase className="h-12 w-12 text-green-600 mx-auto mb-4" />
              <CardTitle>Project Showcase</CardTitle>
              <CardDescription>
                Add and manage your projects with descriptions, demo links, and source code repositories
              </CardDescription>
            </CardHeader>
          </Card>

          <Card className="text-center">
            <CardHeader>
              <Mail className="h-12 w-12 text-purple-600 mx-auto mb-4" />
              <CardTitle>Easy Contact</CardTitle>
              <CardDescription>
                Let visitors contact you directly through your portfolio with built-in contact forms
              </CardDescription>
            </CardHeader>
          </Card>
        </div>
      </div>

      {/* CTA Section */}
      <div className="bg-white">
        <div className="container mx-auto px-4 py-16 text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Ready to build your portfolio?</h2>
          <p className="text-gray-600 mb-8">Join thousands of professionals showcasing their work</p>
          <Link href="/auth/signup">
            <Button size="lg">Create Your Portfolio Today</Button>
          </Link>
        </div>
      </div>
    </div>
  )
}
