import { getProject } from "@/actions/projects";
import { VisitorsChart } from "./charts/visitors";
import TopPages from "./boxes/topPages";
import { PageParams } from "@/lib/type";
import TopReferrers from "./boxes/topReferrers";
import { UserAgentCounts } from "./boxes/userAgentCounts";
import { OsCount } from "./boxes/osCount";
import { DeviceCount } from "./boxes/deviceCount";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem } from "@/components/ui/dropdown-menu";
import { DropdownMenuTrigger } from "@radix-ui/react-dropdown-menu";
import { Label } from "@/components/ui/label";
import DurationFilter from "@/components/duration-filter";
type SearchParams = Promise<{ [key: string]: string | string[] | undefined }>;

const DashboardPage = async ({ params, searchParams }: { params: PageParams; searchParams: SearchParams }) => {
  const { proj_id } = await params;
  const search = await searchParams;

  const res = await getProject(proj_id, search.duration as string);
  if (!res.success) {
    return (
      <div className="container mx-auto px-4 py-8">
        <h3 className="font-semibold text-2xl mb-4">Project not found</h3>
      </div>
    );
  }
  return (
    <main>
      <div className="mb-4">
        {res.data.apiKey}
        <DurationFilter />
      </div>
      <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 ">
        {/* <VisitorsChart /> */}
        <TopPages topPages={res.data.metrics?.topPages} />
        <TopReferrers topReferrers={res.data.metrics?.topReferrers} />
        <UserAgentCounts userAgentCounts={res.data.metrics?.userAgentCounts} />
        <OsCount userAgentCounts={res.data.metrics?.osCounts} />
        <DeviceCount userAgentCounts={res.data.metrics?.deviceCounts} />
      </section>
    </main>
  );
};

export default DashboardPage;
