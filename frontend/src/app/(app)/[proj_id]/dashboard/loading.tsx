"use client";

import DurationFilter from "@/components/duration-filter";
import { Skeleton } from "@/components/ui/skeleton";

const DashboardLoading = () => {
  return (
    <div>
      <div className="mb-4">
        <DurationFilter />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 ">
        <Skeleton className="h-80" />
        <Skeleton className="xl:col-span-2" />
        <Skeleton />
        <Skeleton />
        <Skeleton />
        <Skeleton />
      </div>
    </div>
  );
};

export default DashboardLoading;
