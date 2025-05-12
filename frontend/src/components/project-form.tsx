import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { Label } from "@radix-ui/react-label";
import Link from "next/link";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "./ui/card";

export default function CreateProjectForm() {
  return (
    <form className="max-w-2xl  grid gap-6 ">
      <Card>
        <CardHeader>
          <CardTitle>New Project</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 ">
            <div className="grid gap-2  ">
              <Label className="">Project Name</Label>
              <Input placeholder="Enter your project name" type="text"></Input>
            </div>
            <div className="grid gap-2 ">
              <Label>Domain Name</Label>
              <Input placeholder="Enter your Domain name" type="text"></Input>
            </div>
          </div>
        </CardContent>
        <CardFooter>
          <div className="flex w-full justify-end items-center gap-3 max-w-2xl  min-w-full">
            <Link href="/projects" className=" w-[7rem]  md:max-w-[10rem] md:w-full ">
              <Button variant={"outline"} className="w-full">
                Cancel
              </Button>
            </Link>
            <Button className=" w-[10rem]  md:max-w-xs md:w-full shadow-sm">Create</Button>
          </div>
        </CardFooter>
      </Card>
    </form>
  );
}
