import { getEvents } from "@/actions/events";
import { getSessions } from "@/actions/sessions";
import { Table, TableBody, TableCaption, TableCell, TableFooter, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { PageParams } from "@/lib/type";
import { formatDate, formatSeconds } from "@/lib/utils";

const EventsPage = async ({ params }: { params: PageParams }) => {
  const { proj_id } = await params;
  const res = await getSessions(proj_id);
  if (!res.success) {
    return (
      <div className="container mx-auto px-4 py-8">
        <h3 className="font-semibold text-2xl mb-4">Failed to fetch</h3>
      </div>
    );
  }

  const { content: sessions } = res.data;

  return (
    <>
      <div className="">
        <h3 className="font-semibold text-2xl">Sessions</h3>
        {sessions.length > 0 && (
          <Table className="w-full mt-4">
            <TableCaption>List of events</TableCaption>
            <TableHeader className="">
              <TableRow>
                <TableHead className="w-[100px]">SessionID</TableHead>
                <TableHead className="w-[150px]">User Agent</TableHead>
                <TableHead>Duration</TableHead>
                <TableHead>createdAt</TableHead>
                <TableHead>Last Update</TableHead>
                <TableHead>Events</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody className="">
              {sessions.map((session, index) => (
                <TableRow key={"event_" + index}>
                  <TableCell className="font-medium">{session.sessionId}</TableCell>
                  <TableCell className="inline-block text-ellipsis">{session.userAgent}</TableCell>
                  <TableCell>{formatSeconds(session.duration)}</TableCell>
                  <TableCell>{formatDate(session.createdAt)}</TableCell>
                  <TableCell>{formatDate(session.updatedAt)}</TableCell>
                  <TableCell>{session.noOfEvents}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        )}

        {sessions.length === 0 && (
          <div className="container mx-auto px-4 py-8">
            <h3 className="font-semibold text-2xl mb-4 text-center">No session found</h3>
          </div>
        )}
      </div>
    </>
  );
};

export default EventsPage;
