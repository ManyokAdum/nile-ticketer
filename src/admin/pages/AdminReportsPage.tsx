import { BarChart3 } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function AdminReportsPage() {
  return (
    <div className="space-y-4">
      <div>
        <h2 className="text-xl font-heading font-semibold flex items-center gap-2">
          <BarChart3 className="h-5 w-5 text-primary" />
          Reports & Analytics
        </h2>
        <p className="text-sm text-slate-400">
          Monitor revenue, seat utilization, and operational KPIs.
        </p>
      </div>
      <Card className="bg-slate-900 border-slate-800">
        <CardHeader>
          <CardTitle className="text-sm text-slate-200">
            Analytics overview
          </CardTitle>
        </CardHeader>
        <CardContent className="text-sm text-slate-400">
          This is a placeholder view for analytics. Integrate it with your BI
          tool or reporting backend.
        </CardContent>
      </Card>
    </div>
  );
}

