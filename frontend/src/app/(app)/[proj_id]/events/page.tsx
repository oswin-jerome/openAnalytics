import { getEvents } from "@/actions/events";
import { Table, TableBody, TableCaption, TableCell, TableFooter, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { PageParams } from "@/lib/type";
import { formatDate } from "@/lib/utils";

type SearchParams = Promise<{ [key: string]: string | string[] | undefined }>;

const EventsPage = async ({ params, searchParams }: { params: PageParams; searchParams: SearchParams }) => {
  const { proj_id } = await params;
  const search = await searchParams;
  const res = await getEvents(proj_id, {
    name: (search.name as string) ?? "",
  });
  if (!res.success) {
    return (
      <div className="container mx-auto px-4 py-8">
        <h3 className="font-semibold text-2xl mb-4">Failed to fetch</h3>
      </div>
    );
  }

  const { content: events } = res.data;

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
                <TableHead>Type</TableHead>
                <TableHead>Page</TableHead>
                <TableHead>Url</TableHead>
                <TableHead>Referrer</TableHead>
                <TableHead>CreatedAt</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {events.map((event, index) => (
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
