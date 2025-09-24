"use client"

import type React from "react"

import { useState } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { X, Plus } from "lucide-react"

interface Visit {
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
    vitalSigns: vitalSigns
    medications: Medication[]
    treatment: string
    followUpDate: string
    createdAt: string
    patient: Patient
}

interface Medication {
    name: string
    dosage: string
    frequency: string
    duration: string
    instructions: string[]
}

interface VitalSigns {
  bloodPressure?: string
  heartRate?: number
  temperature?: number
  weight?: number
  height?: number
}

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

interface AddVisitDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  patientId: string
  appointmentId?: string
}

export function AddVisitDialog({ open, onOpenChange, patientId, appointmentId }: AddVisitDialogProps) {
  const [formData, setFormData] = useState({
    date: new Date().toISOString().split("T")[0],
    chiefComplaint: "",
    symptoms: [] as string[],
    vitalSigns: {
      bloodPressure: "",
      heartRate: "",
      temperature: "",
      weight: "",
      height: "",
    },
    examination: "",
    diagnosis: [] as string[],
    treatment: "",
    medications: [] as Medication[],
    followUpDate: "",
    notes: "",
  })

  const [newSymptom, setNewSymptom] = useState("")
  const [newDiagnosis, setNewDiagnosis] = useState("")
  const [newMedication, setNewMedication] = useState({
    name: "",
    dosage: "",
    frequency: "",
    duration: "",
    instructions: "",
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    const visitData: Omit<Visit, "id" | "createdAt"> = {
      patientId,
      appointmentId: appointmentId || "",
      ...formData,
      vitalSigns: {
        ...formData.vitalSigns,
        heartRate: formData.vitalSigns.heartRate ? Number.parseInt(formData.vitalSigns.heartRate) : undefined,
        temperature: formData.vitalSigns.temperature ? Number.parseFloat(formData.vitalSigns.temperature) : undefined,
        weight: formData.vitalSigns.weight ? Number.parseFloat(formData.vitalSigns.weight) : undefined,
        height: formData.vitalSigns.height ? Number.parseFloat(formData.vitalSigns.height) : undefined,
      },
    }

    addVisit(visitData)
    resetForm()
    onOpenChange(false)
  }

  const resetForm = () => {
    setFormData({
      date: new Date().toISOString().split("T")[0],
      chiefComplaint: "",
      symptoms: [],
      vitalSigns: {
        bloodPressure: "",
        heartRate: "",
        temperature: "",
        weight: "",
        height: "",
      },
      examination: "",
      diagnosis: [],
      treatment: "",
      medications: [],
      followUpDate: "",
      notes: "",
    })
    setNewSymptom("")
    setNewDiagnosis("")
    setNewMedication({
      name: "",
      dosage: "",
      frequency: "",
      duration: "",
      instructions: "",
    })
  }

  const addSymptom = () => {
    if (newSymptom.trim()) {
      setFormData((prev) => ({
        ...prev,
        symptoms: [...prev.symptoms, newSymptom.trim()],
      }))
      setNewSymptom("")
    }
  }

  const removeSymptom = (index: number) => {
    setFormData((prev) => ({
      ...prev,
      symptoms: prev.symptoms.filter((_, i) => i !== index),
    }))
  }

  const addDiagnosis = () => {
    if (newDiagnosis.trim()) {
      setFormData((prev) => ({
        ...prev,
        diagnosis: [...prev.diagnosis, newDiagnosis.trim()],
      }))
      setNewDiagnosis("")
    }
  }

  const removeDiagnosis = (index: number) => {
    setFormData((prev) => ({
      ...prev,
      diagnosis: prev.diagnosis.filter((_, i) => i !== index),
    }))
  }

  const addMedication = () => {
    if (newMedication.name.trim()) {
      setFormData((prev) => ({
        ...prev,
        medications: [...prev.medications, newMedication],
      }))
      setNewMedication({
        name: "",
        dosage: "",
        frequency: "",
        duration: "",
        instructions: "",
      })
    }
  }

  const removeMedication = (index: number) => {
    setFormData((prev) => ({
      ...prev,
      medications: prev.medications.filter((_, i) => i !== index),
    }))
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Add Visit Record</DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="date">Visit Date *</Label>
            <Input
              id="date"
              type="date"
              value={formData.date}
              onChange={(e) => setFormData((prev) => ({ ...prev, date: e.target.value }))}
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="chiefComplaint">Chief Complaint *</Label>
            <Textarea
              id="chiefComplaint"
              value={formData.chiefComplaint}
              onChange={(e) => setFormData((prev) => ({ ...prev, chiefComplaint: e.target.value }))}
              placeholder="Primary reason for the visit..."
              required
            />
          </div>

          <div className="space-y-3">
            <Label>Symptoms</Label>
            <div className="flex gap-2">
              <Input
                value={newSymptom}
                onChange={(e) => setNewSymptom(e.target.value)}
                placeholder="Add symptom..."
                onKeyPress={(e) => e.key === "Enter" && (e.preventDefault(), addSymptom())}
              />
              <Button type="button" onClick={addSymptom} size="sm">
                <Plus className="h-4 w-4" />
              </Button>
            </div>
            <div className="flex flex-wrap gap-2">
              {formData.symptoms.map((symptom, index) => (
                <Badge key={index} variant="secondary" className="flex items-center gap-1">
                  {symptom}
                  <X className="h-3 w-3 cursor-pointer" onClick={() => removeSymptom(index)} />
                </Badge>
              ))}
            </div>
          </div>

          <div className="space-y-4">
            <Label>Vital Signs</Label>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              <div className="space-y-2">
                <Label htmlFor="bloodPressure">Blood Pressure</Label>
                <Input
                  id="bloodPressure"
                  value={formData.vitalSigns.bloodPressure}
                  onChange={(e) =>
                    setFormData((prev) => ({
                      ...prev,
                      vitalSigns: { ...prev.vitalSigns, bloodPressure: e.target.value },
                    }))
                  }
                  placeholder="120/80"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="heartRate">Heart Rate (bpm)</Label>
                <Input
                  id="heartRate"
                  type="number"
                  value={formData.vitalSigns.heartRate}
                  onChange={(e) =>
                    setFormData((prev) => ({
                      ...prev,
                      vitalSigns: { ...prev.vitalSigns, heartRate: e.target.value },
                    }))
                  }
                  placeholder="72"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="temperature">Temperature (°F)</Label>
                <Input
                  id="temperature"
                  type="number"
                  step="0.1"
                  value={formData.vitalSigns.temperature}
                  onChange={(e) =>
                    setFormData((prev) => ({
                      ...prev,
                      vitalSigns: { ...prev.vitalSigns, temperature: e.target.value },
                    }))
                  }
                  placeholder="98.6"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="weight">Weight (lbs)</Label>
                <Input
                  id="weight"
                  type="number"
                  step="0.1"
                  value={formData.vitalSigns.weight}
                  onChange={(e) =>
                    setFormData((prev) => ({
                      ...prev,
                      vitalSigns: { ...prev.vitalSigns, weight: e.target.value },
                    }))
                  }
                  placeholder="150"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="height">Height (in)</Label>
                <Input
                  id="height"
                  type="number"
                  step="0.1"
                  value={formData.vitalSigns.height}
                  onChange={(e) =>
                    setFormData((prev) => ({
                      ...prev,
                      vitalSigns: { ...prev.vitalSigns, height: e.target.value },
                    }))
                  }
                  placeholder="68"
                />
              </div>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="examination">Physical Examination</Label>
            <Textarea
              id="examination"
              value={formData.examination}
              onChange={(e) => setFormData((prev) => ({ ...prev, examination: e.target.value }))}
              placeholder="Physical examination findings..."
              rows={3}
            />
          </div>

          <div className="space-y-3">
            <Label>Diagnoses</Label>
            <div className="flex gap-2">
              <Input
                value={newDiagnosis}
                onChange={(e) => setNewDiagnosis(e.target.value)}
                placeholder="Add diagnosis..."
                onKeyPress={(e) => e.key === "Enter" && (e.preventDefault(), addDiagnosis())}
              />
              <Button type="button" onClick={addDiagnosis} size="sm">
                <Plus className="h-4 w-4" />
              </Button>
            </div>
            <div className="flex flex-wrap gap-2">
              {formData.diagnosis.map((diagnosis, index) => (
                <Badge key={index} variant="secondary" className="flex items-center gap-1">
                  {diagnosis}
                  <X className="h-3 w-3 cursor-pointer" onClick={() => removeDiagnosis(index)} />
                </Badge>
              ))}
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="treatment">Treatment Plan</Label>
            <Textarea
              id="treatment"
              value={formData.treatment}
              onChange={(e) => setFormData((prev) => ({ ...prev, treatment: e.target.value }))}
              placeholder="Treatment plan and recommendations..."
              rows={3}
            />
          </div>

          <div className="space-y-4">
            <Label>Medications</Label>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-4 border rounded-lg">
              <div className="space-y-2">
                <Label htmlFor="medName">Medication Name</Label>
                <Input
                  id="medName"
                  value={newMedication.name}
                  onChange={(e) => setNewMedication((prev) => ({ ...prev, name: e.target.value }))}
                  placeholder="e.g., Amoxicillin"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="medDosage">Dosage</Label>
                <Input
                  id="medDosage"
                  value={newMedication.dosage}
                  onChange={(e) => setNewMedication((prev) => ({ ...prev, dosage: e.target.value }))}
                  placeholder="e.g., 500mg"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="medFrequency">Frequency</Label>
                <Input
                  id="medFrequency"
                  value={newMedication.frequency}
                  onChange={(e) => setNewMedication((prev) => ({ ...prev, frequency: e.target.value }))}
                  placeholder="e.g., 3 times daily"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="medDuration">Duration</Label>
                <Input
                  id="medDuration"
                  value={newMedication.duration}
                  onChange={(e) => setNewMedication((prev) => ({ ...prev, duration: e.target.value }))}
                  placeholder="e.g., 7 days"
                />
              </div>
              <div className="space-y-2 md:col-span-2">
                <Label htmlFor="medInstructions">Instructions</Label>
                <Input
                  id="medInstructions"
                  value={newMedication.instructions}
                  onChange={(e) => setNewMedication((prev) => ({ ...prev, instructions: e.target.value }))}
                  placeholder="e.g., Take with food"
                />
              </div>
              <div className="md:col-span-2">
                <Button type="button" onClick={addMedication} size="sm" className="w-full">
                  <Plus className="h-4 w-4 mr-2" />
                  Add Medication
                </Button>
              </div>
            </div>

            {formData.medications.length > 0 && (
              <div className="space-y-2">
                {formData.medications.map((medication, index) => (
                  <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                    <div>
                      <div className="font-medium">{medication.name}</div>
                      <div className="text-sm text-muted-foreground">
                        {medication.dosage} - {medication.frequency} for {medication.duration}
                      </div>
                      {medication.instructions && (
                        <div className="text-sm text-muted-foreground">{medication.instructions}</div>
                      )}
                    </div>
                    <Button type="button" variant="destructive" size="sm" onClick={() => removeMedication(index)}>
                      <X className="h-4 w-4" />
                    </Button>
                  </div>
                ))}
              </div>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="followUpDate">Follow-up Date</Label>
            <Input
              id="followUpDate"
              type="date"
              value={formData.followUpDate}
              onChange={(e) => setFormData((prev) => ({ ...prev, followUpDate: e.target.value }))}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="notes">Additional Notes</Label>
            <Textarea
              id="notes"
              value={formData.notes}
              onChange={(e) => setFormData((prev) => ({ ...prev, notes: e.target.value }))}
              placeholder="Additional notes or observations..."
              rows={3}
            />
          </div>

          <div className="flex justify-end gap-3 pt-4">
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
              Cancel
            </Button>
            <Button type="submit" className="bg-primary hover:bg-primary/90">
              Save Visit Record
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  )
}
