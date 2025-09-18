"use client"

import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { RotateCcw, FileDown, Users, Clock, Activity, Video } from "lucide-react"
import { StatCard } from "./stat-card"
import { PatientList } from "./ui/patient-list"
import { VisitDetails } from "./visit-details"
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card"
import { Calendar } from "./ui/calendar"
import { TodayTimeline } from "./today-timeline"
import { PatientAgeChart } from "./age-chart"
import { VisitDurationChart } from "./visit-duration-chart"
import axios from "axios"

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

export function MedicalDashboard() {
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date())
  const [selectedVisit, setSelectedVisit] = useState<Appointment | undefined>()
  const [selectedPatient, setSelectedPatient] = useState<Patient | undefined>()
  const [patients, setPatients] = useState<Patient[]>([])
  const [visits, setVisits] = useState<Appointment[]>([])
  const [patientsStats, setPatientsStats] = useState<any[]>([])
  const [visitsStats, setVisitsStats] = useState<any[]>([])
  const [sessionStats, setSessionStats] = useState<any[]>([])
  const [conditionStats, setConditionStats] = useState<any[]>([])

  const apiUrl = process.env.NEXT_PUBLIC_DASHBOARD_API_URL

  const calculateAge = (dob: string) => {
    const birthDate = new Date(dob)
    const today = new Date()
    let age = today.getFullYear() - birthDate.getFullYear()
    const m = today.getMonth() - birthDate.getMonth()
    if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
      age--
    }
    return age
  }

  const buildAgeStats = (patients: Patient[]) => {
    let range1 = 0
    let range2 = 0
    let range3 = 0

    patients.forEach((p) => {
      if (p.dateOfBirth) {
        const age = calculateAge(p.dateOfBirth)
        if (age >= 1 && age <= 20) range1++
        else if (age > 21 && age <= 50) range2++
        else if (age > 50) range3++
      }
    })

    return [
      { value: range1, label: "20 Y.O <", color: "hsl(var(--medical-primary))" },
      { value: range2, label: "21-50 Y.O", color: "hsl(var(--medical-secondary))" },
      { value: range3, label: "50+ Y.O", color: "hsl(var(--medical-warning))" },
    ]
  }

  const buildVisitStats = (visits: Appointment[]) => {
    if (!visits || visits.length === 0) {
      return [
        { value: "0 min", label: "AVERAGE" },
        { value: "0 min", label: "MINIMUM" },
        { value: "0 min", label: "MAXIMUM" },
      ]
    }

    const durations = visits.map((v) => Number(v.duration))

    const total = durations.reduce((sum, d) => sum + d, 0)
    const avg = total / durations.length
    const min = Math.min(...durations)
    const max = Math.max(...durations)

    const formatDuration = (minutes: number) => {
      if (minutes < 60) return `${minutes} min`
      const hours = Math.floor(minutes / 60)
      const mins = minutes % 60
      return mins > 0 ? `${hours}h ${mins}m` : `${hours}h`
    }

    return [
      { value: formatDuration(Math.round(avg)), label: "AVERAGE" },
      { value: formatDuration(min), label: "MINIMUM" },
      { value: formatDuration(max), label: "MAXIMUM" },
    ]
  }

  const buildSessionStats = (visits: Appointment[]) => {
    if (!visits || visits.length === 0) {
      return [
        { value: "0h", label: "IN CLINIC" },
        { value: "0h", label: "VIDEO CALLS" },
        { value: "0h", label: "IN CHAT" },
      ]
    }

    const getDurationMinutes = (start: string, end: string) => {
      const s = new Date(start).getTime()
      const e = new Date(end).getTime()

      return Math.max(0, Math.floor((e - s) / 60000))
    }

    let clinic = 0
    let video = 0
    let chat = 0

    visits.forEach((visit) => {
      if (!visit.duration) {
        const duration = getDurationMinutes(visit.time, visit.time + visit.duration)
      }
      
      if (visit.type === "in-person") clinic += Number(visit.duration)
      else if (visit.type === "video call") video += Number(visit.duration)
      else if (visit.type === "chat") chat += Number(visit.duration)
    })
    
    const formatDuration = (minutes: number) => {
      if (minutes <= 0) return "0h"
      const h = Math.floor(minutes / 60)
      const m = minutes % 60
      return m > 0 ? `${h}:${m.toString().padStart(2, "0")} h` : `${h}h`
    }

    return [
      { value: formatDuration(clinic), label: "IN CLINIC" },
      { value: formatDuration(video), label: "VIDEO CALLS" },
      { value: formatDuration(chat), label: "IN CHAT" },
    ]
  }

  const buildConditionStats = (patients: Patient[]) => {
    if (!patients || patients.length === 0) {
      return [
        { value: "0", label: "STABLE", color: "hsl(var(--medical-success))" },
        { value: "0", label: "FAIR", color: "hsl(var(--medical-warning))" },
        { value: "0", label: "CRITICAL", color: "hsl(var(--medical-danger))" },
      ]
    }

    let stable = 0
    let fair = 0
    let critical = 0

    patients.forEach((p) => {
      switch (p.condition?.toLowerCase()) {
        case "stable":
          stable++
          break
        case "fair":
          fair++
          break
        case "critical":
          critical++
          break
        default:
          break
      }
    })

    return [
      { value: stable.toString(), label: "STABLE", color: "hsl(var(--medical-success))" },
      { value: fair.toString(), label: "FAIR", color: "hsl(var(--medical-warning))" },
      { value: critical.toString(), label: "CRITICAL", color: "hsl(var(--medical-danger))" },
    ]
  }

  const fetchPatients = async () => {
    try {
      const response = await axios.get(`${apiUrl}/api/v1/patient`)
      const fetchedPatients: Patient[] = response.data

      setPatients(fetchedPatients)
      setPatientsStats(buildAgeStats(fetchedPatients))
      setConditionStats(buildConditionStats(fetchedPatients))
    } catch (err) {
      console.error(err)
    }
  }

  const fetchVisits = async () => {
    try {
      const response = await axios.get(`${apiUrl}/api/v1/appointment`)
      const fetchedVisits: Appointment[] = response.data

      setVisits(fetchedVisits)
      setVisitsStats(buildVisitStats(fetchedVisits))
      setSessionStats(buildSessionStats(fetchedVisits))
    } catch (err) {
      console.error(err)
    }
  }

  const deletePatient = async () => {

  }
  
  useEffect(() => {
    fetchPatients()
    fetchVisits()
  }, [])
  
  return (
    <div className="min-h-screen bg-background">
      <main className="p-6">
        {/* Greeting Section */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2 text-[#16697A]">Good Morning, Dr Escanor</h1>
          <p className="text-muted-foreground">You have {visits.length} appointments today</p>
        </div>

        <div className="grid grid-cols-1 xl:grid-cols-8">
          {/* Main Content - Left Side */}
          <div className="xl:col-span-6 space-y-2">
            <div className="grid grid-cols-1 md:grid-cols-1 xl:grid-cols-2 gap-2">
              <StatCard
                title="Patients"
                icon={Users}
                stats={patientsStats}
                bg_color={"#F4DA6E"}
                children={
                  <PatientAgeChart
                    data={patientsStats.map(s => ({
                      ageRange: s.label,
                      patients: s.value,
                    }))}
                  />
                }
              />

              <StatCard
                title="Visit Summary"
                icon={Clock}
                stats={visitsStats}
                bg_color={"#F5B8DA"}
                children={
                  <VisitDurationChart
                    data={visitsStats.map(s => ({
                      time: s.label,
                      duration: Number(s.value.replace(" min", "")),
                    }))}
                  />
                }
              />
              <StatCard title="By Condition" icon={Activity} stats={conditionStats} bg_color={"#9AAB64"} />

              <StatCard title="Sessions" icon={Video} stats={sessionStats} bg_color={"#B6CAEB"} />
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <PatientList
                onSelectPatient={setSelectedPatient}
                patients={patients}
                onDeletePatient={deletePatient}
              />
              <VisitDetails patient={selectedPatient} />
            </div>
          </div>

          <div className="xl:col-span-2 space-y-6">
            <Card className="bg-gradient-card shadow-card border-0">
              <CardHeader>
                <CardTitle className="text-lg font-semibold">Calendar</CardTitle>
              </CardHeader>
              <CardContent>
                <Calendar mode="single" selected={selectedDate} onSelect={setSelectedDate} className="rounded-md" />
                <div className="flex items-center justify-between mt-4 pt-4 border-t">
                  <Button size="sm" className="flex-1 mr-2 bg-[#82C0CC] hover:bg-[#489FB5] cursor-pointer">
                    Add Event
                  </Button>
                  <Button variant="outline" size="sm">
                    <RotateCcw className="h-4 w-4" />
                  </Button>
                  <Button variant="outline" size="sm" className="ml-2 bg-transparent">
                    <FileDown className="h-4 w-4" />
                  </Button>
                </div>
              </CardContent>
            </Card>
            
            <TodayTimeline day={selectedDate} />

          </div>
        </div>
      </main>
    </div>
  )
}
