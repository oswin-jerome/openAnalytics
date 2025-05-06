import { getProject } from "@/actions/projects";
import { VisitorsChart } from "./charts/visitors";
import TopPages from "./boxes/topPages";
import { PageParams } from "@/lib/type";
import TopReferrers from "./boxes/topReferrers";
import { UserAgentCounts } from "./boxes/userAgentCounts";

const DashboardPage = async ({ params }: { params: PageParams }) => {
  const { proj_id } = await params;
  const res = await getProject(proj_id);
  if (!res.success) {
    return (
      <div className="container mx-auto px-4 py-8">
        <h3 className="font-semibold text-2xl mb-4">Project not found</h3>
      </div>
    );
  }
  return (
    <main>
      <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 ">
        {/* <VisitorsChart /> */}
        <TopPages topPages={res.data.metrics?.topPages} />
        <TopReferrers topReferrers={res.data.metrics?.topReferrers} />
        <UserAgentCounts userAgentCounts={res.data.metrics?.userAgentCounts} />

        <div>OS</div>
        <div>Device Type</div>
        <div>Realtime visitors</div>
      </section>
    </main>
  );
};

export default DashboardPage;
