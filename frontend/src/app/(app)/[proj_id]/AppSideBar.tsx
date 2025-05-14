"use client";

import { NavUser } from "@/components/nav-user";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Sidebar, SidebarContent, SidebarFooter, SidebarGroup, SidebarGroupContent, SidebarHeader, SidebarMenu, SidebarMenuButton, SidebarMenuItem, SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { Toaster } from "@/components/ui/sonner";
import { BowArrow, ChartAreaIcon, ChevronDown, DnaIcon, Home, SearchSlashIcon, WorkflowIcon } from "lucide-react";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { usePathname, useRouter, useParams } from "next/navigation";
import { ReactNode, useEffect } from "react";
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
                    <BowArrow /> Sessions
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton asChild isActive={path === "/projects"}>
                  <Link href={"/projects"}>
                    <WorkflowIcon /> Projects
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={data!.user} />
      </SidebarFooter>
    </Sidebar>
  );
};

export default AppSideBar;
