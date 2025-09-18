"use client"

import { MedicalDashboard } from "@/components/medical-dashboard";
import { MedicalSidebar } from "@/components/medical-sidebar";
import { Navbar } from "@/components/navbar";
import { SidebarProvider } from "@/components/ui/sidebar";

export default function Home() {
  return (
    <div className="flex">
      <SidebarProvider>
        <div className="min-h-screen flex w-full">
          <MedicalSidebar />
          <div className="flex-1 flex flex-col">
            <Navbar />
            <MedicalDashboard />
          </div>
        </div>
      </SidebarProvider>
    </div>
  );
}
