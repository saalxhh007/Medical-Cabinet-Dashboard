"use client"

import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { FileText, Download, Search, Filter, Eye, Edit, Trash2, FolderOpen, ImageIcon, File } from "lucide-react"
import { AddDocumentDialog } from "./add-document-dialog"
import axios from "axios"
import { ViewDocumentDialog } from "./view-document-dialog"
import { EditDocumentDialog } from "./edit-document-dialog"
import { DeleteDocumentDialog } from "./delete-document-dialog"

interface Document {
  id: string
  name: string
  type: "medical-record" | "lab-result" | "prescription" | "image" | "report" | "other"
  size: string
  uploadDate: string
  patientFirstName?: string
  patientLastName?: string
  category: string
  tags: string[]
}

export function DocumentsDashboard() {
  const [searchQuery, setSearchQuery] = useState("")
  const [filterType, setFilterType] = useState("all")
  const [selectedCategory, setSelectedCategory] = useState("all")
  const [documents, setDocuments] = useState<Document[]>([])

  const [viewDocument, setViewDocument] = useState<Document | null>(null)
  const [editDocument, setEditDocument] = useState<Document | null>(null)
  const [deleteDocument, setDeleteDocument] = useState<Document | null>(null)

  const apiUrl = process.env.NEXT_PUBLIC_DASHBOARD_API_URL

  const categories = [
    "Medical Records",
    "Lab Results",
    "Medical Images",
    "Prescriptions",
    "Reports",
    "Insurance",
    "Legal",
  ]

  const handleAddDocument = (newDocument: Document) => {
    setDocuments((prev) => [newDocument, ...prev])
  }

  const handleEditDocument = (newDocument: Document) => {
    setDocuments((prev) => [newDocument, ...prev])
  }

  const handleViewDocument = (updatedDocument: Document) => {
    setDocuments((prev) => prev.map((doc) => (doc.id === updatedDocument.id ? updatedDocument : doc)))
  }

  const handleDeleteDocument = (documentToDelete: Document) => {
    setDocuments((prev) => prev.filter((doc) => doc.id !== documentToDelete.id))
    fetchDocuments()
  }

  const handleDownloadDocument = (newDocument: Document) => {
    setDocuments((prev) => [newDocument, ...prev])
  }

  const getFileIcon = (type: string) => {
    switch (type) {
      case "image":
        return <ImageIcon className="h-5 w-5 text-[#16697A]" />
      case "medical-record":
      case "lab-result":
      case "prescription":
      case "report":
        return <FileText className="h-5 w-5 text-[#16697A]" />
      default:
        return <File className="h-5 w-5 text-[#16697A]" />
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

  const filteredDocuments = documents.filter((doc) => {
    const matchesSearch =
      doc.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      doc.patientFirstName?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      doc.patientLastName?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      doc.tags.some((tag) => tag.toLowerCase().includes(searchQuery.toLowerCase()))
    const matchesType = filterType === "all" || doc.type === filterType
    const matchesCategory = selectedCategory === "all" || doc.category === selectedCategory
    return matchesSearch && matchesType && matchesCategory
  })

    const fetchDocuments = async () => {
    try {
      const response = await axios.get(`${apiUrl}/api/v1/document`)
      setDocuments(response.data)
    } catch (err) {
      console.error(err)
    }
  }

  useEffect(() => {
    fetchDocuments()
  }, [])

  return (
    <div className="h-full">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-3xl font-bold text-[#16697A]">Document Management</h1>
        <div className="flex gap-2">
          <Button
            variant="outline"
            className="text-[#16697A] border-[#16697A] hover:bg-[#16697A] hover:text-white bg-transparent"
          >
            <FolderOpen className="h-4 w-4 mr-2" />
            New Folder
          </Button>
          <AddDocumentDialog onAddDocument={handleAddDocument} />
        </div>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-[#489FB5]">Total Documents</CardTitle>
            <FileText className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-[#16697A]">{documents.length}</div>
            <p className="text-xs text-muted-foreground">+3 this week</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-[#489FB5]">Medical Records</CardTitle>
            <FileText className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-[#16697A]">
              {documents.filter((d) => d.type === "medical-record").length}
            </div>
            <p className="text-xs text-muted-foreground">Patient files</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-[#489FB5]">Lab Results</CardTitle>
            <FileText className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-[#16697A]">
              {documents.filter((d) => d.type === "lab-result").length}
            </div>
            <p className="text-xs text-muted-foreground">Test reports</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-[#489FB5]">Medical Images</CardTitle>
            <ImageIcon className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-[#16697A]">
              {documents.filter((d) => d.type === "image").length}
            </div>
            <p className="text-xs text-muted-foreground">X-rays, scans</p>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="all-documents" className="space-y-4">
        <TabsList>
          <TabsTrigger className="text-[#16697A]" value="all-documents">
            All Documents
          </TabsTrigger>
          <TabsTrigger className="text-[#16697A]" value="recent">
            Recent
          </TabsTrigger>
          <TabsTrigger className="text-[#16697A]" value="shared">
            Shared
          </TabsTrigger>
          <TabsTrigger className="text-[#16697A]" value="archived">
            Archived
          </TabsTrigger>
        </TabsList>

        <TabsContent value="all-documents" className="space-y-4">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="text-[#16697A]">Document Library</CardTitle>
                <div className="flex gap-2">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input
                      placeholder="Search documents..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="pl-10 w-64"
                    />
                  </div>
                  <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                    <SelectTrigger className="w-40">
                      <FolderOpen className="h-4 w-4 mr-2" />
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Categories</SelectItem>
                      {categories.map((category) => (
                        <SelectItem key={category} value={category}>
                          {category}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <Select value={filterType} onValueChange={setFilterType}>
                    <SelectTrigger className="w-32">
                      <Filter className="h-4 w-4 mr-2" />
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Types</SelectItem>
                      <SelectItem value="medical-record">Medical Records</SelectItem>
                      <SelectItem value="lab-result">Lab Results</SelectItem>
                      <SelectItem value="prescription">Prescriptions</SelectItem>
                      <SelectItem value="image">Images</SelectItem>
                      <SelectItem value="report">Reports</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {filteredDocuments.map((document) => (
                  <div
                    key={document.id}
                    className="flex items-center justify-between p-4 border rounded-lg hover:bg-muted/50"
                  >
                    <div className="flex items-center gap-4">
                      <div className="p-2 bg-muted rounded-lg ">{getFileIcon(document.type)}</div>
                      <div className="flex-1">
                        <p className="font-medium text-[#16697A]">{document.name}</p>
                        <div className="flex items-center gap-2 mt-1">
                          <Badge className={getTypeColor(document.type)} variant="secondary">
                            {document.type.replace("-", " ")}
                          </Badge>
                          {(document.patientFirstName && document.patientLastName) && (
                            <span className="text-sm text-muted-foreground">
                              • {document.patientFirstName} {document.patientLastName}
                            </span>
                          )}
                          <span className="text-sm text-muted-foreground">
                            • {document.size} • {document.uploadDate}
                          </span>
                        </div>
                        <div className="flex gap-1 mt-2">
                          {document.tags.map((tag) => (
                            <Badge key={tag} variant="outline" className="text-xs">
                              {tag}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Button variant="ghost" size="sm" onClick={() => setViewDocument(document)}>
                        <Eye className="h-4 w-4 text-[#16697A]" />
                      </Button>
                      <Button variant="ghost" size="sm" onClick={() => handleDownloadDocument(document)}>
                        <Download className="h-4 w-4 text-[#16697A]" />
                      </Button>
                      <Button variant="ghost" size="sm" onClick={() => setEditDocument(document)}>
                        <Edit className="h-4 w-4 text-[#16697A]" />
                      </Button>
                      <Button variant="ghost" size="sm" onClick={() => setDeleteDocument(document)}>
                        <Trash2 className="h-4 w-4 text-[#16697A]" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="recent" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Recently Accessed</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-center py-12">
                <FileText className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
                <p className="text-muted-foreground">Recent documents will appear here</p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="shared" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Shared Documents</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-center py-12">
                <FileText className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
                <p className="text-muted-foreground">Shared documents will appear here</p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="archived" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Archived Documents</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-center py-12">
                <FileText className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
                <p className="text-muted-foreground">Archived documents will appear here</p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      <ViewDocumentDialog
        document={viewDocument}
        open={!!viewDocument}
        onOpenChange={(open: any) => !open && setViewDocument(null)}
        onEdit={setEditDocument}
        onDownload={handleDownloadDocument}
      />

      <EditDocumentDialog
        document={editDocument}
        open={!!editDocument}
        onOpenChange={(open: any) => !open && setEditDocument(null)}
        onSave={handleEditDocument}
      />

      <DeleteDocumentDialog
        document={deleteDocument}
        open={!!deleteDocument}
        onOpenChange={(open: any) => !open && setDeleteDocument(null)}
        onConfirm={handleDeleteDocument}
      />
    </div>
  )
}
