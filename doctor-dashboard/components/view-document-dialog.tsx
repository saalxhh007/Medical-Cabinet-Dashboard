"use client"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { FileText, Download, Edit, Calendar, User, Tag, FolderOpen, ImageIcon, File } from "lucide-react"
import { useEffect } from "react"

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

interface ViewDocumentDialogProps {
  document: Document | null
  open: boolean
  onOpenChange: (open: boolean) => void
  onEdit: (document: Document) => void
  onDownload: (document: Document) => void
}

export function ViewDocumentDialog({ document, open, onOpenChange, onEdit, onDownload }: ViewDocumentDialogProps) {
  if (!document) return null

  const getFileIcon = (type: string) => {
    switch (type) {
      case "image":
        return <ImageIcon className="h-8 w-8" />
      case "medical-record":
      case "lab-result":
      case "prescription":
      case "report":
        return <FileText className="h-8 w-8" />
      default:
        return <File className="h-8 w-8" />
    }
  }

  const getTypeColor = (type: string) => {
    switch (type) {
      case "medical-record":
        return "bg-blue-100 text-blue-800"
      case "lab-result":
        return "bg-green-100 text-green-800"
      case "prescription":
        return "bg-purple-100 text-purple-800"
      case "image":
        return "bg-orange-100 text-orange-800"
      case "report":
        return "bg-gray-100 text-gray-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-3">
            <div className="p-2 bg-muted rounded-lg">{getFileIcon(document.type)}</div>
            <div>
              <h3 className="text-lg font-semibold">{document.name}</h3>
              <Badge className={getTypeColor(document.type)} variant="secondary">
                {document.type.replace("-", " ")}
              </Badge>
            </div>
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          {/* Document Preview Area */}
          <div className="border-2 border-dashed border-muted rounded-lg p-8 text-center bg-muted/20">
            {document.type === "image" ? (
              <div className="space-y-2">
                <ImageIcon className="h-16 w-16 mx-auto text-muted-foreground" />
                <p className="text-sm text-muted-foreground">Image Preview</p>
                <p className="text-xs text-muted-foreground">{document.name}</p>
              </div>
            ) : (
              <div className="space-y-2">
                <FileText className="h-16 w-16 mx-auto text-muted-foreground" />
                <p className="text-sm text-muted-foreground">Document Preview</p>
                <p className="text-xs text-muted-foreground">{document.name}</p>
              </div>
            )}
          </div>

          <Separator />

          {/* Document Details */}
          <div className="grid grid-cols-2 gap-6">
            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <User className="h-4 w-4 text-muted-foreground" />
                <div>
                  <p className="text-sm font-medium">Patient</p>
                  <p className="text-sm text-muted-foreground">
                    {document.patientName ||
                      `${document.patientFirstName || ""} ${document.patientLastName || ""}`.trim() ||
                      "N/A"}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <FolderOpen className="h-4 w-4 text-muted-foreground" />
                <div>
                  <p className="text-sm font-medium">Category</p>
                  <p className="text-sm text-muted-foreground">{document.category}</p>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <Calendar className="h-4 w-4 text-muted-foreground" />
                <div>
                  <p className="text-sm font-medium">Upload Date</p>
                  <p className="text-sm text-muted-foreground">{document.uploadDate}</p>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <div>
                <p className="text-sm font-medium mb-2">File Size</p>
                <p className="text-sm text-muted-foreground">{document.size}</p>
              </div>

              <div>
                <p className="text-sm font-medium mb-2">File Path</p>
                <p className="text-sm text-muted-foreground font-mono">{document.filePath || "N/A"}</p>
              </div>

              <div>
                <p className="text-sm font-medium mb-2 flex items-center gap-2">
                  <Tag className="h-4 w-4" />
                  Tags
                </p>
                <div className="flex flex-wrap gap-1">
                  {document.tags.map((tag) => (
                    <Badge key={tag} variant="outline" className="text-xs">
                      {tag}
                    </Badge>
                  ))}
                </div>
              </div>
            </div>
          </div>

          <Separator />

          {/* Action Buttons */}
          <div className="flex justify-between">
            <div className="flex gap-2">
              <Button onClick={() => onDownload(document)} className="bg-[#16697A] hover:bg-[#16697A]/90">
                <Download className="h-4 w-4 mr-2" />
                Download
              </Button>
              <Button
                variant="outline"
                onClick={() => onEdit(document)}
                className="text-[#16697A] border-[#16697A] hover:bg-[#16697A] hover:text-white"
              >
                <Edit className="h-4 w-4 mr-2" />
                Edit
              </Button>
            </div>
            <Button variant="outline" onClick={() => onOpenChange(false)}>
              Close
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
