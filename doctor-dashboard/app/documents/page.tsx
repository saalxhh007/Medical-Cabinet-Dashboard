"use client"

import { DocumentsDashboard } from "@/components/documents-dashboard"
import { MedicalSidebar } from "@/components/medical-sidebar"
import { Navbar } from "@/components/navbar"
import { SidebarProvider } from "@/components/ui/sidebar"

const Documents = () => {
  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full">
        <MedicalSidebar/>
        <div className="flex-1 flex flex-col">
          <Navbar />
          <main className="p-6 flex-1">
            <DocumentsDashboard />
          </main>
        </div>
      </div>
    </SidebarProvider>
  )
}

export default Documents