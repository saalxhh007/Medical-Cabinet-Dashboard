"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Upload, X, Plus } from "lucide-react"
import axios from "axios"

interface AddDocumentDialogProps {
  onAddDocument: (document: any) => void
}

export function AddDocumentDialog({ onAddDocument }: AddDocumentDialogProps) {
  const [open, setOpen] = useState(false)
  const [formData, setFormData] = useState({
    name: "",
    type: "",
    size: "",
    patientFirstName: "",
    patientLastName: "",
    category: "",
    filePath: "",
  })
  const [tags, setTags] = useState<string[]>([])
  const [newTag, setNewTag] = useState("")
  const [file, setFile] = useState<File | null>(null)
  
  const apiUrl = process.env.NEXT_PUBLIC_DASHBOARD_API_URL

  const documentTypes = [
    { value: "medical-record", label: "Medical Record" },
    { value: "lab-result", label: "Lab Result" },
    { value: "prescription", label: "Prescription" },
    { value: "image", label: "Medical Image" },
    { value: "report", label: "Report" },
    { value: "other", label: "Other" },
  ]

  const categories = [
    "Medical Records",
    "Lab Results",
    "Medical Images",
    "Prescriptions",
    "Reports",
    "Insurance",
    "Legal",
  ]

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0]
    if (selectedFile) {
      setFile(selectedFile)
      setFormData((prev) => ({
        ...prev,
        name: prev.name || selectedFile.name,
        size: prev.size || `${(selectedFile.size / (1024 * 1024)).toFixed(1)} MB`,
        filePath: prev.filePath || selectedFile.name,
      }))
    }
  }

  const addTag = () => {
    if (newTag.trim() && !tags.includes(newTag.trim())) {
      setTags([...tags, newTag.trim()])
      setNewTag("")
    }
  }

  const removeTag = (tagToRemove: string) => {
    setTags(tags.filter((tag) => tag !== tagToRemove))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    try {
      const formDataToSend = new FormData()

      if (file) {
        formDataToSend.append("file", file)
      }

      formDataToSend.append("name", formData.name)
      formDataToSend.append("type", formData.type)
      formDataToSend.append("size", formData.size)
      formDataToSend.append("patientFirstName", formData.patientFirstName)
      formDataToSend.append("patientLastName", formData.patientLastName)
      formDataToSend.append("category", formData.category)
      formDataToSend.append("filePath", formData.filePath)
      formDataToSend.append("tags", JSON.stringify(tags))

      const response = await axios.post(
        `${apiUrl}/api/v1/document`,
        formDataToSend,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      )

      onAddDocument(response.data)

      setFormData({
        name: "",
        type: "",
        size: "",
        patientFirstName: "",
        patientLastName: "",
        category: "",
        filePath: "",
      })
        setTags([])
        setFile(null)
        setOpen(false)
    } catch (err) {
        console.error("Upload failed", err);
    }
  }


  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="bg-[#489FB5] hover:bg-[#16697A]">
          <Upload className="h-4 w-4 mr-2" />
          Add Document
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-[#16697A]">Add New Document</DialogTitle>
          <DialogDescription>
            Upload a file or manually enter document information. All fields are editable.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* File Upload Section */}
          <div className="space-y-2">
            <Label htmlFor="file">Upload File (Optional)</Label>
            <div className="flex items-center gap-2">
              <Input id="file" type="file" onChange={handleFileChange} className="flex-1" />
              {file && (
                <Badge variant="secondary" className="text-xs">
                  {file.name}
                </Badge>
              )}
            </div>
          </div>

          {/* Document Information */}
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="name">Document Name *</Label>
              <Input
                id="name"
                value={formData.name}
                onChange={(e) => setFormData((prev) => ({ ...prev, name: e.target.value }))}
                placeholder="Enter document name"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="type">Document Type *</Label>
              <Select
                value={formData.type}
                onValueChange={(value) => setFormData((prev) => ({ ...prev, type: value }))}
                required
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select document type" />
                </SelectTrigger>
                <SelectContent>
                  {documentTypes.map((type) => (
                    <SelectItem key={type.value} value={type.value}>
                      {type.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="size">File Size</Label>
              <Input
                id="size"
                value={formData.size}
                onChange={(e) => setFormData((prev) => ({ ...prev, size: e.target.value }))}
                placeholder="e.g., 2.4 MB"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="category">Category *</Label>
              <Select
                value={formData.category}
                onValueChange={(value) => setFormData((prev) => ({ ...prev, category: value }))}
                required
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select category" />
                </SelectTrigger>
                <SelectContent>
                  {categories.map((category) => (
                    <SelectItem key={category} value={category}>
                      {category}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Patient Information */}
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="patientFirstName">Patient First Name</Label>
              <Input
                id="patientFirstName"
                value={formData.patientFirstName}
                onChange={(e) => setFormData((prev) => ({ ...prev, patientFirstName: e.target.value }))}
                placeholder="Enter patient first name"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="patientLastName">Patient Last Name</Label>
              <Input
                id="patientLastName"
                value={formData.patientLastName}
                onChange={(e) => setFormData((prev) => ({ ...prev, patientLastName: e.target.value }))}
                placeholder="Enter patient last name"
              />
            </div>
          </div>

          {/* File Path */}
          <div className="space-y-2">
            <Label htmlFor="filePath">File Path</Label>
            <Input
              id="filePath"
              value={formData.filePath}
              onChange={(e) => setFormData((prev) => ({ ...prev, filePath: e.target.value }))}
              placeholder="Enter file path or location"
            />
          </div>

          {/* Tags Section */}
          <div className="space-y-2">
            <Label>Tags</Label>
            <div className="flex gap-2 mb-2">
              <Input
                value={newTag}
                onChange={(e) => setNewTag(e.target.value)}
                placeholder="Add a tag"
                onKeyPress={(e) => e.key === "Enter" && (e.preventDefault(), addTag())}
                className="flex-1"
              />
              <Button type="button" onClick={addTag} size="sm" variant="outline">
                <Plus className="h-4 w-4" />
              </Button>
            </div>
            <div className="flex flex-wrap gap-1">
              {tags.map((tag) => (
                <Badge key={tag} variant="secondary" className="text-xs">
                  {tag}
                  <button type="button" onClick={() => removeTag(tag)} className="ml-1 hover:text-destructive">
                    <X className="h-3 w-3" />
                  </button>
                </Badge>
              ))}
            </div>
          </div>

          <DialogFooter>
            <Button type="button" variant="outline" onClick={() => setOpen(false)}>
              Cancel
            </Button>
            <Button type="submit" className="bg-[#489FB5] hover:bg-[#16697A]">
              Add Document
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}
