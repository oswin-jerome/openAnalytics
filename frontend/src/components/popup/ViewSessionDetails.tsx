"use client";

import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";

import { useEffect } from "react";
import { Button } from "../ui/button";
import { Eye } from "lucide-react";
import { useActions } from "@/lib/useActions";
import { Event, Session } from "@/lib/type";
import { Card, CardDescription, CardHeader, CardTitle } from "../ui/card";
import { getASessionWithEvents } from "@/actions/sessions";
import { formatDate, formatSeconds } from "@/lib/utils";
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from "../ui/table";
import { ScrollArea } from "../ui/scroll-area";

const ViewSessionDetails = ({ no, sessionId }: { no: number; sessionId: string }) => {
  const { data, execute, loading } = useActions<{
    session: Session;
    events: Event[];
  }>();

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button
          onClick={() => {
            console.log(sessionId);
            execute(getASessionWithEvents, sessionId);
          }}
          size={"sm"}
          variant={"ghost"}
        >
          <Eye />
          {no}
        </Button>
      </SheetTrigger>
      <SheetContent className="min-w-4xl">
        <SheetHeader className="bg-pink-400">
          <SheetTitle>Session Details</SheetTitle>
          <SheetDescription>View session details.</SheetDescription>
        </SheetHeader>
        {loading && <div className="p-4">Please wait....</div>}
        {data && (
          <div className="h-full bg-red-50 flex flex-col">
            <div className="p-4 grid gap-2 grid-cols-3 ">
              <Card>
                <CardHeader>
                  <CardTitle>{no}</CardTitle>
                  <CardDescription>Events</CardDescription>
                </CardHeader>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle>{formatSeconds(data.session.duration)}</CardTitle>
                  <CardDescription>Duration</CardDescription>
                </CardHeader>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle>{data.session.userAgent}</CardTitle>
                  <CardDescription>User Agent</CardDescription>
                </CardHeader>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle>
                    <Dialog>
                      <DialogTrigger asChild>
                        <Button variant={"outline"}>View Meta</Button>
                      </DialogTrigger>
                      <DialogContent>{JSON.stringify(data.session.metaData)}</DialogContent>
                    </Dialog>
                  </CardTitle>
                  <CardDescription>Meta Data</CardDescription>
                </CardHeader>
              </Card>
            </div>

            <h3 className="font-semibold text-xl px-4">Events</h3>
            <section className="col-span-2 mt-4 px-4 bg-yellow-600 flex-1">
              <ScrollArea className=" pb-16">
                <Table className="w-full mt-4">
                  <TableCaption>List of events</TableCaption>
                  <TableHeader className="">
                    <TableRow>
                      <TableHead className="w-[100px]">Name</TableHead>
                      <TableHead>Type</TableHead>
                      <TableHead>Page</TableHead>
                      <TableHead>Url</TableHead>
                      <TableHead>Referrer</TableHead>
                      <TableHead>CreatedAt</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {data.events?.map((event, index) => (
                      <TableRow key={"event_" + index}>
                        <TableCell className="font-medium">{event.name}</TableCell>
                        <TableCell>{event.eventType}</TableCell>
                        <TableCell>{event.page}</TableCell>
                        <TableCell>{event.url}</TableCell>
                        <TableCell>{event.referrer}</TableCell>
                        <TableCell>{formatDate(event.createdAt)}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </ScrollArea>
            </section>
          </div>
        )}
      </SheetContent>
    </Sheet>
  );
};

export default ViewSessionDetails;
