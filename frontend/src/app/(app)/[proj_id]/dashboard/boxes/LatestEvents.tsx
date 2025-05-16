"use client";

import { getLatestEvents } from "@/actions/events";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Table, TableBody, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Event } from "@/lib/type";
import { cn } from "@/lib/utils";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";

const LatestEvents = ({ project_id, events }: { project_id: string; events: Event[] }) => {
  const [data, setData] = useState<Event[]>(events);
  const [eventSource, setEventSource] = useState<EventSource | null>(null);
  const { status, data: userData } = useSession({
    required: true,
  });
  useEffect(() => {
    if (status !== "authenticated") {
      return;
    }
    const es = new EventSource(process.env.NEXT_PUBLIC_API_URL + `/sse/${project_id}/events?auth_token=${userData.auth_token}`, {
      // withCredentials: true,
    });
    setEventSource(es);
    console.log("EventSource: added");

    es.onmessage = function (e) {
      console.log(e);
      if (e.lastEventId == "new_event") {
        console.log("New event:", e.data);
        setData((prevData) => [JSON.parse(e.data), ...prevData]);
      }
    };

    es.onerror = function (err) {
      console.error("Error:", err);
      es.close();
      setEventSource(null);
    };
  }, [status]);

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex justify-between items-center">
          <p>Latest Events</p>
          <Badge
            className={cn("text-xs aspect-square h-2 p-0 w-2 ring-2 rounded-full", {
              "bg-green-300  ring-green-200 shadow": eventSource,
              "bg-red-400 ring-red-200": !eventSource,
            })}
          ></Badge>
        </CardTitle>
      </CardHeader>
      <CardContent className="max-h-[200px]">
        <ScrollArea className="h-full">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Event</TableHead>
                <TableHead>Page</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {data.map((event, index) => (
                <TableRow key={index}>
                  <TableHead>{event.name}</TableHead>
                  <TableHead>{event.page}</TableHead>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </ScrollArea>
      </CardContent>
    </Card>
  );
};

export default LatestEvents;
