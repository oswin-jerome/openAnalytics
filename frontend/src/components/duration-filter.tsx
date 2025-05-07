"use client";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

const DurationFilter = () => {
  const router = useRouter();
  const path = usePathname();
  const search = useSearchParams();

  return (
    <Select
      defaultValue={search.get("duration") ?? "24hrs"}
      onValueChange={(val) => {
        router.replace(path + "?duration=" + val);
      }}
    >
      <SelectTrigger>
        <SelectValue placeholder="Duration" />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="all">All</SelectItem>
        <SelectItem value="1year">Last 1 year</SelectItem>
        <SelectItem value="6months">Last 6 months</SelectItem>
        <SelectItem value="30days">Last 30 days</SelectItem>
        <SelectItem value="7days">Last 7 days</SelectItem>
        <SelectItem value="24hrs">Last 24 hrs</SelectItem>
        <SelectItem value="12hrs">Last 12 hrs</SelectItem>
        <SelectItem value="1hr">Last 1 hr</SelectItem>
        <SelectItem value="30mins">Last 30 mins</SelectItem>
        <SelectItem value="10mins">Last 10 mins</SelectItem>
        <SelectItem value="5mins">Last 5 mins</SelectItem>
      </SelectContent>
    </Select>
  );
};

export default DurationFilter;
