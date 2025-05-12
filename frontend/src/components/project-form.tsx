"use client";

import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { Label } from "@radix-ui/react-label";
import Link from "next/link";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "./ui/card";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { useActions } from "@/lib/useActions";
import { createProject } from "@/actions/projects";
import { toast } from "sonner";
import { Project } from "@/lib/type";

export default function CreateProjectForm() {
  const router = useRouter();
  const { execute, data, loading, error } = useActions<Project>();
  const {
    register,
    handleSubmit,

    formState: { errors, isLoading, isSubmitting },
  } = useForm({
    defaultValues: {
      name: "",
      domain: "",
    },
  });

  return (
    <form
      className="max-w-2xl  grid gap-6 "
      onSubmit={handleSubmit(async (data) => {
        const res = await execute(createProject, data.name, data.domain);
        if (res?.success) {
          router.push(res.data.id + "/dashboard");
        } else {
          toast.error(!res?.message || "Project creation failed");
        }
      })}
    >
      <Card>
        <CardHeader>
          <CardTitle>New Project</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 ">
            <div className="grid gap-2  ">
              <Label className="">Project Name</Label>
              <Input placeholder="Enter your project name" type="text" {...register("name", { required: true })}></Input>
            </div>
            <div className="grid gap-2 ">
              <Label>Domain Name</Label>
              <Input placeholder="Enter your Domain name" type="text" {...register("domain", { required: true })}></Input>
            </div>
          </div>
        </CardContent>
        <CardFooter>
          <div className="flex w-full justify-end items-center gap-3 max-w-2xl  min-w-full">
            <Button type="submit" loading={loading} disabled={loading} className=" w-[10rem]  md:max-w-xs md:w-full shadow-sm">
              Create
            </Button>
          </div>
        </CardFooter>
      </Card>
    </form>
  );
}
