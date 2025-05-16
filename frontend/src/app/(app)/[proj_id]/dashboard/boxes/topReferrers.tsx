import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { EventCount, Project } from "@/lib/type";

const TopReferrers = ({ topReferrers }: { topReferrers: EventCount[] | undefined }) => {
  return (
    <Card className="">
      <CardHeader>
        <CardTitle>Top Referrers</CardTitle>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Page</TableHead>
              <TableHead>Count</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {topReferrers?.map((page, index) => (
              <TableRow key={"top_pages_" + index}>
                <TableCell>{page.key}</TableCell>
                <TableCell>{page.value}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
};

export default TopReferrers;
