import { ReactNode } from "react";
import { Link, NavLink, Outlet } from "react-router-dom";
import {
  BarChart3,
  Bus,
  CalendarClock,
  LogOut,
  MapPinned,
  Ticket,
  Users,
} from "lucide-react";
import { useAppStore } from "@/lib/store";
import { Button } from "@/components/ui/button";

interface AdminNavItem {
  label: string;
  icon: React.ComponentType<{ className?: string }>;
  path: string;
}

const adminNavItems: AdminNavItem[] = [
  { label: "Dashboard", icon: BarChart3, path: "/admin/dashboard" },
  { label: "Manage Buses", icon: Bus, path: "/admin/buses" },
  { label: "Manage Routes", icon: MapPinned, path: "/admin/routes" },
  { label: "Schedules", icon: CalendarClock, path: "/admin/schedules" },
  { label: "Bookings", icon: Ticket, path: "/admin/bookings" },
  { label: "Users", icon: Users, path: "/admin/users" },
  { label: "Reports", icon: BarChart3, path: "/admin/reports" },
];

export default function AdminLayout() {
  const { setLoggedIn, setRole } = useAppStore();

  const handleLogout = () => {
    setLoggedIn(false);
    setRole("passenger");
  };

  return (
    <div className="min-h-screen grid grid-cols-[260px,1fr] bg-background text-foreground">
      <aside className="border-r border-border bg-card/80 backdrop-blur-md">
        <div className="flex h-16 items-center gap-2 px-5 border-b border-border">
          <div className="rounded-xl bg-primary/10 p-2">
            <Bus className="h-5 w-5 text-primary" />
          </div>
          <div>
            <p className="text-xs text-muted-foreground uppercase tracking-wide">
              Nile Ticketer
            </p>
            <p className="text-sm font-semibold">Admin Console</p>
          </div>
        </div>
        <nav className="px-3 py-4 space-y-1">
          {adminNavItems.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              className={({ isActive }) =>
                `flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium transition-colors ${
                  isActive
                    ? "bg-primary text-primary-foreground shadow-sm"
                    : "text-muted-foreground hover:bg-muted hover:text-foreground"
                }`
              }
            >
              <item.icon className="h-4 w-4" />
              <span>{item.label}</span>
            </NavLink>
          ))}
        </nav>
        <div className="mt-auto px-4 py-4 border-t border-border">
          <Link to="/">
            <Button
              variant="outline"
              size="sm"
              className="w-full justify-between border-border text-foreground hover:bg-muted"
              onClick={handleLogout}
            >
              <span className="flex items-center gap-2">
                <LogOut className="h-4 w-4" />
                Logout
              </span>
              <span className="text-[10px] uppercase tracking-wide text-slate-400">
                Exit Admin
              </span>
            </Button>
          </Link>
        </div>
      </aside>
      <main className="bg-muted/30">
        <div className="border-b border-border px-8 py-4 flex items-center justify-between bg-background/80 backdrop-blur">
          <h1 className="text-lg font-heading font-semibold">
            Operations Dashboard
          </h1>
          <p className="text-xs text-muted-foreground">
            Secure admin area · Role: <span className="font-medium">Admin</span>
          </p>
        </div>
        <div className="p-6">
          <Outlet />
        </div>
      </main>
    </div>
  );
}

