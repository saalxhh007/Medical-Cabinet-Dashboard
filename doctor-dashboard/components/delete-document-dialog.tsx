"use client"

import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { AlertTriangle } from "lucide-react"
import axios from "axios"

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

interface DeleteDocumentDialogProps {
  document: Document | null
  open: boolean
  onOpenChange: (open: boolean) => void
  onConfirm: (document: Document) => void
}

export function DeleteDocumentDialog({ document, open, onOpenChange, onConfirm }: DeleteDocumentDialogProps) {
  if (!document) return null

  const apiUrl = process.env.NEXT_PUBLIC_DASHBOARD_API_URL

  const handleDelete = async () => {
    try {
      await axios.delete(`${apiUrl}/api/v1/document/${document.id}`)
      onOpenChange(false)
      onConfirm(document)
    } catch (err) {
      console.error(err)
    }
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <AlertTriangle className="h-5 w-5 text-destructive" />
            Delete Document
          </DialogTitle>
          <DialogDescription>
            Are you sure you want to delete this document? This action cannot be undone.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4">
          <div className="p-4 bg-muted rounded-lg">
            <p className="font-medium">{document.name}</p>
            <p className="text-sm text-muted-foreground">
              {document.patientName && `Patient: ${document.patientName} • `}
              {document.category} • {document.size}
            </p>
          </div>

          <div className="flex justify-end gap-2">
            <Button variant="outline" onClick={() => onOpenChange(false)}>
              Cancel
            </Button>
            <Button variant="destructive" onClick={handleDelete}>
              Delete Document
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}