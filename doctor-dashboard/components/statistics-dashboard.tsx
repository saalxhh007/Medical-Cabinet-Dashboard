"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import {
  Users,
  Calendar,
  TrendingUp,
  TrendingDown,
  Activity,
  Clock,
  CheckCircle,
  AlertCircle,
  FileText,
} from "lucide-react"
import { useEffect, useState } from "react"
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
    patient: Patient
}

export function StatisticsDashboard() {
  const [patients, setPatients] = useState<Patient[]>([])
  const [appointments, setAppointments] = useState<Appointment[]>([])
  const [diagnoses, setDiagnoses] = useState<string[]>([])

  const today = new Date().toISOString().split("T")[0]
  const thisMonth = new Date().toISOString().slice(0, 7)
  const lastMonth = new Date(new Date().setMonth(new Date().getMonth() - 1)).toISOString().slice(0, 7)

  const todayAppointments = appointments.filter((apt) => apt.date === today)
  const thisMonthAppointments = appointments.filter((apt) => apt.date.startsWith(thisMonth))
  const lastMonthAppointments = appointments.filter((apt) => apt.date.startsWith(lastMonth))

  const completedAppointments = appointments.filter((apt) => apt.status === "completed")
  const cancelledAppointments = appointments.filter((apt) => apt.status === "cancelled")

  const appointmentGrowth =
    lastMonthAppointments.length > 0
      ? ((thisMonthAppointments.length - lastMonthAppointments.length) / lastMonthAppointments.length) * 100
      : 0

  const apiUrl = process.env.NEXT_PUBLIC_DASHBOARD_API_URL

  const diagnosisCount = diagnoses.reduce(
    (acc, diagnosis) => {
      acc[diagnosis] = (acc[diagnosis] || 0) + 1
      return acc
    },
    {} as Record<string, number>,
  )

  const topDiagnoses = Object.entries(diagnosisCount)
    .sort(([, a], [, b]) => b - a)
    .slice(0, 5)

  const ageGroups = patients.reduce(
    (acc, patient) => {
      const age = new Date().getFullYear() - new Date(patient.dateOfBirth ?? "").getFullYear()
      if (age < 18) acc["0-17"]++
      else if (age < 35) acc["18-34"]++
      else if (age < 50) acc["35-49"]++
      else if (age < 65) acc["50-64"]++
      else acc["65+"]++
      return acc
    },
    { "0-17": 0, "18-34": 0, "35-49": 0, "50-64": 0, "65+": 0 },
  )

  const stats = [
    {
      title: "Total Patients",
      value: patients.length,
      icon: Users,
      color: "text-blue-600",
      bgColor: "bg-blue-50",
      change: "+12%",
      changeType: "positive",
    },
    {
      title: "This Month Appointments",
      value: thisMonthAppointments.length,
      icon: Calendar,
      color: "text-green-600",
      bgColor: "bg-green-50",
      change: `${appointmentGrowth > 0 ? "+" : ""}${appointmentGrowth.toFixed(1)}%`,
      changeType: appointmentGrowth >= 0 ? "positive" : "negative",
    },
    {
      title: "Completed Appointments",
      value: completedAppointments.length,
      icon: CheckCircle,
      color: "text-purple-600",
      bgColor: "bg-purple-50",
      change: `${appointmentGrowth > 0 ? "+" : ""}${appointmentGrowth.toFixed(1)}%`,
      changeType: appointmentGrowth >= 0 ? "positive" : "negative",
    },
    {
      title: "Total Diagnoses",
      value: diagnoses.length,
      icon: FileText,
      color: "text-orange-600",
      bgColor: "bg-orange-50",
      change: "+8%",
      changeType: "positive",
    },
  ]

  const fetchPatients = async () => {
    try {
      const response = await axios.get(`${apiUrl}/api/v1/patient`)
      const fetchedPatients: Patient[] = response.data
      setPatients(fetchedPatients)
    } catch (err) {
      console.error(err)
    }
  }

  const fetchVisits = async () => {
    try {
      const response = await axios.get(`${apiUrl}/api/v1/appointment`)
      setAppointments(response.data)
    } catch (err) {
      console.error(err)
    }
  }
  useEffect(() => {
    fetchPatients()
    fetchVisits()
  }, [])
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-[#16697A]">Medical Statistics</h1>
        <p className="text-muted-foreground">Comprehensive analytics and insights for your medical practice</p>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat) => {
          const Icon = stat.icon
          return (
            <Card key={stat.title}>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-[#489FB5]">{stat.title}</p>
                    <p className="text-2xl font-bold text-[#16697A]">{stat.value}</p>
                    <div className="flex items-center gap-1 mt-1">
                      {stat.changeType === "positive" ? (
                        <TrendingUp className="h-3 w-3 text-green-600" />
                      ) : (
                        <TrendingDown className="h-3 w-3 text-red-600" />
                      )}
                      <span className={`text-xs ${stat.changeType === "positive" ? "text-green-600" : "text-red-600"}`}>
                        {stat.change}
                      </span>
                    </div>
                  </div>
                  <div className={`p-3 rounded-full ${stat.bgColor}`}>
                    <Icon className={`h-6 w-6 ${stat.color}`} />
                  </div>
                </div>
              </CardContent>
            </Card>
          )
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Age Distribution */}
        <Card>
          <CardHeader>
            <CardTitle className="text-[#16697A]">Patient Age Distribution</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {Object.entries(ageGroups).map(([ageGroup, count]) => (
                <div key={ageGroup} className="flex items-center justify-between">
                  <div className="flex items-center gap-3 text-[#489FB5]">
                    <span className="font-medium">{ageGroup} years</span>
                    <Badge variant="secondary">{count} patients</Badge>
                  </div>
                  <div className="flex-1 mx-4">
                    <Progress value={patients.length > 0 ? (count / patients.length) * 100 : 0} className="h-2" />
                  </div>
                  <span className="text-sm text-muted-foreground">
                    {patients.length > 0 ? Math.round((count / patients.length) * 100) : 0}%
                  </span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Top Diagnoses */}
        <Card>
          <CardHeader>
            <CardTitle>Most Common Diagnoses</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {topDiagnoses.length > 0 ? (
                topDiagnoses.map(([diagnosis, count], index) => (
                  <div key={diagnosis} className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center text-xs font-medium">
                        {index + 1}
                      </div>
                      <span className="font-medium truncate">{diagnosis}</span>
                    </div>
                    <Badge variant="outline">{count} cases</Badge>
                  </div>
                ))
              ) : (
                <p className="text-muted-foreground text-center py-4">No diagnoses recorded yet</p>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Appointment Status Breakdown */}
        <Card>
          <CardHeader>
            <CardTitle className="text-[#16697A]">Appointment Status Overview</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4 text-[#16697A]">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <CheckCircle className="h-4 w-4 text-green-600" />
                  <span>Completed</span>
                </div>
                <Badge className="text-[#16697A] bg-[#fff]">{completedAppointments.length}</Badge>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Clock className="h-4 w-4 text-orange-600" />
                  <span>Scheduled</span>
                </div>
                <Badge className="text-[#16697A] bg-[#fff]">{appointments.filter((apt) => apt.status === "scheduled").length}</Badge>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Activity className="h-4 w-4 text-blue-600" />
                  <span>Confirmed</span>
                </div>
                <Badge className="text-[#16697A] bg-[#fff]">{appointments.filter((apt) => apt.status === "confirmed").length}</Badge>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <AlertCircle className="h-4 w-4 text-red-600" />
                  <span>Cancelled</span>
                </div>
                <Badge className="text-[#16697A] bg-[#fff]">{cancelledAppointments.length}</Badge>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Today's Activity */}
        <Card>
          <CardHeader>
            <CardTitle className="text-[#16697A]">Today's Activity</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4 text-[#489FB5]">
              <div className="flex items-center justify-between">
                <span>Scheduled Appointments</span>
                <Badge className="text-[#16697A] bg-[#fff]">{todayAppointments.length}</Badge>
              </div>
              <div className="flex items-center justify-between">
                <span>Completed Today</span>
                <Badge className="text-[#16697A] bg-[#fff]">{todayAppointments.filter((apt) => apt.status === "completed").length}</Badge>
              </div>
              <div className="flex items-center justify-between">
                <span>Remaining</span>
                <Badge className="text-[#16697A] bg-[#fff]">
                  {todayAppointments.filter((apt) => apt.status !== "completed" && apt.status !== "cancelled").length}
                </Badge>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}