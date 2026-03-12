import { FormEvent, useState } from "react";
import { Navigate, useLocation, useNavigate } from "react-router-dom";
import { LogIn, Ticket } from "lucide-react";
import { useAppStore } from "@/lib/store";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function PassengerLoginPage() {
  const { isLoggedIn, currentRole, setRole, setLoggedIn } = useAppStore();
  const navigate = useNavigate();
  const location = useLocation();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  const from =
    (location.state as { from?: string } | null)?.from || "/my-tickets";

  if (isLoggedIn && currentRole === "admin") {
    return <Navigate to="/admin/dashboard" replace />;
  }

  if (isLoggedIn && currentRole === "passenger") {
    return <Navigate to={from} replace />;
  }

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();
    setRole("passenger");
    setLoggedIn(true);
    navigate(from);
  };

  return (
    <div className="container max-w-lg py-12">
      <Card className="glass-card-elevated border">
        <CardHeader className="space-y-2 text-center">
          <div className="mx-auto inline-flex h-12 w-12 items-center justify-center rounded-2xl gradient-primary">
            <Ticket className="h-6 w-6 text-primary-foreground" />
          </div>
          <CardTitle className="text-2xl font-heading">
            Passenger Login
          </CardTitle>
          <p className="text-sm text-muted-foreground">
            Sign in to book trips and manage your tickets.
          </p>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="name">Full name</Label>
              <Input
                id="name"
                placeholder="John Deng"
                value={name}
                onChange={(event) => setName(event.target.value)}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="you@example.com"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                required
              />
            </div>
            <Button type="submit" className="w-full gap-2">
              <LogIn className="h-4 w-4" />
              Continue as Passenger
            </Button>
            <p className="mt-2 text-xs text-muted-foreground text-center">
              This is a demo login. No real account is created.
            </p>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}

