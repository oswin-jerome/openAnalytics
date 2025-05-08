
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import React from 'react';
import { Button } from "./ui/button";
import Link from "next/link";

export  default function RegisterFrom(){
return (
    <form className="flex flex-col gap-6">
        <div className=" grid gap-2 text-center ">
          <p className="font-bold text-2xl">Get Started Now</p>
          <p className="text-muted-foreground text-sm text-balance">Enter your Credentials to access your account</p>
        </div>
        <div className="grid gap-6">
        <div className="grid gap-3">
            <Label htmlFor="email" >Email</Label>
            <Input id="email" type="email"></Input>
        </div>
        <div className="grid gap-3">
            <Label htmlFor="password" >Password</Label>
            <Input id="password" type="password"></Input>
        </div>
        <div className="grid gap-3">
            <Label htmlFor="Cpassword">Confirm Password</Label>
            <Input id="Cpassword" type="password"></Input>
        </div>
        <Button>Register</Button>
        <div className="flex flex-col gap-2 items-center">
          <p className="bg-background text-muted-foreground  px-2">or</p>
         <div className="flex gap-1  text-center text-sm">
         <p >Already Register?</p>
         <Link href="/login" className="underline underline-offset-4">Login</Link>
         </div>
        </div>
        </div>

    </form>
)
}