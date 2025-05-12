import { getProjects } from "@/actions/projects";
import { Button } from "@/components/ui/button";
import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import Link from "next/link";

const page = async () => {
  const projects = (await getProjects()).data;
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-4">
      <h3 className="font-semibold text-2xl  ">Projects</h3>
      <Button className="max-w-[5rem] w-full h-full">
        <Link className="w-full h-full" href="/projects/create">Create</Link> 
      </Button>
      </div>
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
