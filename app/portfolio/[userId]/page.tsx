"use client"

import type React from "react"

import { useEffect, useState } from "react"
import { useParams } from "next/navigation"
import { supabase, type Profile, type Project } from "@/lib/supabase"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { ExternalLink, Github, Mail, User } from "lucide-react"

export default function PortfolioPage() {
  const params = useParams()
  const userId = params.userId as string

  const [profile, setProfile] = useState<Profile | null>(null)
  const [projects, setProjects] = useState<Project[]>([])
  const [loading, setLoading] = useState(true)
  const [contactLoading, setContactLoading] = useState(false)
  const [contactSuccess, setContactSuccess] = useState("")
  const [contactError, setContactError] = useState("")
  const [isContactOpen, setIsContactOpen] = useState(false)

  const [contactForm, setContactForm] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  })

  useEffect(() => {
    const getPortfolioData = async () => {
      try {
        // Get profile
        const { data: profile } = await supabase.from("profiles").select("*").eq("id", userId).single()

        if (profile) {
          setProfile(profile)
        }

        // Get projects
        const { data: projects } = await supabase
          .from("projects")
          .select("*")
          .eq("user_id", userId)
          .order("created_at", { ascending: false })

        if (projects) {
          setProjects(projects)
        }
      } catch (error) {
        console.error("Error fetching portfolio data:", error)
      } finally {
        setLoading(false)
      }
    }

    if (userId) {
      getPortfolioData()
    }
  }, [userId])

  const handleContactSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setContactLoading(true)
    setContactError("")
    setContactSuccess("")

    try {
      // In a real app, you would send this to your email service
      // For demo purposes, we'll just show a success message
      await new Promise((resolve) => setTimeout(resolve, 1000))

      setContactSuccess("Message sent successfully! The portfolio owner will get back to you soon.")
      setContactForm({ name: "", email: "", subject: "", message: "" })
      setTimeout(() => {
        setIsContactOpen(false)
        setContactSuccess("")
      }, 2000)
    } catch (error) {
      setContactError("Failed to send message. Please try again.")
    } finally {
      setContactLoading(false)
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600"></div>
      </div>
    )
  }

  if (!profile) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-2">Portfolio Not Found</h1>
          <p className="text-gray-600">This portfolio doesn't exist or is not public.</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-gray-100">
      {/* Header Section */}
      <div className="bg-white shadow-sm">
        <div className="container mx-auto px-4 py-12 max-w-4xl">
          <div className="flex flex-col md:flex-row items-center md:items-start gap-8">
            <Avatar className="h-32 w-32">
              <AvatarImage src={profile.avatar_url || ""} />
              <AvatarFallback className="text-2xl">
                <User className="h-12 w-12" />
              </AvatarFallback>
            </Avatar>

            <div className="flex-1 text-center md:text-left">
              <h1 className="text-4xl font-bold text-gray-900 mb-2">{profile.name || "Anonymous User"}</h1>
              {profile.job_title && <p className="text-xl text-blue-600 font-medium mb-4">{profile.job_title}</p>}
              {profile.bio && <p className="text-gray-600 text-lg leading-relaxed mb-6">{profile.bio}</p>}

              <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
                <Dialog open={isContactOpen} onOpenChange={setIsContactOpen}>
                  <DialogTrigger asChild>
                    <Button className="flex items-center gap-2">
                      <Mail className="h-4 w-4" />
                      Contact Me
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="max-w-md">
                    <DialogHeader>
                      <DialogTitle>Send a Message</DialogTitle>
                      <DialogDescription>Get in touch with {profile.name || "this person"}</DialogDescription>
                    </DialogHeader>
                    <form onSubmit={handleContactSubmit} className="space-y-4">
                      {contactError && (
                        <Alert variant="destructive">
                          <AlertDescription>{contactError}</AlertDescription>
                        </Alert>
                      )}

                      {contactSuccess && (
                        <Alert>
                          <AlertDescription>{contactSuccess}</AlertDescription>
                        </Alert>
                      )}

                      <div className="space-y-2">
                        <Label htmlFor="contact-name">Your Name</Label>
                        <Input
                          id="contact-name"
                          type="text"
                          placeholder="Enter your name"
                          value={contactForm.name}
                          onChange={(e) => setContactForm((prev) => ({ ...prev, name: e.target.value }))}
                          required
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="contact-email">Your Email</Label>
                        <Input
                          id="contact-email"
                          type="email"
                          placeholder="Enter your email"
                          value={contactForm.email}
                          onChange={(e) => setContactForm((prev) => ({ ...prev, email: e.target.value }))}
                          required
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="contact-subject">Subject</Label>
                        <Input
                          id="contact-subject"
                          type="text"
                          placeholder="What's this about?"
                          value={contactForm.subject}
                          onChange={(e) => setContactForm((prev) => ({ ...prev, subject: e.target.value }))}
                          required
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="contact-message">Message</Label>
                        <Textarea
                          id="contact-message"
                          placeholder="Your message..."
                          value={contactForm.message}
                          onChange={(e) => setContactForm((prev) => ({ ...prev, message: e.target.value }))}
                          rows={4}
                          required
                        />
                      </div>

                      <Button type="submit" className="w-full" disabled={contactLoading}>
                        {contactLoading ? "Sending..." : "Send Message"}
                      </Button>
                    </form>
                  </DialogContent>
                </Dialog>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Projects Section */}
      <div className="container mx-auto px-4 py-12 max-w-4xl">
        <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">My Projects</h2>

        {projects.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {projects.map((project) => (
              <Card key={project.id} className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <CardTitle className="text-xl">{project.name}</CardTitle>
                  <CardDescription className="text-base">{project.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex gap-3">
                    {project.demo_url && (
                      <Button variant="outline" size="sm" asChild>
                        <a href={project.demo_url} target="_blank" rel="noopener noreferrer">
                          <ExternalLink className="h-4 w-4 mr-2" />
                          Live Demo
                        </a>
                      </Button>
                    )}
                    {project.repository_url && (
                      <Button variant="outline" size="sm" asChild>
                        <a href={project.repository_url} target="_blank" rel="noopener noreferrer">
                          <Github className="h-4 w-4 mr-2" />
                          Source Code
                        </a>
                      </Button>
                    )}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg">No projects to display yet</p>
            <p className="text-gray-400 mt-2">Check back later for updates!</p>
          </div>
        )}
      </div>

      {/* Footer */}
      <footer className="bg-white border-t mt-12">
        <div className="container mx-auto px-4 py-8 text-center">
          <p className="text-gray-600">© 2024 {profile.name || "Portfolio"}. Built with Next.js and Supabase.</p>
        </div>
      </footer>
    </div>
  )
}
