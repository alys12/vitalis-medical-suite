import React from "react";
import { 
  LayoutDashboard, 
  Users, 
  Calendar, 
  Activity, 
  Settings, 
  LifeBuoy, 
  Stethoscope,
  LogOut
} from "lucide-react";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarHeader,
  SidebarSeparator,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarMenuBadge,
} from "@/components/ui/sidebar";
import { useLocation, Link } from "react-router-dom";
export function AppSidebar(): JSX.Element {
  const location = useLocation();
  const pathname = location.pathname;
  const isActive = (path: string) => pathname === path;
  return (
    <Sidebar variant="sidebar" collapsible="icon">
      <SidebarHeader>
        <div className="flex items-center gap-3 px-2 py-3">
          <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-teal-600 text-white shadow-md">
            <Stethoscope className="h-5 w-5" />
          </div>
          <div className="flex flex-col gap-0.5 leading-none group-data-[collapsible=icon]:hidden">
            <span className="font-bold text-lg tracking-tight text-teal-900 dark:text-teal-100">Vitalis</span>
            <span className="text-xs font-medium text-muted-foreground">Medical Suite</span>
          </div>
        </div>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Practice</SidebarGroupLabel>
          <SidebarMenu>
            <SidebarMenuItem>
              <SidebarMenuButton asChild isActive={isActive("/")} tooltip="Dashboard">
                <Link to="/">
                  <LayoutDashboard /> 
                  <span>Dashboard</span>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
            <SidebarMenuItem>
              <SidebarMenuButton asChild isActive={isActive("/patients")} tooltip="Patients">
                <Link to="/patients">
                  <Users /> 
                  <span>Patients</span>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
            <SidebarMenuItem>
              <SidebarMenuButton asChild isActive={isActive("/schedule")} tooltip="Schedule">
                <Link to="/schedule">
                  <Calendar /> 
                  <span>Schedule</span>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarGroup>
        <SidebarGroup>
          <SidebarGroupLabel>Analytics</SidebarGroupLabel>
          <SidebarMenu>
            <SidebarMenuItem>
              <SidebarMenuButton asChild isActive={isActive("/analytics")} tooltip="Reports">
                <Link to="/analytics">
                  <Activity /> 
                  <span>Reports</span>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarGroup>
        <SidebarSeparator />
        <SidebarGroup>
          <SidebarGroupLabel>System</SidebarGroupLabel>
          <SidebarMenu>
            <SidebarMenuItem>
              <SidebarMenuButton asChild isActive={isActive("/settings")} tooltip="Settings">
                <Link to="/settings">
                  <Settings /> 
                  <span>Settings</span>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
            <SidebarMenuItem>
              <SidebarMenuButton asChild tooltip="Support">
                <a href="#">
                  <LifeBuoy /> 
                  <span>Support</span>
                </a>
              </SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton className="text-red-600 hover:text-red-700 hover:bg-red-50 dark:hover:bg-red-950/20">
              <LogOut />
              <span>Sign Out</span>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  );
}