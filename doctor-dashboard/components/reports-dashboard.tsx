"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { FileText, Download, Calendar, Users, Activity, TrendingUp, Filter, Search } from "lucide-react"
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

interface Report {
  id: number
  name: string
  type: string
  status: string
  created_at: string
}

export function ReportsDashboard() {
  const [recentReports, setRecentReports] = useState<Report[]>([])

  const [dateRange, setDateRange] = useState({ from: "", to: "" })
  const [reportType, setReportType] = useState("")
  const [searchTerm, setSearchTerm] = useState("")

  const apiUrl = process.env.NEXT_PUBLIC_DASHBOARD_API_URL

  const generatePatientReport = () => {
    const today = new Date()
    const month = today.getMonth() + 1
    const year = today.getFullYear()
    axios.post(`${apiUrl}/api/v1/report/patient-summary`, {
      month,
      year
    })
      .then((response) => {
        const url = window.URL.createObjectURL(new Blob([response.data]))
        const link = document.createElement("a")
        link.href = url
        link.setAttribute("download", "patient-summary.pdf")
        document.body.appendChild(link)
        link.click()
    })
  }

  const generateAppointmentReport = () => {
    const today = new Date()
    const month = today.getMonth() + 1
    const year = today.getFullYear()
    axios.post(`${apiUrl}/api/v1/report/appointment-analysis`, {
      month,
      year
    })
      .then((response) => {
        const url = window.URL.createObjectURL(new Blob([response.data]))
        const link = document.createElement("a")
        link.href = url
        link.setAttribute("download", "appointment-analysis.pdf")
        document.body.appendChild(link)
        link.click()
      })
      .catch((err) => {
      console.log(err);
      
    })
  }

  const generateAppointmentRecordReport = () => {
    const today = new Date()
    const month = today.getMonth() + 1
    const year = today.getFullYear()
    axios.post(`${apiUrl}/api/v1/report/appointment-records`, {
      month,
      year
    })
      .then((response) => {
        const url = window.URL.createObjectURL(new Blob([response.data]))
        const link = document.createElement("a")
        link.href = url
        link.setAttribute("download", "appointment-records.pdf")
        document.body.appendChild(link)
        link.click()
      })
      .catch((err) => {
      console.log(err);
    })
  }

  const generateFinancialSummaryReport = () => {
    const today = new Date()
    const month = today.getMonth() + 1
    const year = today.getFullYear()
    axios.post(`${apiUrl}/api/v1/report/financial-summary`, {
      month,
      year
    })
      .then((response) => {
        const url = window.URL.createObjectURL(new Blob([response.data]))
        const link = document.createElement("a")
        link.href = url
        link.setAttribute("download", "financial-summary.pdf")
        document.body.appendChild(link)
        link.click()
      })
      .catch((err) => {
      console.log(err);
    })
  }
  
  const reportTemplates = [
    {
      id: "patient-summary",
      title: "Patient Summary Report",
      description: "Comprehensive overview of all patients including demographics and statistics",
      icon: Users,
      color: "text-blue-600",
      bgColor: "bg-blue-50",
      action: generatePatientReport,
    },
    {
      id: "appointment-analysis",
      title: "Appointment Analysis",
      description: "Detailed analysis of appointment patterns, completion rates, and trends",
      icon: Calendar,
      color: "text-green-600",
      bgColor: "bg-green-50",
      action: generateAppointmentReport,
    },
    {
      id: "appointment-records",
      title: "Appointment Records Report",
      description: "Complete appointment history with diagnoses, treatments, and outcomes",
      icon: Activity,
      color: "text-purple-600",
      bgColor: "bg-purple-50",
      action: generateAppointmentRecordReport,
    },
    {
      id: "financial-summary",
      title: "Financial Summary",
      description: "Revenue analysis, billing summaries, and financial performance metrics",
      icon: TrendingUp,
      color: "text-orange-600",
      bgColor: "bg-orange-50",
      action: generateFinancialSummaryReport,
    },
  ]

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-[#16697A]">Medical Reports</h1>
        <p className="text-muted-foreground">Generate comprehensive reports and analytics for your medical practice</p>
      </div>

      {/* Report Filters */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-[#16697A]">
            <Filter className="h-5 w-5"/>
            Report Filters
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="space-y-2">
              <Label htmlFor="from-date" className="text-[#489FB5]">From Date</Label>
              <Input
                id="from-date"
                type="date"
                value={dateRange.from}
                onChange={(e) => setDateRange((prev) => ({ ...prev, from: e.target.value }))}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="to-date" className="text-[#489FB5]">To Date</Label>
              <Input
                id="to-date"
                type="date"
                value={dateRange.to}
                onChange={(e) => setDateRange((prev) => ({ ...prev, to: e.target.value }))}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="report-type" className="text-[#489FB5]">Report Type</Label>
              <Select value={reportType} onValueChange={setReportType}>
                <SelectTrigger>
                  <SelectValue placeholder="Select report type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="patient">Patient Reports</SelectItem>
                  <SelectItem value="appointment">Appointment Reports</SelectItem>
                  <SelectItem value="appointment">Appointments Reports</SelectItem>
                  <SelectItem value="financial">Financial Reports</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="search" className="text-[#489FB5]">Search</Label>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  id="search"
                  placeholder="Search reports..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Report Templates */}
      <div>
        <h2 className="text-xl font-semibold mb-4 text-[#16697A]">Report Templates</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {reportTemplates.map((template) => {
            const Icon = template.icon
            return (
              <Card key={template.id} className="hover:shadow-md transition-shadow">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className={`p-3 rounded-full ${template.bgColor}`}>
                        <Icon className={`h-6 w-6 ${template.color}`} />
                      </div>
                      <div>
                        <CardTitle className="text-lg text-[#16697A]">{template.title}</CardTitle>
                        <p className="text-sm text-muted-foreground mt-1">{template.description}</p>
                      </div>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <Button onClick={template.action} className="w-full bg-[#82C0CC] hover:bg-[#489FB5] cursor-pointer">
                    <Download className="h-4 w-4 mr-2" />
                    Generate Report
                  </Button>
                </CardContent>
              </Card>
            )
          })}
        </div>
      </div>

      {/* Recent Reports */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-[#16697A]">
            <FileText className="h-5 w-5" />
            Recent Reports
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {recentReports.map((report) => (
              <div key={report.id} className="flex items-center justify-between p-4 border rounded-lg">
                <div className="flex items-center gap-3">
                  <FileText className="h-5 w-5 text-muted-foreground" />
                  <div>
                    <p className="font-medium">{report.name}</p>
                    <p className="text-sm text-muted-foreground">
                      {report.type} • Generated on {new Date(report.created_at).toLocaleDateString()}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Badge variant="secondary">{report.status}</Badge>
                  <Button variant="outline" size="sm">
                    <Download className="h-4 w-4 mr-2" />
                    Download
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}