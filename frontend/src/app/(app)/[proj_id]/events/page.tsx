import { getEvents } from "@/actions/events";
import { Table, TableBody, TableCaption, TableCell, TableFooter, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { PageParams } from "@/lib/type";
import { formatDate } from "@/lib/utils";

const EventsPage = async ({ params }: { params: PageParams }) => {
  const { proj_id } = await params;
  const res = await getEvents(proj_id);
  if (!res.success) {
    return (
      <div className="container mx-auto px-4 py-8">
        <h3 className="font-semibold text-2xl mb-4">Failed to fetch</h3>
      </div>
    );
  }

  const events = res.data;

  return (
    <>
      <div className="">
        <h3 className="font-semibold text-2xl">Events</h3>
        {events.length > 0 && (
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
              {events.map((event, index) => (
                <TableRow key={"event_" + index}>
                  <TableCell className="font-medium">{event.name}</TableCell>
                  <TableCell>{event.page}</TableCell>
                  <TableCell>{event.url}</TableCell>
                  <TableCell>{formatDate(event.createdAt)}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        )}

        {events.length === 0 && (
          <div className="container mx-auto px-4 py-8">
            <h3 className="font-semibold text-2xl mb-4 text-center">No events found</h3>
          </div>
        )}
      </div>
    </>
  );
};

export default EventsPage;
