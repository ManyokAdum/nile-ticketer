import { Bus } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export default function ManageBusesPage() {
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between gap-2">
        <div>
          <h2 className="text-xl font-heading font-semibold flex items-center gap-2">
            <Bus className="h-5 w-5 text-primary" />
            Fleet Management
          </h2>
          <p className="text-sm text-slate-400">
            Configure buses, capacities, and registration details.
          </p>
        </div>
        <Button size="sm">Add New Bus</Button>
      </div>
      <Card className="bg-slate-900 border-slate-800">
        <CardHeader>
          <CardTitle className="text-sm text-slate-200">
            Fleet overview
          </CardTitle>
        </CardHeader>
        <CardContent className="text-sm text-slate-400">
          This is a placeholder view for managing buses. Integrate your real
          data source here.
        </CardContent>
      </Card>
    </div>
  );
}

