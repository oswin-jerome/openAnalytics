"use client";

import { Skeleton } from "@/components/ui/skeleton";

const DashboardLoading = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 ">
      <Skeleton className="h-80" />
      <Skeleton />
      <Skeleton />
      <Skeleton />
    </div>
  );
};

export default DashboardLoading;
