import { getProjects } from "@/actions/projects";
import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import Link from "next/link";

const page = async () => {
  const projects = (await getProjects()).data;
  return (
    <div className="container mx-auto px-4 py-8">
      <h3 className="font-semibold text-2xl mb-4">Projects</h3>

      <div className="grid gap-4">
        {projects.map((project) => (
          <Link key={project.id} href={`/${project.id}/dashboard`}>
            <Card>
              <CardHeader>
                <CardTitle>{project.name}</CardTitle>
                <CardDescription>{project.domain}</CardDescription>
              </CardHeader>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default page;
