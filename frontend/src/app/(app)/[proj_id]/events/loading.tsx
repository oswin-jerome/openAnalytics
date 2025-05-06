"use client";

import { Skeleton } from "@/components/ui/skeleton";
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

const DashboardLoading = () => {
  const data = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
  return (
    <div>
      <h3 className="font-semibold text-2xl">Events</h3>
      <Table className="w-full mt-4">
        <TableCaption>List of events</TableCaption>
        <TableHeader className="">
          <TableRow>
            <TableHead className="w-[100px]">Name</TableHead>
            <TableHead>Page</TableHead>
            <TableHead>Url</TableHead>
            <TableHead>CreatedAt</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {data.map((_, index) => (
            <TableRow key={"event_loading_" + index}>
              <TableCell className="font-medium">
                <Skeleton className="h-8" />
              </TableCell>
              <TableCell>
                <Skeleton className="h-8" />
              </TableCell>
              <TableCell>
                <Skeleton className="h-8" />
              </TableCell>
              <TableCell>
                <Skeleton className="h-8" />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default DashboardLoading;
