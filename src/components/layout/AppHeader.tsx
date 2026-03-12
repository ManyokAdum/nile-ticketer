import { Bus, User, LogOut, Menu, X } from 'lucide-react';
import { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useAppStore } from '@/lib/store';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

const roleNavItems: Record<string, { label: string; path: string }[]> = {
  passenger: [
    { label: 'Book Trip', path: '/book' },
    { label: 'My Tickets', path: '/dashboard' },
  ],
  staff: [
    { label: 'Ticketing', path: '/book' },
    { label: 'Dashboard', path: '/staff' },
  ],
  admin: [
    { label: 'Dashboard', path: '/admin' },
    { label: 'Routes', path: '/admin/routes' },
  ],
  conductor: [
    { label: 'Scanner', path: '/scanner' },
  ],
};

export default function AppHeader() {
  const { currentRole, setRole, setLoggedIn, isLoggedIn } = useAppStore();
  const location = useLocation();
  const [mobileOpen, setMobileOpen] = useState(false);
  const navigate = useNavigate();
  const navItems = roleNavItems[currentRole] || [];

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
          {navItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                location.pathname === item.path
                  ? 'bg-primary/10 text-primary'
                  : 'text-muted-foreground hover:text-foreground hover:bg-secondary'
              }`}
            >
              {item.label}
            </Link>
          ))}
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
                <DropdownMenuItem onClick={() => setRole('passenger')}>Passenger</DropdownMenuItem>
                <DropdownMenuItem onClick={() => setRole('staff')}>Ticketing Staff</DropdownMenuItem>
                <DropdownMenuItem onClick={() => setRole('admin')}>Admin</DropdownMenuItem>
                <DropdownMenuItem onClick={() => setRole('conductor')}>Conductor</DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem
                  className="text-destructive"
                  onClick={() => {
                    setLoggedIn(false);
                    setRole('passenger');
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
            {navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                onClick={() => setMobileOpen(false)}
                className={`px-4 py-3 rounded-lg text-sm font-medium transition-colors ${
                  location.pathname === item.path
                    ? 'bg-primary/10 text-primary'
                    : 'text-muted-foreground hover:bg-secondary'
                }`}
              >
                {item.label}
              </Link>
            ))}
            <div className="border-t mt-2 pt-2">
              <p className="px-4 py-1 text-xs text-muted-foreground">Switch Role (Demo)</p>
              {(['passenger', 'staff', 'admin', 'conductor'] as const).map((role) => (
                <button
                  key={role}
                  onClick={() => { setRole(role); setMobileOpen(false); }}
                  className={`w-full text-left px-4 py-2 rounded-lg text-sm capitalize ${currentRole === role ? 'bg-primary/10 text-primary font-medium' : 'text-muted-foreground'}`}
                >
                  {role}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
