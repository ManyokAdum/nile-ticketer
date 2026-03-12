import { Ticket } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function ManageBookingsPage() {
  return (
    <div className="space-y-4">
      <div>
        <h2 className="text-xl font-heading font-semibold flex items-center gap-2">
          <Ticket className="h-5 w-5 text-primary" />
          Booking Management
        </h2>
        <p className="text-sm text-slate-400">
          Search, modify, and refund passenger bookings.
        </p>
      </div>
      <Card className="bg-slate-900 border-slate-800">
        <CardHeader>
          <CardTitle className="text-sm text-slate-200">
            Booking queue
          </CardTitle>
        </CardHeader>
        <CardContent className="text-sm text-slate-400">
          This is a placeholder view for managing bookings. Wire this up to
          your ticketing system to see live data.
        </CardContent>
      </Card>
    </div>
  );
}

