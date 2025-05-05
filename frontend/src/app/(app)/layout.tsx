"use client";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Sidebar, SidebarContent, SidebarFooter, SidebarGroup, SidebarGroupContent, SidebarHeader, SidebarMenu, SidebarMenuButton, SidebarMenuItem, SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { Toaster } from "@/components/ui/sonner";
import { BowArrow, ChartAreaIcon, ChevronDown, DnaIcon, Home, SearchSlashIcon } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ReactNode } from "react";

const AppLayout = ({ children }: { children: ReactNode }) => {
  const path = usePathname();
  return (
    <SidebarProvider>
      <Toaster />
      <Sidebar variant="floating" collapsible="icon" className="">
        <SidebarHeader className="">
          {/* <SidebarMenu className="">
            <SidebarMenuItem>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <SidebarMenuButton size={"lg"}>
                    Select a project <ChevronDown className="ml-auto aspect-square" />
                  </SidebarMenuButton>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-full">
                  <DropdownMenuItem>Project 1</DropdownMenuItem>
                  <DropdownMenuItem>Project 2</DropdownMenuItem>
                  <DropdownMenuItem>Project 3</DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </SidebarMenuItem>
          </SidebarMenu> */}
        </SidebarHeader>
        <SidebarContent>
          <SidebarGroup>
            <SidebarGroupContent>
              <SidebarMenu className="">
                <SidebarMenuItem>
                  <SidebarMenuButton asChild isActive={path === "/dashboard"}>
                    <Link href={"/dashboard"}>
                      <ChartAreaIcon /> Dashboard
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
                <SidebarMenuItem>
                  <SidebarMenuButton asChild isActive={path === "/events"}>
                    <Link href={"/events"}>
                      <DnaIcon /> Events
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
                <SidebarMenuItem>
                  <SidebarMenuButton asChild isActive={path === "/sessions"}>
                    <Link href={"/sessions"}>
                      <BowArrow /> Sessions
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        </SidebarContent>
        <SidebarFooter>
          <p></p>
        </SidebarFooter>
      </Sidebar>
      <div className="p-4 relative w-full">
        <div className="mb-4 flex items-center ">
          <SidebarTrigger /> <p>| openAnalytics</p>
        </div>

        <div>{children}</div>
      </div>
    </SidebarProvider>
  );
};

export default AppLayout;
