"use client";

import { NavUser } from "@/components/nav-user";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { SelectSeparator } from "@/components/ui/select";
import { Sidebar, SidebarContent, SidebarFooter, SidebarGroup, SidebarGroupContent, SidebarHeader, SidebarMenu, SidebarMenuButton, SidebarMenuItem, SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { Toaster } from "@/components/ui/sonner";
import { BowArrow, ChartAreaIcon, ChevronDown, ChevronFirst, Clock10, DnaIcon, Home, SearchSlashIcon, Settings2, WorkflowIcon } from "lucide-react";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { usePathname, useRouter, useParams } from "next/navigation";
import { ReactNode, useEffect } from "react";
import { toast } from "sonner";
const AppSideBar = () => {
  const path = usePathname();
  const { proj_id } = useParams();
  const { status, data } = useSession({
    required: true,
  });

  return (
    <Sidebar variant="sidebar" collapsible="icon" className="">
      <SidebarHeader className=""></SidebarHeader>
      <SidebarContent className="">
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu className="">
              <SidebarMenuItem>
                <SidebarMenuButton asChild isActive={path.endsWith("/dashboard")}>
                  <Link href={`/${proj_id}/dashboard`}>
                    <ChartAreaIcon /> Dashboard
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton asChild isActive={path.endsWith("/events")}>
                  <Link href={`/${proj_id}/events`}>
                    <DnaIcon /> Events
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton asChild isActive={path.endsWith("/sessions")}>
                  <Link href={`/${proj_id}/sessions`}>
                    <Clock10 /> Sessions
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton asChild isActive={path === "/settings"}>
                  <Link href={`/${proj_id}/settings`}>
                    <Settings2 /> Settings
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter>
        <SidebarMenuItem>
          <SidebarMenuButton asChild isActive={path === "/projects"}>
            <Link href={"/projects"}>
              <WorkflowIcon /> Projects
            </Link>
          </SidebarMenuButton>
        </SidebarMenuItem>
        <SelectSeparator />
        <NavUser user={data!.user} />
      </SidebarFooter>
    </Sidebar>
  );
};

export default AppSideBar;
