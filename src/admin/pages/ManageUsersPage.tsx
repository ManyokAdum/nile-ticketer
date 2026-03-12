import { Users } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function ManageUsersPage() {
  return (
    <div className="space-y-4">
      <div>
        <h2 className="text-xl font-heading font-semibold flex items-center gap-2">
          <Users className="h-5 w-5 text-primary" />
          User & Role Management
        </h2>
        <p className="text-sm text-slate-400">
          Manage passenger accounts, staff, and admin roles.
        </p>
      </div>
      <Card className="bg-slate-900 border-slate-800">
        <CardHeader>
          <CardTitle className="text-sm text-slate-200">
            Directory overview
          </CardTitle>
        </CardHeader>
        <CardContent className="text-sm text-slate-400">
          This is a placeholder view for user management. Connect it to your
          identity provider or user service.
        </CardContent>
      </Card>
    </div>
  );
}

