"use client";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import React from "react";
import { Button } from "./ui/button";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { registerUser } from "@/actions/auth";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { signIn } from "next-auth/react";

export default function RegisterFrom() {
  const router = useRouter();
  const {
    register,
    handleSubmit,

    formState: { errors, isLoading, isSubmitting },
  } = useForm({
    defaultValues: {
      name: "",
      email: "",
      password: "",
    },
  });

  return (
    <form
      onSubmit={handleSubmit(async (data) => {
        const res = await registerUser(data);
        if (res?.success) {
          toast.success("Registration successful");
          signIn("credentials", {
            ...data,
            redirect: true,
            callbackUrl: "/",
          });
        } else {
          toast.error(!res?.message || "Registration failed");
        }
      })}
      className="flex flex-col gap-6"
    >
      <div className=" grid gap-2 text-center ">
        <p className="font-bold text-2xl">Get Started Now</p>
        <p className="text-muted-foreground text-sm text-balance">Enter your Credentials to access your account</p>
      </div>
      <div className="grid gap-6">
        <div className="grid gap-2">
          <Label htmlFor="name">Name</Label>
          <Input id="name" type="text" {...register("name", { required: true })}></Input>
        </div>
        <div className="grid gap-2">
          <Label htmlFor="email">Email</Label>
          <Input id="email" type="email" {...register("email", { required: true })}></Input>
        </div>
        <div className="grid gap-2">
          <Label htmlFor="password">Password</Label>
          <Input id="password" type="password" {...register("password", { required: true })}></Input>
        </div>
        <div className="grid gap-2">
          <Label htmlFor="Cpassword">Confirm Password</Label>
          <Input id="Cpassword" type="password"></Input>
        </div>
        <Button loading={isSubmitting} disabled={isSubmitting}>
          Register
        </Button>
        <div className="flex flex-col gap-2 items-center">
          <p className="bg-background text-muted-foreground  px-2">or</p>
          <div className="flex gap-1  text-center text-sm">
            <p>Already Register?</p>
            <Link href="/login" className="underline underline-offset-4">
              Login
            </Link>
          </div>
        </div>
      </div>
    </form>
  );
}
