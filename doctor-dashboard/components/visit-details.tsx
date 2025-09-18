import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

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

interface Appointment {
    id: number
    date: string
    time: string
    type: string
    status: string
    duration: string
    diagnosis: string[]
    symptoms: string[]
    notes: string[]
    chiefComplaint: string
    vitalSigns: string[]
    medications: string[]
    treatment: string
    followUpDate: string
    createdAt: string
    patient: Patient
}

interface VisitDetailsProps {
  patient?: Patient
  visit?: Appointment
}

const typeColor = (type: string) => {
    switch (type.toLowerCase()) {
      case "in-person":
        return "#F5B8DA"
      case "phone call":
        return "#9BAB65"
      case "video call":
        return "#B6CAEB"
      default:
        return "#F4DA6E"
    }
}

export function VisitDetails({ patient, visit }: VisitDetailsProps) {
  if (!patient) {
    return (
      <Card className="bg-gradient-card shadow-card border-0">
        <CardHeader>
          <CardTitle className="text-lg font-semibold">Visit details</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-center py-8 text-muted-foreground">
            Select a patient to view details
          </div>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card className="bg-gradient-card shadow-card border-0">
      <CardHeader>
        <CardTitle className="text-lg font-semibold">Visit details</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4"
              style={patient ? { backgroundColor: typeColor(visit?.type ?? "") } : {}}>
        <div>
          <h3 className="font-semibold text-foreground">
            {patient.firstName} {patient.lastName}
          </h3>
          <p className="text-sm text-muted-foreground">
            Patient ID: #{patient.id}
          </p>
        </div>
        
        <div className="flex gap-2">
          <Badge variant="secondary">{visit?.type}</Badge>
          <Badge variant="outline">{visit?.time}</Badge>
        </div>
        
        <div className="space-y-3">
          <div>
            <h4 className="font-medium text-sm">Chief Complaint</h4>
            <p className="text-sm text-muted-foreground">Regular checkup and consultation</p>
          </div>
          
          <div>
            <h4 className="font-medium text-sm">Vital Signs</h4>
            <div className="grid grid-cols-2 gap-2 text-sm">
              <div>BP: 120/80</div>
              <div>HR: 72 bpm</div>
              <div>Temp: 98.6°F</div>
              <div>Weight: 70kg</div>
            </div>
          </div>
          
          <div>
            <h4 className="font-medium text-sm">Status</h4>
            <Badge className="bg-medical-success text-white">Stable</Badge>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}