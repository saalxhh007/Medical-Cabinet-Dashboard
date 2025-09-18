"use client"

import { useState, useEffect } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { X, Plus } from "lucide-react"

interface Document {
  id: string
  name: string
  type: "medical-record" | "lab-result" | "prescription" | "image" | "report" | "other"
  size: string
  uploadDate: string
  patientName?: string
  patientFirstName?: string
  patientLastName?: string
  category: string
  tags: string[]
  filePath?: string
  createdAt?: string
  updatedAt?: string
}

interface EditDocumentDialogProps {
  document: Document | null
  open: boolean
  onOpenChange: (open: boolean) => void
  onSave: (document: Document) => void
}

export function EditDocumentDialog({ document, open, onOpenChange, onSave }: EditDocumentDialogProps) {
  const [formData, setFormData] = useState<Document | null>(null)
  const [newTag, setNewTag] = useState("")

  useEffect(() => {
    if (document) {
      setFormData({ ...document })
    }
  }, [document])

  if (!document || !formData) return null

  const categories = [
    "Medical Records",
    "Lab Results",
    "Medical Images",
    "Prescriptions",
    "Reports",
    "Insurance",
    "Legal",
  ]

  const documentTypes = [
    { value: "medical-record", label: "Medical Record" },
    { value: "lab-result", label: "Lab Result" },
    { value: "prescription", label: "Prescription" },
    { value: "image", label: "Image" },
    { value: "report", label: "Report" },
    { value: "other", label: "Other" },
  ]

  const handleInputChange = (field: keyof Document, value: string) => {
    setFormData((prev) => (prev ? { ...prev, [field]: value } : null))
  }

  const handleAddTag = () => {
    if (newTag.trim() && formData && !formData.tags.includes(newTag.trim())) {
      setFormData((prev) =>
        prev
          ? {
              ...prev,
              tags: [...prev.tags, newTag.trim()],
            }
          : null,
      )
      setNewTag("")
    }
  }

  const handleRemoveTag = (tagToRemove: string) => {
    setFormData((prev) =>
      prev
        ? {
            ...prev,
            tags: prev.tags.filter((tag) => tag !== tagToRemove),
          }
        : null,
    )
  }

  const handleSave = () => {
    if (formData) {
      const updatedDocument = {
        ...formData,
        updatedAt: new Date().toISOString(),
        patientName: `${formData.patientFirstName || ""} ${formData.patientLastName || ""}`.trim(),
      }
      onSave(updatedDocument)
      onOpenChange(false)
    }
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Edit Document</DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="name">Document Name</Label>
              <Input
                id="name"
                value={formData.name}
                onChange={(e) => handleInputChange("name", e.target.value)}
                placeholder="Enter document name"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="type">Document Type</Label>
              <Select value={formData.type} onValueChange={(value) => handleInputChange("type", value)}>
                <SelectTrigger>
                  <SelectValue />
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
              <Label htmlFor="patientFirstName">Patient First Name</Label>
              <Input
                id="patientFirstName"
                value={formData.patientFirstName || ""}
                onChange={(e) => handleInputChange("patientFirstName", e.target.value)}
                placeholder="Enter patient first name"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="patientLastName">Patient Last Name</Label>
              <Input
                id="patientLastName"
                value={formData.patientLastName || ""}
                onChange={(e) => handleInputChange("patientLastName", e.target.value)}
                placeholder="Enter patient last name"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="category">Category</Label>
              <Select value={formData.category} onValueChange={(value) => handleInputChange("category", value)}>
                <SelectTrigger>
                  <SelectValue />
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

            <div className="space-y-2">
              <Label htmlFor="size">File Size</Label>
              <Input
                id="size"
                value={formData.size}
                onChange={(e) => handleInputChange("size", e.target.value)}
                placeholder="e.g., 2.4 MB"
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="filePath">File Path</Label>
            <Input
              id="filePath"
              value={formData.filePath || ""}
              onChange={(e) => handleInputChange("filePath", e.target.value)}
              placeholder="Enter file path"
            />
          </div>

          <div className="space-y-2">
            <Label>Tags</Label>
            <div className="flex flex-wrap gap-2 mb-2">
              {formData.tags.map((tag) => (
                <Badge key={tag} variant="secondary" className="flex items-center gap-1">
                  {tag}
                  <X className="h-3 w-3 cursor-pointer hover:text-destructive" onClick={() => handleRemoveTag(tag)} />
                </Badge>
              ))}
            </div>
            <div className="flex gap-2">
              <Input
                value={newTag}
                onChange={(e) => setNewTag(e.target.value)}
                placeholder="Add a tag"
                onKeyPress={(e) => e.key === "Enter" && handleAddTag()}
              />
              <Button type="button" variant="outline" onClick={handleAddTag}>
                <Plus className="h-4 w-4" />
              </Button>
            </div>
          </div>

          <div className="flex justify-end gap-2">
            <Button variant="outline" onClick={() => onOpenChange(false)}>
              Cancel
            </Button>
            <Button onClick={handleSave} className="bg-[#16697A] hover:bg-[#16697A]/90">
              Save Changes
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}