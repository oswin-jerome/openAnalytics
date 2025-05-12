"use client";
import { Button } from "@/components/ui/button";
import UserPopup from "@/components/userPopup";
import { ChartArea, ChartBar, ListStart, LogIn, Newspaper, Signpost, Sparkles } from "lucide-react";
import type { Metadata } from "next";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { unstable_ViewTransition as ViewTransition } from "react";

// export const metadata: Metadata = {
//   title: "OpenAnalytics",
//   description:
//     "OpenAnalytics is an analytics platform that tracks web page traffic and custom events, similar to Google Analytics. It provides an API to track user sessions, page views, user actions, and other custom events such as CPU/Memory usage. It’s designed for scalability and supports integration with any web application, with a focus on providing meaningful insights into user interactions.",
// };

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  // FIXME: Move to separate component
  const { status, data } = useSession();

  return (
    <main className="text-primary">
      <nav className="p-4 py-6 flex justify-between items-center text-primary container mx-auto">
        <div className="flex gap-20 items-center">
          <Link href={"/"} className="flex items-center gap-2">
            <ViewTransition name="logo-transition">
              <div className="bg-primary text-primary-foreground flex size-6 items-center justify-center rounded-md">
                <ChartArea className="size-4" />
              </div>
              <div className="text-2xl font-bold">OpenAnalytics</div>
            </ViewTransition>
          </Link>
          <ul className="gap-8 hidden md:flex">
            <Link href={"/"}>
              <li>Home</li>
            </Link>
            <Link href={"/"}>
              <li>About</li>
            </Link>
            <Link href={"/"}>
              <li>How it works?</li>
            </Link>
          </ul>
        </div>
        {status != "authenticated" && (
          <>
            <div className="gap-4 hidden md:flex ">
              <Link href={"/login"}>
                <Button>
                  <LogIn /> Login
                </Button>
              </Link>
              <Link href={"/register"}>
                <Button variant={"outline"}>
                  <Newspaper /> Register
                </Button>
              </Link>
            </div>
            <Link className="md:hidden" href={"/login"}>
              <Button size={"icon"} variant={"ghost"}>
                <LogIn />
              </Button>
            </Link>
          </>
        )}
        {status === "authenticated" && (
          <div className="flex gap-4 items-center">
            <Link href={"/projects"} className="hidden md:flex">
              <Button variant={"ghost"} className="gap-2">
                <Sparkles /> Projects
              </Button>
            </Link>
            <UserPopup user={data.user} />
          </div>
        )}
      </nav>
      {children}
    </main>
  );
}
