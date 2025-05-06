import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Project } from "@/lib/type";

const TopPages = ({ topPages }: { topPages: string[] | undefined }) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Top Pages</CardTitle>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Page</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {topPages?.map((page, index) => (
              <TableRow key={"top_pages_" + index}>
                <TableCell>{page}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
};

export default TopPages;
