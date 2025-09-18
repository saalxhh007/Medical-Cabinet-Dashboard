"use client"
import { SidebarProvider } from "@/components/ui/sidebar"
import { MedicalSidebar } from "@/components/medical-sidebar"
import { Navbar } from "@/components/navbar"
import { CallDashboard } from "@/components/call-dashboard"

const Calls = () => {
  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full">
        <MedicalSidebar/>
        <div className="flex-1 flex flex-col">
          <Navbar/>
          <main className="p-6 flex-1">
            <CallDashboard/>
          </main>
        </div>
      </div>
    </SidebarProvider>
  )
}

export default Calls