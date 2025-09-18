"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Plus, Calendar, FileText, Pill } from "lucide-react"
// import { AddVisitDialog } from "@/components/records/add-visit-dialog"

interface Visit {
    id: number
    patient: Patient
    type: string
    time: string
    date: string
    diagnosis: string[]
    chiefComplaint: string
    symptoms: string[]
    vitalSigns: vitalSigns
    medications: Medication[]
    treatment: string
    notes: string[]
    followUpDate: string
}

interface Medication {
    name: string
    dosage: string
    frequency: string
    duration: string
    instructions: string[]
}

interface vitalSigns{
    bloodPressure:string
    heartRate: string
    temperature: number
    weight: number
}

interface Patient {
  id: number
  firstName: string
  lastName: string
  phone: string
  email?: string
  dateOfBirth?: string
  createdAt?: string
  address?: string
}

interface VisitHistoryProps {
  patientId: number
  visits: Visit[]
  loading: boolean
}

export function VisitHistory({ patientId, visits, loading }: VisitHistoryProps) {
  const [showAddDialog, setShowAddDialog] = useState(false)

  if (loading) {
    return (
      <Card>
        <CardContent className="flex items-center justify-center py-8">
          <div className="text-muted-foreground">Loading visit history...</div>
        </CardContent>
      </Card>
    )
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold">Visit History</h3>
        <Button size="sm" className="bg-secondary hover:bg-secondary/90" onClick={() => setShowAddDialog(true)}>
          <Plus className="h-4 w-4 mr-2" />
          Add Visit Record
        </Button>
      </div>

      {visits.length === 0 ? (
        <Card>
          <CardContent className="flex items-center justify-center py-8">
            <div className="text-center">
              <p className="text-muted-foreground mb-2">No visit records found.</p>
              <Button variant="outline" size="sm" onClick={() => setShowAddDialog(true)}>
                <Plus className="h-4 w-4 mr-2" />
                Add First Visit
              </Button>
            </div>
          </CardContent>
        </Card>
      ) : (
        <div className="space-y-4">
          {visits.map((visit) => (
            <Card key={visit.id}>
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-lg flex items-center gap-2">
                    <Calendar className="h-5 w-5" />
                    {new Date(visit.date).toLocaleDateString()}
                  </CardTitle>
                  <Badge variant="outline">{visit.diagnosis.length} diagnosis</Badge>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <h4 className="font-medium mb-2">Chief Complaint</h4>
                  <p className="text-sm text-muted-foreground">{visit.chiefComplaint}</p>
                </div>

                {visit.symptoms.length > 0 && (
                  <div>
                    <h4 className="font-medium mb-2">Symptoms</h4>
                    <div className="flex flex-wrap gap-2">
                      {visit.symptoms.map((symptom, index) => (
                        <Badge key={index} variant="secondary">
                          {symptom}
                        </Badge>
                      ))}
                    </div>
                  </div>
                )}

                {Object.keys(visit.vitalSigns).length > 0 && (
                  <div>
                    <h4 className="font-medium mb-2">Vital Signs</h4>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                      {visit.vitalSigns.bloodPressure && (
                        <div>
                          <span className="text-muted-foreground">BP:</span> {visit.vitalSigns.bloodPressure}
                        </div>
                      )}
                      {visit.vitalSigns.heartRate && (
                        <div>
                          <span className="text-muted-foreground">HR:</span> {visit.vitalSigns.heartRate} bpm
                        </div>
                      )}
                      {visit.vitalSigns.temperature && (
                        <div>
                          <span className="text-muted-foreground">Temp:</span> {visit.vitalSigns.temperature}°F
                        </div>
                      )}
                      {visit.vitalSigns.weight && (
                        <div>
                          <span className="text-muted-foreground">Weight:</span> {visit.vitalSigns.weight} lbs
                        </div>
                      )}
                    </div>
                  </div>
                )}

                {visit.diagnosis.length > 0 && (
                  <div>
                    <h4 className="font-medium mb-2">Diagnoses</h4>
                    <div className="space-y-1">
                      {visit.diagnosis.map((diagnosis, index) => (
                        <div key={index} className="flex items-center gap-2 text-sm">
                          <FileText className="h-4 w-4 text-muted-foreground" />
                          <span>{diagnosis}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {visit.medications.length > 0 && (
                  <div>
                    <h4 className="font-medium mb-2">Medications Prescribed</h4>
                    <div className="space-y-2">
                      {visit.medications.map((medication, index) => (
                        <div key={index} className="flex items-start gap-2 text-sm">
                          <Pill className="h-4 w-4 text-muted-foreground mt-0.5" />
                          <div>
                            <div className="font-medium">{medication.name}</div>
                            <div className="text-muted-foreground">
                              {medication.dosage} - {medication.frequency} for {medication.duration}
                            </div>
                            {medication.instructions && (
                              <div className="text-muted-foreground text-xs">{medication.instructions}</div>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {visit.treatment && (
                  <div>
                    <h4 className="font-medium mb-2">Treatment</h4>
                    <p className="text-sm text-muted-foreground">{visit.treatment}</p>
                  </div>
                )}

                {visit.notes && (
                  <div>
                    <h4 className="font-medium mb-2">Notes</h4>
                    <p className="text-sm text-muted-foreground">{visit.notes}</p>
                  </div>
                )}

                {visit.followUpDate && (
                  <div className="pt-2 border-t">
                    <div className="flex items-center gap-2 text-sm">
                      <Calendar className="h-4 w-4 text-muted-foreground" />
                      <span>Follow-up scheduled for {new Date(visit.followUpDate).toLocaleDateString()}</span>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      {/* <AddVisitDialog open={showAddDialog} onOpenChange={setShowAddDialog} patientId={patientId} /> */}
    </div>
  )
}