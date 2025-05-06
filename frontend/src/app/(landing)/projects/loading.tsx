"use client";

import { Skeleton } from "@/components/ui/skeleton";

const LoadingProjects = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <h3 className="font-semibold text-2xl mb-4">Projects</h3>
      <div className="space-y-4">
        <Skeleton className="h-32" />
        <Skeleton className="h-32" />
        <Skeleton className="h-32" />
        <Skeleton className="h-32" />
      </div>
    </div>
  );
};

export default LoadingProjects;
