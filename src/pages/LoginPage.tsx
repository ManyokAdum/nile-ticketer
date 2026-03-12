import { useNavigate } from 'react-router-dom';
import { Ticket, Users, ShieldCheck, QrCode } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useAppStore } from '@/lib/store';
import { motion } from 'framer-motion';

const loginOptions = [
  {
    role: 'passenger' as const,
    label: 'Passenger',
    description: 'Book trips and manage your tickets.',
    icon: Ticket,
    target: '/dashboard',
  },
  {
    role: 'staff' as const,
    label: 'Ticketing Staff',
    description: 'Handle bookings and assist passengers at the terminal.',
    icon: Users,
    target: '/staff',
  },
  {
    role: 'admin' as const,
    label: 'Admin',
    description: 'Monitor system performance and manage routes and operations.',
    icon: ShieldCheck,
    target: '/admin',
  },
  {
    role: 'conductor' as const,
    label: 'Conductor',
    description: 'Scan QR tickets and validate boarding on the bus.',
    icon: QrCode,
    target: '/scanner',
  },
];

export default function LoginPage() {
  const { setRole, setLoggedIn } = useAppStore();
  const navigate = useNavigate();

  const handleLogin = (role: (typeof loginOptions)[number]['role'], target: string) => {
    setRole(role);
    setLoggedIn(true);
    navigate(target);
  };

  return (
    <div className="container max-w-3xl py-12 space-y-8">
      <div className="text-center space-y-2">
        <h1 className="text-3xl font-heading font-bold">Login</h1>
        <p className="text-muted-foreground">
          Choose how you want to access the Nile Ticketer system.
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        {loginOptions.map((option, i) => (
          <motion.div
            key={option.label}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.05 }}
            className="glass-card-elevated rounded-xl p-5 flex flex-col justify-between gap-4"
          >
            <div className="flex items-start gap-3">
              <div className="gradient-primary w-10 h-10 rounded-xl flex items-center justify-center">
                <option.icon className="h-5 w-5 text-primary-foreground" />
              </div>
              <div>
                <h2 className="font-heading font-semibold text-lg">{option.label}</h2>
                <p className="text-sm text-muted-foreground mt-1">
                  {option.description}
                </p>
              </div>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-xs text-muted-foreground">
                You will be redirected to: <span className="font-mono text-foreground">{option.target}</span>
              </span>
              <Button size="sm" onClick={() => handleLogin(option.role, option.target)}>
                Continue
              </Button>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

