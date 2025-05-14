import { getProject } from "@/actions/projects";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { PageParams } from "@/lib/type";

const SettingsPage = async ({ params }: { params: PageParams }) => {
  const param = await params;
  const res = await getProject(param.proj_id);

  if (!res.success) {
    return (
      <div className="container mx-auto px-4 py-8">
        <h3 className="font-semibold text-2xl mb-4">Project not found</h3>
      </div>
    );
  }

  return (
    <div>
      <h3 className="font-semibold text-2xl">Settings</h3>
      <div className="mt-4">
        <Card className="shadow-none">
          <CardHeader>
            <CardTitle>API Key</CardTitle>
            <CardDescription>This key is used to authenticate requests to the OpenAnalytics API.</CardDescription>
          </CardHeader>
          <CardContent>
            <Input value={res.data.apiKey} readOnly />
          </CardContent>
        </Card>
        {/* TODO: custom trackable link | custom event types | Notifications */}
      </div>
    </div>
  );
};

export default SettingsPage;
