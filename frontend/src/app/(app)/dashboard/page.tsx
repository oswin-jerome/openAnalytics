import { VisitorsChart } from "./charts/visitors";

const DashboardPage = () => {
  return (
    <main>
      <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 ">
        <VisitorsChart />
        <VisitorsChart />
      </section>
    </main>
  );
};

export default DashboardPage;
