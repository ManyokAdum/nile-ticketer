import { CalendarClock } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function ManageSchedulesPage() {
  return (
    <div className="space-y-4">
      <div>
        <h2 className="text-xl font-heading font-semibold flex items-center gap-2">
          <CalendarClock className="h-5 w-5 text-primary" />
          Trip Schedules
        </h2>
        <p className="text-sm text-slate-400">
          Configure departure times, recurring trips, and cut-off rules.
        </p>
      </div>
      <Card className="bg-slate-900 border-slate-800">
        <CardHeader>
          <CardTitle className="text-sm text-slate-200">
            Schedule planner
          </CardTitle>
        </CardHeader>
        <CardContent className="text-sm text-slate-400">
          This is a placeholder view for managing schedules. Connect it to your
          scheduling backend or API.
        </CardContent>
      </Card>
    </div>
  );
}

