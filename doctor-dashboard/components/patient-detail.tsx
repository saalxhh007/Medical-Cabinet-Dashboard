"use client"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ArrowLeft, Edit, Phone, Mail, Calendar, User, Heart } from "lucide-react"
import { VisitHistory } from "./visit-history"
import { DiagnosisHistory } from "./diagnosis-history"
import { useState } from "react"

interface Patient {
  id: number
  firstName: string
  lastName: string
  phone: string
  email?: string
  dateOfBirth?: string
  address?: string
  createdAt?: string
}

interface PatientDetailProps {
  patient: Patient
  onBack: () => void
}

export function PatientDetail({ patient, onBack }: PatientDetailProps) {
  const [loading, setLoading] = useState(true)
  const [visits, setVisits] = useState<any[]>([])
  const [diagnoses, setDiagnoses] = useState<any[]>([])
  

  const calculateAge = (dateOfBirth: string | undefined) => {
    const today = new Date()
    const birthDate = new Date(dateOfBirth?? "")
    let age = today.getFullYear() - birthDate.getFullYear()
    const monthDiff = today.getMonth() - birthDate.getMonth()
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
      age--
    }
    return age
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <Button variant="outline" size="sm" onClick={onBack}>
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Patients
        </Button>
        <div className="flex-1">
          <h1 className="text-3xl font-bold text-foreground">
            {patient.firstName} {patient.lastName}
          </h1>
          <p className="text-muted-foreground">Patient Details & Medical History</p>
        </div>
        <Button variant="outline">
          <Edit className="h-4 w-4 mr-2" />
          Edit Patient
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <User className="h-5 w-5" />
              Personal Information
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium">Age</span>
              <Badge variant="secondary">{calculateAge(patient.dateOfBirth)} years old</Badge>
            </div>
            <div className="space-y-2">
              <div className="flex items-center gap-2 text-sm">
                <Calendar className="h-4 w-4 text-muted-foreground" />
                <span>Born {new Date(patient.dateOfBirth?? "").toLocaleDateString()}</span>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <Phone className="h-4 w-4 text-muted-foreground" />
                <span>{patient.phone}</span>
              </div>
              {patient.email && (
                <div className="flex items-center gap-2 text-sm">
                  <Mail className="h-4 w-4 text-muted-foreground" />
                  <span className="truncate">{patient.email}</span>
                </div>
              )}
            </div>
            {patient.address && (
              <div className="pt-2 border-t">
                <p className="text-sm font-medium mb-1">Address</p>
                <p className="text-sm text-muted-foreground">{patient.address}</p>
              </div>
            )}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Heart className="h-5 w-5" />
              Emergency Contact
            </CardTitle>
          </CardHeader>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Quick Stats</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-sm">Total Visits</span>
              <Badge variant="outline">{visits.length}</Badge>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm">Active Diagnoses</span>
              <Badge variant="outline">{diagnoses.filter((d) => d.status === "active").length}</Badge>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm">Last Visit</span>
              <span className="text-sm text-muted-foreground">
                {visits.length > 0 ? new Date(visits[0].date).toLocaleDateString() : "Never"}
              </span>
            </div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="visits" className="space-y-4">
        <TabsList>
          <TabsTrigger value="visits">Visit History</TabsTrigger>
          <TabsTrigger value="diagnoses">Diagnoses</TabsTrigger>
        </TabsList>

        <TabsContent value="visits">
          <VisitHistory patientId={patient.id} visits={visits} loading={loading} />
        </TabsContent>

        <TabsContent value="diagnoses">
          <DiagnosisHistory patientId={patient.id} diagnoses={diagnoses} loading={loading} />
        </TabsContent>
      </Tabs>
    </div>
  )
}