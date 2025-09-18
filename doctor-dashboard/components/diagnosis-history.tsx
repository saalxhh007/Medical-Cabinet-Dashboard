"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Plus, AlertCircle, CheckCircle, Clock } from "lucide-react"
// import { AddDiagnosisDialog } from "@/components/records/add-diagnosis-dialog"

interface Diagnosis{
    id: number
    status: string
    description: string
    severity: string
    code: string
    diagnosedDate: string
    notes: string[]
}

interface DiagnosisHistoryProps {
  patientId: number
  diagnoses: Diagnosis[]
  loading: boolean
}

export function DiagnosisHistory({ patientId, diagnoses, loading }: DiagnosisHistoryProps) {
  const [showAddDialog, setShowAddDialog] = useState(false)

  if (loading) {
    return (
      <Card>
        <CardContent className="flex items-center justify-center py-8">
          <div className="text-muted-foreground">Loading diagnosis history...</div>
        </CardContent>
      </Card>
    )
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "active":
        return <AlertCircle className="h-4 w-4 text-destructive" />
      case "resolved":
        return <CheckCircle className="h-4 w-4 text-green-600" />
      case "chronic":
        return <Clock className="h-4 w-4 text-orange-600" />
      default:
        return null
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "active":
        return "destructive"
      case "resolved":
        return "default"
      case "chronic":
        return "secondary"
      default:
        return "outline"
    }
  }

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case "severe":
        return "destructive"
      case "moderate":
        return "secondary"
      case "mild":
        return "outline"
      default:
        return "outline"
    }
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold">Diagnosis History</h3>
        <Button size="sm" className="bg-secondary hover:bg-secondary/90" onClick={() => setShowAddDialog(true)}>
          <Plus className="h-4 w-4 mr-2" />
          Add Diagnosis
        </Button>
      </div>

      {diagnoses.length === 0 ? (
        <Card>
          <CardContent className="flex items-center justify-center py-8">
            <div className="text-center">
              <p className="text-muted-foreground mb-2">No diagnoses recorded.</p>
              <Button variant="outline" size="sm" onClick={() => setShowAddDialog(true)}>
                <Plus className="h-4 w-4 mr-2" />
                Add First Diagnosis
              </Button>
            </div>
          </CardContent>
        </Card>
      ) : (
        <div className="space-y-4">
          {diagnoses.map((diagnosis) => (
            <Card key={diagnosis.id}>
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-lg flex items-center gap-2">
                    {getStatusIcon(diagnosis.status)}
                    {diagnosis.description}
                  </CardTitle>
                  <div className="flex gap-2">
                    <Badge variant={getSeverityColor(diagnosis.severity)}>{diagnosis.severity}</Badge>
                    <Badge variant={getStatusColor(diagnosis.status)}>{diagnosis.status}</Badge>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                  <div>
                    <span className="text-muted-foreground">ICD-10 Code:</span>
                    <span className="ml-2 font-mono">{diagnosis.code}</span>
                  </div>
                  <div>
                    <span className="text-muted-foreground">Diagnosed:</span>
                    <span className="ml-2">{new Date(diagnosis.diagnosedDate).toLocaleDateString()}</span>
                  </div>
                </div>

                {diagnosis.notes && (
                  <div>
                    <h4 className="font-medium mb-1">Notes</h4>
                    <p className="text-sm text-muted-foreground">{diagnosis.notes}</p>
                  </div>
                )}
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      {/* <AddDiagnosisDialog open={showAddDialog} onOpenChange={setShowAddDialog} patientId={patientId} /> */}
    </div>
  )
}