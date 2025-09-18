"use client"

import { useEffect, useState } from "react"
import { SidebarProvider } from "@/components/ui/sidebar"
import { PatientDetail } from "@/components/patient-detail"
import { MedicalSidebar } from "@/components/medical-sidebar"
import { Navbar } from "@/components/navbar"
import { PatientList } from "@/components/ui/patient-list"
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

const Patients = () => {
  const [selectedPatient, setSelectedPatient] = useState<Patient | null>(null)
  const [patients, setPatients] = useState<Patient[]>([])
  const apiUrl = process.env.NEXT_PUBLIC_DASHBOARD_API_URL
  
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
  
  const fetchPatients = async () => {
    try {
      const response = await axios.get(`${apiUrl}/api/v1/patient`)
      const fetchedPatients: Patient[] = response.data
      setPatients(fetchedPatients)
    } catch (err) {
      console.error(err)
    }
  }
  const deletePatient = async () => {

  }
  
  useEffect(() => {
    fetchPatients()
  }, [])

  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full">
        <MedicalSidebar/>
        <div className="flex-1 flex flex-col">
          <Navbar />
          <main className="p-6 flex-1">
            {selectedPatient ? (
              <PatientDetail patient={selectedPatient} onBack={() => setSelectedPatient(null)} />
            ) : (
              <PatientList patients={patients} onSelectPatient={setSelectedPatient} onDeletePatient={deletePatient}/>
            )}
          </main>
        </div>
      </div>
    </SidebarProvider>
  )
}

export default Patients
