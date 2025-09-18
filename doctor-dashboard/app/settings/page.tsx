"use client"

import { MedicalSidebar } from "@/components/medical-sidebar"
import { Navbar } from "@/components/navbar"
import { SettingsDashboard } from "@/components/settings-dashboard"
import { SidebarProvider } from "@/components/ui/sidebar"

const Settings = () => {
  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full">
        <MedicalSidebar/>
        <div className="flex-1 flex flex-col">
          <Navbar/>
          <main className="p-6 flex-1">
            <SettingsDashboard />
          </main>
        </div>
      </div>
    </SidebarProvider>
  )
}

export default Settings
