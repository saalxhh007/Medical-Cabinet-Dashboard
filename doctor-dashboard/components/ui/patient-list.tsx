"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Search, Plus, Phone, Mail, Calendar, Trash2 } from "lucide-react"
import { AddPatientDialog } from "../add-patient-dialog"

interface Patient {
  id: number
  firstName: string
  lastName: string
  phone: string
  email?: string
  dateOfBirth?: string
  address?: string
  createdAt?: string
  condition: string
}

interface PatientListProps {
  onSelectPatient?: (patient: Patient) => void
  patients: Patient[]
  onDeletePatient?: (patientId: number) => void
}

export function PatientList({ onSelectPatient, patients, onDeletePatient }: PatientListProps) {
  const [searchTerm, setSearchTerm] = useState("")
  const [showAddDialog, setShowAddDialog] = useState(false)
  const [loading, setLoading] = useState(false)
  const [draggedPatient, setDraggedPatient] = useState<number | null>(null)
  const [isDragging, setIsDragging] = useState(false)
  const [dragCurrentY, setDragCurrentY] = useState(0)
  const [dragStartY, setDragStartY] = useState(0)

  const filteredPatients = patients.filter(
    (patient: Patient) =>
      `${patient.firstName} ${patient.lastName}`.toLowerCase().includes(searchTerm.toLowerCase()) ||
      patient.phone.includes(searchTerm) ||
      patient.email?.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  const calculateAge = (dateOfBirth: string) => {
    const today = new Date()
    const birthDate = new Date(dateOfBirth)
    let age = today.getFullYear() - birthDate.getFullYear()
    const monthDiff = today.getMonth() - birthDate.getMonth()
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
      age--
    }
    return age
  }

  const shouldShowDeleteIndicator = (patientId: number) => {
    if (draggedPatient !== patientId || !isDragging) return false
    const dragDistance = dragCurrentY - dragStartY
    return dragDistance > 50 // Show indicator after 50px drag
  }

  const getDragStyle = (patientId: number) => {
    if (draggedPatient !== patientId || !isDragging) return {}

    const dragDistance = dragCurrentY - dragStartY
    const deleteThreshold = 100
    const opacity = Math.max(0.3, 1 - (dragDistance / deleteThreshold) * 0.7)

    return {
      transform: `translateY(${Math.max(0, dragDistance)}px)`,
      opacity,
      transition: isDragging ? "none" : "all 0.2s ease-out",
    }
  }
  const handleDragStart = (e: React.TouchEvent | React.MouseEvent, patientId: number) => {
    const clientY = "touches" in e ? e.touches[0].clientY : e.clientY
    setDraggedPatient(patientId)
    setDragStartY(clientY)
    setDragCurrentY(clientY)
    setIsDragging(true)

    // Prevent default to avoid scrolling on touch devices
    if ("touches" in e) {
      e.preventDefault()
    }
  }

    const handleDragMove = (e: React.TouchEvent | React.MouseEvent) => {
    if (!isDragging || draggedPatient === null) return

    const clientY = "touches" in e ? e.touches[0].clientY : e.clientY
    setDragCurrentY(clientY)

    // Prevent default to avoid scrolling
    if ("touches" in e) {
      e.preventDefault()
    }
  }

  const handleDragEnd = (e: React.TouchEvent | React.MouseEvent) => {
    if (!isDragging || draggedPatient === null) return

    const dragDistance = dragCurrentY - dragStartY
    const deleteThreshold = 100 // pixels to drag down before deleting

    if (dragDistance > deleteThreshold) {
      // Patient dragged down enough to delete
      if (onDeletePatient) {
        onDeletePatient(draggedPatient)
      }
    }

    // Reset drag state
    setDraggedPatient(null)
    setDragStartY(0)
    setDragCurrentY(0)
    setIsDragging(false)
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center p-8">
        <div className="text-muted-foreground">Loading patients...</div>
      </div>
    )
  }
  
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-[#16697A]">Patients</h2>
          <p className="text-muted-foreground">Manage patient information and records</p>
        </div>
        <Button onClick={() => setShowAddDialog(true)} className="bg-[#82C0CC] hover:bg-[#489FB5] cursor-pointer">
          <Plus className="h-4 w-4 mr-2" />
          Add Patient
        </Button>
      </div>

      <div className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <Input
          placeholder="Search patients by name, phone, or email..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="pl-10"
        />
      </div>

      <div className="grid gap-4">
        {filteredPatients.length === 0 ? (
          <Card>
            <CardContent className="flex items-center justify-center py-8">
              <div className="text-center">
                <p className="text-muted-foreground mb-2">
                  {searchTerm ? "No patients found matching your search." : "No patients registered yet."}
                </p>
                {!searchTerm && (
                  <Button onClick={() => setShowAddDialog(true)} variant="outline">
                    <Plus className="h-4 w-4 mr-2" />
                    Add Your First Patient
                  </Button>
                )}
              </div>
            </CardContent>
          </Card>
        ) : (
          filteredPatients.map((patient) => (
            <div key={patient.id} className="relative">
              <Card
                className={`hover:shadow-md transition-shadow cursor-pointer select-none ${
                  draggedPatient === patient.id ? "z-10" : ""
                }`}
                style={getDragStyle(patient.id)}
                onClick={() => !isDragging && onSelectPatient?.(patient)}
                onMouseDown={(e) => handleDragStart(e, patient.id)}
                onMouseMove={handleDragMove}
                onMouseUp={handleDragEnd}
                onMouseLeave={handleDragEnd}
                onTouchStart={(e) => handleDragStart(e, patient.id)}
                onTouchMove={handleDragMove}
                onTouchEnd={handleDragEnd}
              >
                <CardHeader className="pb-3">
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-lg text-[#16697A]">{`${patient.firstName} ${patient.lastName}`}</CardTitle>
                    <Badge className="text-[#FFA62B] bg-[#EDE7E3]">Age {calculateAge(patient.dateOfBirth ?? "")}</Badge>
                  </div>
                </CardHeader>
                <CardContent className="pt-0">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                    <div className="flex items-center gap-2">
                      <Phone className="h-4 w-4 text-[#82C0CC]" />
                      <span className="text-[#489FB5]">{patient.phone}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Mail className="h-4 w-4 text-[#82C0CC]" />
                      <span className="truncate text-[#489FB5]">{patient.email}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Calendar className="h-4 w-4 text-[#82C0CC]" />
                      <span className="text-[#489FB5]">{new Date(patient.dateOfBirth ?? "").toLocaleDateString()}</span>
                    </div>
                  </div>
                  <div className="mt-3 text-sm text-muted-foreground">
                    <p className="truncate">{patient.address}</p>
                  </div>
                </CardContent>
              </Card>

              {shouldShowDeleteIndicator(patient.id) && (
                <div className="absolute inset-x-0 -bottom-2 flex justify-center">
                  <div className="bg-red-500 text-white px-3 py-1 rounded-full text-sm flex items-center gap-2 shadow-lg">
                    <Trash2 className="h-4 w-4" />
                    Release to delete
                  </div>
                </div>
              )}
            </div>
          ))
        )}
      </div>
      <AddPatientDialog open={showAddDialog} onOpenChange={setShowAddDialog}
        // onAddPatient={onAddPatient}
      />
    </div>
  )
}
