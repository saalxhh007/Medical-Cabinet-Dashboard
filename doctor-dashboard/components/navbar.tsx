import { Bell, Search, Settings, User2Icon } from "lucide-react";
import { Input } from "@/components/ui/input";
import { SidebarTrigger } from "@/components/ui/sidebar";
import Link from "next/link";
import { Button } from "./ui/button";
import { useState } from "react";


export function Navbar() {
  const [clicked, setClicked] = useState(false)

const showNotifications = () => {
  setClicked(!clicked)
}
  return (
    <header className="flex items-center justify-between p-4 bg-card border-b shadow-card">
      <div className="flex items-center gap-4">
        <SidebarTrigger />
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
          <Input
            placeholder="Search patients, appointments..."
            className="pl-10 w-80"
          />
        </div>
      </div>
      
      <div className="flex items-center gap-4">
        <Link href="/settings">
          <Settings className="text-[#16697A]"/>
        </Link>
        <Button
          className={`cursor-pointer ${clicked ? "bg-[#16697A] text-white" : "bg-white text-[#16697A]"
            }`} onClick={showNotifications}>
          <Bell />
        </Button>
      </div>
    </header>
  )
}