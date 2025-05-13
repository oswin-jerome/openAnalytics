import { getASessionWithEvents } from "@/actions/sessions";
import { PageParams } from "@/lib/type";
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";

import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Eye } from "lucide-react";
import { useActions } from "@/lib/useActions";
import { Event, Session } from "@/lib/type";
import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { formatDate, formatSeconds } from "@/lib/utils";
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { ScrollArea } from "@/components/ui/scroll-area";
type P = Promise<{ sessionId: string }> & PageParams;
const SessionEventsPage = async ({ params }: { params: P }) => {
  const param = await params;
  const res = await getASessionWithEvents(param.sessionId);

  if (!res.success) {
    return (
      <div className="container mx-auto px-4 py-8">
        <h3 className="font-semibold text-2xl mb-4">Failed to fetch</h3>
      </div>
    );
  }

  const { events, session } = res.data;

  return (
    <div className="h-full flex flex-col">
      <div className="grid gap-4 grid-cols-3 ">
        <Card>
          <CardHeader>
            <CardTitle>{events.length}</CardTitle>
            <CardDescription>Events</CardDescription>
          </CardHeader>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>{formatSeconds(session.duration)}</CardTitle>
            <CardDescription>Duration</CardDescription>
          </CardHeader>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>{session.userAgent}</CardTitle>
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
                <DialogContent>
                  <pre className=" rounded-md overflow-x-auto text-sm text-gray-800">{JSON.stringify(session.metaData, null, 2)}</pre>
                </DialogContent>
              </Dialog>
            </CardTitle>
            <CardDescription>Meta Data</CardDescription>
          </CardHeader>
        </Card>
      </div>

      <section className="col-span-2 mt-8  flex-1 relative">
        <h3 className="font-semibold text-xl">Events</h3>
        <ScrollArea className=" pb-16">
          <Table className="w-full mt-2">
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
              {events?.map((event, index) => (
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
  );
};

export default SessionEventsPage;
