import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { GitBranch, Rocket } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <main>
      <div className="p-4 grid grid-cols-1 md:grid-cols-2 gap-4 container mx-auto min-h-[90dvh]">
        <section className="mt-20">
          <h1 className="text-6xl text-primary/80">
            <span className="text-primary font-bold">Analytics</span> that fit your stack, not the other way around.
          </h1>
          <p className="text-primary mt-4">
            OpenAnalytics is a lightweight, self-hosted analytics platform that lets you track website traffic, custom events, and system metrics — all without compromising on privacy. Built for developers, it integrates seamlessly with any stack and gives you full control over your data.
          </p>

          <div className="mt-16 space-x-4">
            <Link href={"/dashboard"}>
              <Button className=" px-10">
                <Rocket />
                Get Started
              </Button>
            </Link>
            <Button variant={"outline"} className=" px-10">
              <GitBranch />
              Get Source Code
            </Button>
          </div>
        </section>
      </div>
      <section className="bg-white min-h-[50dvh] relative">
        <Card className="h-56 absolute w-[90%] border-transparent  left-1/2 -translate-x-1/2 -translate-y-1/2">
          <CardHeader>
            <CardTitle className="text-3xl text-primary">How it works?</CardTitle>
          </CardHeader>
          <CardContent>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Maxime blanditiis modi corrupti repellendus ratione est? Eum ipsum ad ea laboriosam delectus cumque odit dolorum, nam culpa est esse totam suscipit!</CardContent>
        </Card>
      </section>
    </main>
  );
}
