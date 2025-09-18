import {
  LayoutDashboard,
  Calendar,
  Users2,
  PieChart,
  FileText,
  Phone,
  MessageCircle,
  CircleDollarSign,
  Paperclip,
  Settings,
  LogOut,
} from "lucide-react";
// import { NavLink } from "react-router-dom";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar";
import { Button } from "@/components/ui/button";
import Link from "next/link";

const generalItems = [
  { title: "Dashboard", url: "/", icon: LayoutDashboard },
  { title: "Appointments", url: "/appointments", icon: Calendar },
  { title: "Patients", url: "/patients", icon: Users2 },
  { title: "Statistics", url: "/statistics", icon: PieChart },
  { title: "Reports", url: "/reports", icon: FileText },
];

const toolItems = [
  { title: "Calls", url: "/calls", icon: Phone },
  { title: "Chat", url: "/chats", icon: MessageCircle },
  { title: "Billing", url: "/billings", icon: CircleDollarSign },
  { title: "Documents", url: "/documents", icon: Paperclip },
  { title: "Settings", url: "/settings", icon: Settings },
];

export function MedicalSidebar() {
  const { state } = useSidebar()
  const collapsed = state === "collapsed"

  const handleLogout = () => {
    console.log("Logout clicked")
  }

  const getNavCls = ({ isActive }: { isActive: boolean }) =>
    isActive 
      ? "bg-medical-primary text-white font-medium hover:bg-medical-primary/90" 
      : "hover:bg-accent text-muted-foreground hover:text-foreground"

  return (
    <Sidebar className={collapsed ? "w-16" : "w-64"} collapsible="icon">
      <SidebarContent className="bg-[#FFA62B] rounded-br-2xl rounded-tr-2xl">
        {/* General Section */}
        <SidebarGroup>
          <SidebarGroupLabel className="text-xs font-semibold text-[#FFF] uppercase tracking-wider">
            {!collapsed && "General"}
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu className="text-[#F2EFE5]">
              {generalItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <Link 
                        href={item.url}
                    >
                      <item.icon className="h-5 w-5 flex-shrink-0" />
                      {!collapsed && <span className="ml-3">{item.title}</span>}
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        {/* Tools Section */}
        <SidebarGroup>
          <SidebarGroupLabel className="text-xs font-semibold text-[#FFF] uppercase tracking-wider">
            {!collapsed && "Tools"}
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu className="text-[#F2EFE5]">
              {toolItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <Link 
                        href={item.url}
                    >
                      <item.icon className="h-5 w-5 flex-shrink-0" />
                      {!collapsed && <span className="ml-3">{item.title}</span>}
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        {/* Logout Button */}
        <div className="mt-auto p-4">
          <Button
            onClick={handleLogout}
            variant="ghost"
            className="w-full justify-start text-[#82C0CC] hover:text-[#fff] hover:bg-[#16697A] cursor-pointer"
          >
            <LogOut className="h-5 w-5 flex-shrink-0" />
            {!collapsed && <span className="ml-3">Log out</span>}
          </Button>
        </div>
      </SidebarContent>
    </Sidebar>
  )
}