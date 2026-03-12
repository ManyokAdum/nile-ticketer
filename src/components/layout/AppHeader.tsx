import { Bus, User, LogOut, Menu, X, MapPin } from "lucide-react";
import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useAppStore } from "@/lib/store";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { routes } from "@/lib/mock-data";

const mainNavItems = [
  { label: "Home", path: "/" },
  { label: "Search Bus", path: "/search" },
  { label: "Routes", path: "/book" },
  { label: "My Tickets", path: "/my-tickets" },
  { label: "Contact", path: "/contact" },
];

export default function AppHeader() {
  const { currentRole, setLoggedIn, isLoggedIn } = useAppStore();
  const location = useLocation();
  const [mobileOpen, setMobileOpen] = useState(false);
  const navigate = useNavigate();

  return (
    <header className="sticky top-0 z-50 glass-card-elevated border-b">
      <div className="container flex h-16 items-center justify-between">
        <Link to="/" className="flex items-center gap-2 font-heading font-bold text-xl">
          <div className="gradient-primary rounded-lg p-1.5">
            <Bus className="h-5 w-5 text-primary-foreground" />
          </div>
          <span>Nile Ticketer</span>
        </Link>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-1">
          {mainNavItems.map((item) =>
            item.path === "/book" ? (
              <DropdownMenu key={item.path}>
                <DropdownMenuTrigger asChild>
                  <button
                    type="button"
                    className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                      location.pathname === item.path
                        ? "bg-primary/10 text-primary"
                        : "text-muted-foreground hover:text-foreground hover:bg-secondary"
                    }`}
                  >
                    {item.label}
                  </button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-80">
                  <div className="px-3 py-2 border-b text-xs text-muted-foreground">
                    Available buses & routes
                  </div>
                  {routes.map((route) => (
                    <DropdownMenuItem
                      key={route.id}
                      className="flex flex-col items-start gap-0.5"
                      onClick={() =>
                        navigate(`/book?routeId=${route.id}`)
                      }
                    >
                      <span className="flex items-center gap-1 text-sm font-medium">
                        <MapPin className="h-3 w-3 text-primary" />
                        {route.from} &rarr; {route.to}
                      </span>
                      <span className="text-[11px] text-muted-foreground">
                        {route.distance} · {route.duration} · SSP{" "}
                        {route.price.toLocaleString()}
                      </span>
                    </DropdownMenuItem>
                  ))}
                  <DropdownMenuSeparator />
                  <DropdownMenuItem
                    onClick={() => navigate("/book")}
                    className="justify-between"
                  >
                    Go to booking
                    <span className="text-[11px] text-muted-foreground">
                      /book
                    </span>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <Link
                key={item.path}
                to={item.path}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                  location.pathname === item.path
                    ? "bg-primary/10 text-primary"
                    : "text-muted-foreground hover:text-foreground hover:bg-secondary"
                }`}
              >
                {item.label}
              </Link>
            ),
          )}
        </nav>

        <div className="flex items-center gap-2">
          {/* Top-right auth / role area */}
          {isLoggedIn ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" size="sm" className="hidden md:flex gap-2 text-xs">
                  <User className="h-3.5 w-3.5" />
                  <span className="capitalize">{currentRole}</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuSeparator />
                <DropdownMenuItem
                  className="text-destructive"
                  onClick={() => {
                    setLoggedIn(false);
                    navigate('/');
                    setMobileOpen(false);
                  }}
                >
                  <LogOut className="h-4 w-4 mr-2" />
                  Logout
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <Link to="/login" className="hidden md:block">
              <Button
                size="sm"
                className="bg-primary text-primary-foreground hover:bg-primary/90 font-heading font-semibold px-5"
              >
                Login
              </Button>
            </Link>
          )}

          {/* Mobile menu */}
          <Button variant="ghost" size="icon" className="md:hidden" onClick={() => setMobileOpen(!mobileOpen)}>
            {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </Button>
        </div>
      </div>

      {/* Mobile nav */}
      {mobileOpen && (
        <div className="md:hidden border-t bg-card p-4 animate-fade-in">
          <div className="flex flex-col gap-1">
            {mainNavItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                onClick={() => setMobileOpen(false)}
                className={`px-4 py-3 rounded-lg text-sm font-medium transition-colors ${
                  location.pathname === item.path
                    ? "bg-primary/10 text-primary"
                    : "text-muted-foreground hover:bg-secondary"
                }`}
              >
                {item.label}
              </Link>
            ))}
            {/* simple route list under Book Ticket for mobile */}
            <div className="mt-3 border-t pt-3">
              <p className="px-1 pb-1 text-xs font-medium text-muted-foreground">
                Available buses & routes
              </p>
              <div className="max-h-40 overflow-y-auto space-y-1">
                {routes.map((route) => (
                  <button
                    key={route.id}
                    onClick={() => {
                      navigate(`/book?routeId=${route.id}`);
                      setMobileOpen(false);
                    }}
                    className="w-full text-left px-2 py-1.5 rounded-lg text-xs hover:bg-secondary flex flex-col"
                  >
                    <span className="flex items-center gap-1 font-medium">
                      <MapPin className="h-3 w-3 text-primary" />
                      {route.from} → {route.to}
                    </span>
                    <span className="text-[10px] text-muted-foreground">
                      {route.distance} · {route.duration} · SSP{" "}
                      {route.price.toLocaleString()}
                    </span>
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
