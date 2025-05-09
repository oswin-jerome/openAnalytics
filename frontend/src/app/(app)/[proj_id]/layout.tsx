// "use client";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { Toaster } from "@/components/ui/sonner";
import { ReactNode } from "react";
import AppSideBar from "./AppSideBar";
import { getProject } from "@/actions/projects";
import { ChartArea } from "lucide-react";
import { unstable_ViewTransition as ViewTransition } from "react";

type Params = Promise<{ proj_id: string }>;

const AppLayout = async ({ children, params }: { children: ReactNode; params: Params }) => {
  const { proj_id } = await params;
  // FIXME: make this call light weight
  const res = await getProject(proj_id);
  if (!res.success) {
    return (
      <div className="container mx-auto px-4 py-8">
        <h3 className="font-semibold text-2xl mb-4">Project not found</h3>
      </div>
    );
  }
  return (
    <SidebarProvider>
      <Toaster />
      <AppSideBar />
      <div className="p-4 relative w-full overflow-hidden">
        <div className="mb-4 flex items-center ">
          <SidebarTrigger />
          {" |"}
          <div className="ml-1 flex items-center gap-2">
            <ViewTransition name="logo-transition">
              <div className="bg-transparent text-primary flex size-6 items-center justify-center rounded-md">
                <ChartArea className="size-4" />
              </div>
              <div className="">OpenAnalytics</div>
            </ViewTransition>
          </div>
        </div>

        <div className="">{children}</div>
      </div>
    </SidebarProvider>
  );
};

export default AppLayout;
