"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { supabase } from "@/lib/supabase"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { User, Settings, FolderOpen, Eye, LogOut } from "lucide-react"
import Link from "next/link"

export default function DashboardPage() {
  const [user, setUser] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const router = useRouter()

  useEffect(() => {
    const getUser = async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser()
      if (!user) {
        router.push("/auth/signin")
        return
      }
      setUser(user)
      setLoading(false)
    }

    getUser()
  }, [router])

  const handleSignOut = async () => {
    await supabase.auth.signOut()
    router.push("/auth/signin")
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600"></div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="container mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
            <p className="text-gray-600 mt-2">Welcome back, {user?.user_metadata?.name || user?.email}!</p>
          </div>
          <Button onClick={handleSignOut} variant="outline" className="flex items-center gap-2">
            <LogOut className="h-4 w-4" />
            Sign Out
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <Card className="hover:shadow-lg transition-shadow cursor-pointer">
            <Link href="/settings/profile">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <User className="h-5 w-5 text-blue-600" />
                  Profile Settings
                </CardTitle>
                <CardDescription>Update your profile information, job title, and bio</CardDescription>
              </CardHeader>
              <CardContent>
                <Button className="w-full">
                  <Settings className="h-4 w-4 mr-2" />
                  Manage Profile
                </Button>
              </CardContent>
            </Link>
          </Card>

          <Card className="hover:shadow-lg transition-shadow cursor-pointer">
            <Link href="/settings/projects">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <FolderOpen className="h-5 w-5 text-green-600" />
                  Projects Settings
                </CardTitle>
                <CardDescription>Add, edit, and manage your portfolio projects</CardDescription>
              </CardHeader>
              <CardContent>
                <Button className="w-full">
                  <Settings className="h-4 w-4 mr-2" />
                  Manage Projects
                </Button>
              </CardContent>
            </Link>
          </Card>

          <Card className="hover:shadow-lg transition-shadow cursor-pointer">
            <Link href={`/portfolio/${user?.id}`}>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Eye className="h-5 w-5 text-purple-600" />
                  View Portfolio
                </CardTitle>
                <CardDescription>See how your portfolio looks to visitors</CardDescription>
              </CardHeader>
              <CardContent>
                <Button className="w-full">
                  <Eye className="h-4 w-4 mr-2" />
                  View Portfolio
                </Button>
              </CardContent>
            </Link>
          </Card>
        </div>
      </div>
    </div>
  )
}
