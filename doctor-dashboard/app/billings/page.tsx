"use client"
import { BillingDashboard } from "@/components/billing-dashboard"
import { MedicalSidebar } from "@/components/medical-sidebar"
import { Navbar } from "@/components/navbar"
import { SidebarProvider } from "@/components/ui/sidebar"

const Billing = () => {
  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full">
        <MedicalSidebar/>
        <div className="flex-1 flex flex-col">
          <Navbar />
          <main className="p-6 flex-1">
            <BillingDashboard />
          </main>
        </div>
      </div>
    </SidebarProvider>
  )
}

export default Billing