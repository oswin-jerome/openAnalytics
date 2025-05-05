import { Button } from "@/components/ui/button";
import { ListStart, LogIn, Newspaper, Signpost } from "lucide-react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "OpenAnalytics",
  description:
    "OpenAnalytics is an analytics platform that tracks web page traffic and custom events, similar to Google Analytics. It provides an API to track user sessions, page views, user actions, and other custom events such as CPU/Memory usage. It’s designed for scalability and supports integration with any web application, with a focus on providing meaningful insights into user interactions.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <main className="text-primary">
      <nav className="p-4 py-6 flex justify-between items-center text-primary container mx-auto">
        <div className="flex gap-20 items-center">
          <div className="text-2xl font-bold">OpenAnalytics</div>
          <ul className="gap-8 hidden md:flex">
            <li>Home</li>
            <li>About</li>
            <li>How it works?</li>
          </ul>
        </div>
        <div className="flex gap-4">
          <Button>
            <LogIn /> Login
          </Button>
          <Button variant={"outline"}>
            <Newspaper /> Register
          </Button>
        </div>
      </nav>
      {children}
    </main>
  );
}
