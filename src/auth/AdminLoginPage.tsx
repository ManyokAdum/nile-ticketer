import { FormEvent, useState } from "react";
import { Navigate, useLocation, useNavigate } from "react-router-dom";
import { ShieldCheck, LogIn } from "lucide-react";
import { useAppStore } from "@/lib/store";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function AdminLoginPage() {
  const { isLoggedIn, currentRole, setRole, setLoggedIn } = useAppStore();
  const navigate = useNavigate();
  const location = useLocation();
  const [email, setEmail] = useState("");
  const [accessCode, setAccessCode] = useState("");

  const from =
    (location.state as { from?: string } | null)?.from || "/admin/dashboard";

  if (isLoggedIn && currentRole === "admin") {
    return <Navigate to={from} replace />;
  }

  if (isLoggedIn && currentRole === "passenger") {
    return <Navigate to="/my-tickets" replace />;
  }

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();
    setRole("admin");
    setLoggedIn(true);
    navigate(from);
  };

  return (
    <div className="container max-w-lg py-12">
      <Card className="glass-card-elevated border">
        <CardHeader className="space-y-2 text-center">
          <div className="mx-auto inline-flex h-12 w-12 items-center justify-center rounded-2xl gradient-primary">
            <ShieldCheck className="h-6 w-6 text-primary-foreground" />
          </div>
          <CardTitle className="text-2xl font-heading">
            Admin Portal Login
          </CardTitle>
          <p className="text-sm text-muted-foreground">
            Restricted access for Nile Ticketer administrators.
          </p>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="admin-email">Work email</Label>
              <Input
                id="admin-email"
                type="email"
                placeholder="admin@company.com"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="access-code">Access code</Label>
              <Input
                id="access-code"
                type="password"
                placeholder="••••••••"
                value={accessCode}
                onChange={(event) => setAccessCode(event.target.value)}
                required
              />
            </div>
            <Button type="submit" className="w-full gap-2">
              <LogIn className="h-4 w-4" />
              Sign in to Admin Portal
            </Button>
            <p className="mt-2 text-xs text-muted-foreground text-center">
              Demo mode: any email and code will sign you in as an admin user.
            </p>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}

