import RegisterForm from "@/components/register-form";
import Link from "next/link";
import { ChartArea } from "lucide-react";
import { unstable_ViewTransition as ViewTransition } from "react";

const RegisterPage = () => {
  return (

    <div >
    <div className="min-h-svh grid lg:grid-cols-2 text-primary">
      <div className="bg-[var(--color-app-500)] relative hidden lg:block">
      </div>
      <div className="flex flex-col gap-4 p-4 w-full">
          <div className="p-4 flex justify-center md:justify-start">     
             <Link href="/" className="flex items-center gap-2 font-medium">
              <ViewTransition name="logo-transition">
                <div className="bg-primary text-primary-foreground flex size-6 items-center justify-center rounded-md">
                  <ChartArea className="size-4" /> 
                </div>
                <span>OpenAnalytics</span>
              </ViewTransition>
            </Link>
          </div>
          <div className=" h-full w-full flex items-center justify-center">
            <div className=" max-w-xs w-full">
              <RegisterForm />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;
