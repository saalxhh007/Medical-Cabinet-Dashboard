"use client"

import { SidebarProvider } from "@/components/ui/sidebar"
import { Button } from "@/components/ui/button"
import { Clock, Filter, Phone, Plus, User, Calendar } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { MedicalSidebar } from "@/components/medical-sidebar"
import { Navbar } from "@/components/navbar"
import { useEffect, useState } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import axios from "axios"
import { toast } from "sonner"

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
    diagnosis?: string[]
    symptoms?: string[]
    notes: string[]
    chiefComplaint?: string
    vitalSigns?: string[]
    medications?: string[]
    treatment?: string
    followUpDate?: string
    createdAt: string
    Patient: Patient
}

const Appointments = () => {
  const [showAddDialog, setShowAddDialog] = useState(false)
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split("T")[0])
  const [statusFilter, setStatusFilter] = useState<string>("all")

  const [appointments, setAppointments] = useState<Appointment[]>([])
  const [patients, setPatients] = useState<Patient[]>([])
  const [newAppointment, setNewAppointment] = useState({
    patientId: "",
    date: "",
    time: "",
    type: "consultation",
    duration: "30",
    notes: [
      "",
    ],
  })

  const apiUrl = process.env.NEXT_PUBLIC_DASHBOARD_API_URL

  const filteredAppointments = appointments
    .filter((appointment) => {
      const matchesDate = appointment.date === selectedDate
      const matchesStatus = statusFilter === "all" || appointment.status === statusFilter
      return matchesDate && matchesStatus
    })
    .sort((a, b) => a.time.localeCompare(b.time))

  const getPatientName = (patient: Patient) => {
    return `${patient.firstName} ${patient.lastName}`
  }

  const getTypeColor = (type: string) => {
    switch (type) {
      case "in-person":
        return "default"
      case "video call":
        return "secondary"
      case "phone call":
        return "outline"
      default:
        return "default"
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "scheduled":
        return "default"
      case "confirmed":
        return "secondary"
      case "completed":
        return "outline"
      case "cancelled":
        return "destructive"
      default:
        return "default"
    }
  }

  const getPatientPhone = (patient: Patient) => {
    return patient.phone
  }

  const handleStatusChange = (appointmentId: number, newStatus: string) => {
    axios.patch(`${apiUrl}/api/v1/appointment/switch/status`, {
      status: newStatus,
      id: appointmentId
    })
      .then((response) => {
        setAppointments((prev) => prev.map((apt) => (apt.id === appointmentId ? { ...apt, status: newStatus } : apt)))
      })
      .catch((err) => {
        console.log(err);
        toast.error("Failed To Update Appointment Status!")
      })
  }

  const handleAddAppointment = () => {
    if (!newAppointment.patientId || !newAppointment.date || !newAppointment.time) {
      return
    }

    const selectedPatient = patients.find((p) => p.id === Number.parseInt(newAppointment.patientId))
    if (!selectedPatient) return

    axios.post(`${apiUrl}/api/v1/appointment`, {
      ...newAppointment,
      status: "confirmed",
      patient_id: selectedPatient.id
    })
      .then((response) => {
        toast.success("Appointment Added!")
      })
      .catch((err) => {
        console.log(err);
        toast.error("Failed To Add Appointment!")
      })
      .finally(() => {
        setNewAppointment({
          patientId: "",
          date: "",
          time: "",
          type: "consultation",
          duration: "30",
          notes: [
            ""
          ],
        })
        setShowAddDialog(false)
      })
  }

  const fetchPatients = async () => {
    try {
      const response = await axios.get(`${apiUrl}/api/v1/patient`)
      const fetchedPatients: Patient[] = response.data
      setPatients(fetchedPatients)
    } catch (err) {
      console.error(err)
    }
  }

  const fetchAppointments = async () => {
    try {
      const response = await axios.get(`${apiUrl}/api/v1/appointment`)
      const fetchedAppointments: Appointment[] = response.data
      setAppointments(fetchedAppointments)
    } catch (err) {
      console.error(err)
    }
  }

  useEffect(() => {
    fetchPatients()
    fetchAppointments()
  }, [])
  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full">
        <MedicalSidebar />
        <div className="flex-1 flex flex-col">
          <Navbar />
          <main className="p-6 space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-2xl font-bold text-[#16697A]">Appointments</h2>
              </div>
              <Button onClick={() => setShowAddDialog(true)} className="bg-[#82C0CC] hover:bg-[#489FB5] cursor-pointer">
                <Plus className="h-4 w-4 mr-2" />
                New Appointment
              </Button>
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <div className="flex items-center gap-2">
                <Calendar className="h-4 w-4 text-[#16697A]" />
                <Input
                  type="date"
                  value={selectedDate}
                  onChange={(e) => setSelectedDate(e.target.value)}
                  className="w-auto"
                />
              </div>
              <div className="flex items-center gap-2">
                <Filter className="h-4 w-4 text-[#16697A]" />
                <Select value={statusFilter} onValueChange={setStatusFilter}>
                  <SelectTrigger className="w-40">
                    <SelectValue placeholder="Filter by status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Status</SelectItem>
                    <SelectItem value="scheduled">Scheduled</SelectItem>
                    <SelectItem value="confirmed">Confirmed</SelectItem>
                    <SelectItem value="completed">Completed</SelectItem>
                    <SelectItem value="cancelled">Cancelled</SelectItem>
                    <SelectItem value="no-show">No Show</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="grid gap-4">
              {filteredAppointments.length === 0 ? (
                <Card>
                  <CardContent className="flex items-center justify-center py-8">
                    <div className="text-center">
                      <p className="text-muted-foreground mb-2">
                        No appointments found for {new Date(selectedDate).toLocaleDateString()}.
                      </p>
                      <Button onClick={() => setShowAddDialog(true)} variant="outline" className="text-[#16697A] hover:text-[#16697A] cursor-pointer">
                        <Plus className="h-4 w-4 mr-2" />
                        Schedule First Appointment
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ) : (
                filteredAppointments.map((appointment) => (
                  <Card key={appointment.id}>
                    <CardHeader className="pb-3">
                      <div className="flex items-center justify-between">
                        <CardTitle className="text-lg flex items-center gap-2 text-[#16697A]">
                          <Clock className="h-5 w-5" />
                          {appointment.time}
                        </CardTitle>
                        <div className="flex gap-2">
                          <Badge variant={getTypeColor(appointment.type)}>{appointment.type}</Badge>
                          <Badge variant={getStatusColor(appointment.status)}>{appointment.status}</Badge>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <User className="h-4 w-4 text-muted-foreground" />
                          <span className="font-medium text-[#16697A]">{getPatientName(appointment.Patient)}</span>
                        </div>
                        <div className="flex items-center gap-2 text-sm text-muted-foreground">
                          <Phone className="h-4 w-4" />
                          <span>{getPatientPhone(appointment.Patient)}</span>
                        </div>
                      </div>

                      <div className="flex items-center gap-2 text-sm text-[#489FB5]  ">
                        {appointment.duration
                          ?
                          <>
                            <Clock className="h-4 w-4" />
                            <span>Duration: {appointment.duration} minutes</span>
                          </>
                          :
                          "No Selected Duration"
                         }
                      </div>

                      {appointment.notes && (
                        <div>
                          <p className="text-sm text-muted-foreground">{appointment.notes}</p>
                        </div>
                      )}

                      <div className="flex items-center justify-between pt-2 border-t">
                        <div className="text-xs text-muted-foreground">
                          Created {new Date(appointment.createdAt).toLocaleDateString()}
                        </div>
                        <div className="flex gap-2">
                          {appointment.status === "scheduled" && (
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={() => handleStatusChange(appointment.id, "confirmed")}
                            >
                              Confirm
                            </Button>
                          )}
                          {appointment.status === "confirmed" && (
                            <Button
                              size="sm"
                              className="text-[#489FB5] bg-[#fff] hover:bg-[#16697A] hover:text-[#fff]"
                              onClick={() => handleStatusChange(appointment.id, "completed")}
                            >
                              Complete
                            </Button>
                          )}
                          {(appointment.status === "scheduled" || appointment.status === "confirmed") && (
                            <Button
                              size="sm"
                              variant="destructive"
                              onClick={() => handleStatusChange(appointment.id, "cancelled")}
                            >
                              Cancel
                            </Button>
                          )}
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))
              )}
            </div>

            <Dialog open={showAddDialog} onOpenChange={setShowAddDialog}>
              <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                  <DialogTitle className="text-[#16697A]">Schedule New Appointment</DialogTitle>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                  <div className="grid gap-2">
                    <Label htmlFor="patient">Patient</Label>
                    <Select
                      value={newAppointment.patientId}
                      onValueChange={(value) => setNewAppointment((prev) => ({ ...prev, patientId: value }))}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select a patient" />
                      </SelectTrigger>
                      <SelectContent>
                        {patients.map((patient) => (
                          <SelectItem key={patient.id} value={patient.id.toString()}>
                            {patient.firstName} {patient.lastName}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="date">Date</Label>
                    <Input
                      id="date"
                      type="date"
                      value={newAppointment.date}
                      onChange={(e) => setNewAppointment((prev) => ({ ...prev, date: e.target.value }))}
                    />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="time">Time</Label>
                    <Input
                      id="time"
                      type="time"
                      value={newAppointment.time}
                      onChange={(e) => setNewAppointment((prev) => ({ ...prev, time: e.target.value }))}
                    />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="type">Type</Label>
                    <Select
                      value={newAppointment.type}
                      onValueChange={(value) => setNewAppointment((prev) => ({ ...prev, type: value }))}
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="in-person">In-Person</SelectItem>
                        <SelectItem value="video call">Video Call</SelectItem>
                        <SelectItem value="phone call">Phone Call</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="duration">Duration (minutes)</Label>
                    <Input
                      id="duration"
                      type="number"
                      value={newAppointment.duration}
                      onChange={(e) => setNewAppointment((prev) => ({ ...prev, duration: e.target.value }))}
                    />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="notes">Notes</Label>
                    <Textarea
                      id="notes"
                      value={newAppointment.notes}
                      // onChange={(e) => setNewAppointment((prev) => ({ ...prev, notes: e.target.value }))}
                      placeholder="Additional notes..."
                    />
                  </div>
                </div>
                <div className="flex justify-end gap-2">
                  <Button variant="outline" className="text-[#960018] cursor-pointer" onClick={() => setShowAddDialog(false)}>
                    Cancel
                  </Button>
                  <Button className="bg-[#82C0CC] hover:bg-[#489FB5] cursor-pointer" onClick={handleAddAppointment}>Schedule Appointment</Button>
                </div>
              </DialogContent>
            </Dialog>
          </main>
        </div>
      </div>
    </SidebarProvider>
  )
}

export default Appointments
