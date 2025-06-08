"use client"

import type React from "react"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { supabase, type Project } from "@/lib/supabase"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Alert, AlertDescription } from "@/components/ui/alert"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { ArrowLeft, Plus, Edit, Trash2, ExternalLink, Github } from "lucide-react"
import Link from "next/link"

export default function ProjectsSettingsPage() {
  const [user, setUser] = useState<any>(null)
  const [projects, setProjects] = useState<Project[]>([])
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState("")
  const [success, setSuccess] = useState("")
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [editingProject, setEditingProject] = useState<Project | null>(null)
  const router = useRouter()

  const [formData, setFormData] = useState({
    name: "",
    description: "",
    demo_url: "",
    repository_url: "",
  })

  useEffect(() => {
    const getProjects = async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser()
      if (!user) {
        router.push("/auth/signin")
        return
      }

      setUser(user)

      const { data: projects } = await supabase
        .from("projects")
        .select("*")
        .eq("user_id", user.id)
        .order("created_at", { ascending: false })

      if (projects) {
        setProjects(projects)
      }

      setLoading(false)
    }

    getProjects()
  }, [router])

  const resetForm = () => {
    setFormData({
      name: "",
      description: "",
      demo_url: "",
      repository_url: "",
    })
    setEditingProject(null)
  }

  const handleEdit = (project: Project) => {
    setEditingProject(project)
    setFormData({
      name: project.name,
      description: project.description || "",
      demo_url: project.demo_url || "",
      repository_url: project.repository_url || "",
    })
    setIsDialogOpen(true)
  }

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault()
    setSaving(true)
    setError("")
    setSuccess("")

    try {
      if (editingProject) {
        // Update existing project
        const { error } = await supabase
          .from("projects")
          .update({
            ...formData,
            updated_at: new Date().toISOString(),
          })
          .eq("id", editingProject.id)

        if (error) throw error

        setProjects((prev) =>
          prev.map((p) =>
            p.id === editingProject.id ? { ...p, ...formData, updated_at: new Date().toISOString() } : p,
          ),
        )
        setSuccess("Project updated successfully!")
      } else {
        // Create new project
        const { data, error } = await supabase
          .from("projects")
          .insert([
            {
              ...formData,
              user_id: user.id,
            },
          ])
          .select()
          .single()

        if (error) throw error

        setProjects((prev) => [data, ...prev])
        setSuccess("Project added successfully!")
      }

      setIsDialogOpen(false)
      resetForm()
    } catch (error: any) {
      setError(error.message)
    } finally {
      setSaving(false)
    }
  }

  const handleDelete = async (projectId: string) => {
    if (!confirm("Are you sure you want to delete this project?")) return

    try {
      const { error } = await supabase.from("projects").delete().eq("id", projectId)

      if (error) throw error

      setProjects((prev) => prev.filter((p) => p.id !== projectId))
      setSuccess("Project deleted successfully!")
    } catch (error: any) {
      setError(error.message)
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600"></div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-emerald-100">
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-4">
            <Link href="/dashboard">
              <Button variant="outline" size="sm">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to Dashboard
              </Button>
            </Link>
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Projects Settings</h1>
              <p className="text-gray-600 mt-2">Manage your portfolio projects</p>
            </div>
          </div>

          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>
              <Button onClick={resetForm}>
                <Plus className="h-4 w-4 mr-2" />
                Add Project
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-md">
              <DialogHeader>
                <DialogTitle>{editingProject ? "Edit Project" : "Add New Project"}</DialogTitle>
                <DialogDescription>
                  {editingProject ? "Update your project details" : "Add a new project to your portfolio"}
                </DialogDescription>
              </DialogHeader>
              <form onSubmit={handleSave} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Project Name</Label>
                  <Input
                    id="name"
                    type="text"
                    placeholder="Enter project name"
                    value={formData.name}
                    onChange={(e) => setFormData((prev) => ({ ...prev, name: e.target.value }))}
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="description">Description</Label>
                  <Textarea
                    id="description"
                    placeholder="Describe your project..."
                    value={formData.description}
                    onChange={(e) => setFormData((prev) => ({ ...prev, description: e.target.value }))}
                    rows={3}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="demo_url">Demo URL</Label>
                  <Input
                    id="demo_url"
                    type="url"
                    placeholder="https://your-demo.com"
                    value={formData.demo_url}
                    onChange={(e) => setFormData((prev) => ({ ...prev, demo_url: e.target.value }))}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="repository_url">Repository URL</Label>
                  <Input
                    id="repository_url"
                    type="url"
                    placeholder="https://github.com/username/repo"
                    value={formData.repository_url}
                    onChange={(e) => setFormData((prev) => ({ ...prev, repository_url: e.target.value }))}
                  />
                </div>

                <Button type="submit" className="w-full" disabled={saving}>
                  {saving ? "Saving..." : editingProject ? "Update Project" : "Add Project"}
                </Button>
              </form>
            </DialogContent>
          </Dialog>
        </div>

        {error && (
          <Alert variant="destructive" className="mb-6">
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}

        {success && (
          <Alert className="mb-6">
            <AlertDescription>{success}</AlertDescription>
          </Alert>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {projects.map((project) => (
            <Card key={project.id}>
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div>
                    <CardTitle className="text-lg">{project.name}</CardTitle>
                    <CardDescription className="mt-2">{project.description}</CardDescription>
                  </div>
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm" onClick={() => handleEdit(project)}>
                      <Edit className="h-4 w-4" />
                    </Button>
                    <Button variant="outline" size="sm" onClick={() => handleDelete(project.id)}>
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="flex gap-2">
                  {project.demo_url && (
                    <Button variant="outline" size="sm" asChild>
                      <a href={project.demo_url} target="_blank" rel="noopener noreferrer">
                        <ExternalLink className="h-4 w-4 mr-2" />
                        Demo
                      </a>
                    </Button>
                  )}
                  {project.repository_url && (
                    <Button variant="outline" size="sm" asChild>
                      <a href={project.repository_url} target="_blank" rel="noopener noreferrer">
                        <Github className="h-4 w-4 mr-2" />
                        Code
                      </a>
                    </Button>
                  )}
                </div>
              </CardContent>
            </Card>
          ))}

          {projects.length === 0 && (
            <div className="col-span-full text-center py-12">
              <p className="text-gray-500 text-lg">No projects yet</p>
              <p className="text-gray-400 mt-2">Add your first project to get started</p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
