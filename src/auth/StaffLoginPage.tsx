import { FormEvent, useState } from "react";
import { Navigate, useLocation, useNavigate } from "react-router-dom";
import { Users, LogIn } from "lucide-react";
import { useAppStore } from "@/lib/store";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function StaffLoginPage() {
  const { isLoggedIn, currentRole, setRole, setLoggedIn } = useAppStore();
  const navigate = useNavigate();
  const location = useLocation();
  const [email, setEmail] = useState("");

  const from =
    (location.state as { from?: string } | null)?.from || "/staff";

  if (isLoggedIn && currentRole === "staff") {
    return <Navigate to={from} replace />;
  }

  if (isLoggedIn && currentRole === "admin") {
    return <Navigate to="/admin/dashboard" replace />;
  }

  if (isLoggedIn && currentRole === "passenger") {
    return <Navigate to="/my-tickets" replace />;
  }

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();
    setRole("staff");
    setLoggedIn(true);
    navigate(from);
  };

  return (
    <div className="container max-w-lg py-12">
      <Card className="glass-card-elevated border">
        <CardHeader className="space-y-2 text-center">
          <div className="mx-auto inline-flex h-12 w-12 items-center justify-center rounded-2xl gradient-primary">
            <Users className="h-6 w-6 text-primary-foreground" />
          </div>
          <CardTitle className="text-2xl font-heading">
            Ticketing Staff Login
          </CardTitle>
          <p className="text-sm text-muted-foreground">
            Access the terminal ticketing tools.
          </p>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="staff-email">Work email</Label>
              <Input
                id="staff-email"
                type="email"
                placeholder="staff@company.com"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                required
              />
            </div>
            <Button type="submit" className="w-full gap-2">
              <LogIn className="h-4 w-4" />
              Continue as Ticketing Staff
            </Button>
            <p className="mt-2 text-xs text-muted-foreground text-center">
              Demo mode: any email will sign you in as ticketing staff.
            </p>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}

