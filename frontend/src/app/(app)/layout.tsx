"use client";

import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { ReactNode } from "react";

const AuthLayout = ({ children }: { children: ReactNode }) => {
  const { status, data } = useSession({
    required: true,
    onUnauthenticated() {
      // Redirect to the login page
      router.push("/login");
    },
  });
  const router = useRouter();
  if (status === "loading") {
    return (
      <div className="flex items-center justify-center h-screen">
        <p>Checking authentication...</p>
      </div>
    );
  }
  return <div>{children}</div>;
};

export default AuthLayout;
