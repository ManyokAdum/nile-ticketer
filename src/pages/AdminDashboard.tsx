import { DollarSign, Ticket, Users, Bus, TrendingUp, Clock, AlertTriangle, BarChart3, QrCode } from 'lucide-react';
import { Link } from 'react-router-dom';
import { adminStats, revenueData, routePerformance } from '@/lib/mock-data';
import { Button } from '@/components/ui/button';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { motion } from 'framer-motion';

const statCards = [
  { label: "Today's Revenue", value: `SSP ${adminStats.todayRevenue.toLocaleString()}`, icon: DollarSign, color: 'text-accent' },
  { label: "Today's Tickets", value: adminStats.todayTickets, icon: Ticket, color: 'text-primary' },
  { label: 'Seat Utilization', value: `${adminStats.seatUtilization}%`, icon: BarChart3, color: 'text-accent' },
  { label: 'Late Arrivals', value: adminStats.lateArrivals, icon: AlertTriangle, color: 'text-warning' },
  { label: 'Rescheduled', value: adminStats.rescheduled, icon: Clock, color: 'text-muted-foreground' },
  { label: 'Active Routes', value: adminStats.activeRoutes, icon: TrendingUp, color: 'text-primary' },
];

const systemFeatures = [
  {
    label: 'Passenger Bookings',
    description: 'Monitor new bookings and seat availability across all routes.',
    icon: Ticket,
    actionLabel: 'View Booking Flow',
    path: '/book',
  },
  {
    label: 'Passenger Tickets',
    description: 'Review issued tickets and recent bookings for all passengers.',
    icon: Users,
    actionLabel: 'Open Passenger Dashboard',
    path: '/my-tickets',
  },
  {
    label: 'Routes & Fares',
    description: 'Manage intercity routes, distances, durations, and pricing.',
    icon: Bus,
    actionLabel: 'Manage Routes',
    path: '/admin/routes',
  },
  {
    label: 'Ticketing Staff',
    description: 'Oversee ticketing operations and staff-facing dashboards.',
    icon: Users,
    actionLabel: 'View Staff Dashboard',
    path: '/staff',
  },
  {
    label: 'QR Scanning & Boarding',
    description: 'Validate tickets at boarding points using QR code scanning.',
    icon: QrCode,
    actionLabel: 'Open Scanner',
    path: '/scanner',
  },
  {
    label: 'Late Arrival Handling',
    description: 'Track late arrivals, reschedules, and seat reassignments.',
    icon: Clock,
    actionLabel: 'View Late Arrival Tools',
    path: '/admin',
  },
];

export default function AdminDashboard() {
  return (
    <div className="container py-8 space-y-8">
      <div>
        <h1 className="text-3xl font-heading font-bold">Admin Dashboard</h1>
        <p className="text-muted-foreground mt-1">
          Central command for monitoring bookings, routes, ticketing staff, QR scanning, and operations
          across South Sudan.
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
        {statCards.map((stat, i) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.05 }}
            className="glass-card-elevated rounded-xl p-4"
          >
            <stat.icon className={`h-5 w-5 ${stat.color} mb-2`} />
            <p className="font-heading text-2xl font-bold">{stat.value}</p>
            <p className="text-xs text-muted-foreground mt-1">{stat.label}</p>
          </motion.div>
        ))}
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        {/* Revenue Chart */}
        <div className="glass-card-elevated rounded-xl p-6">
          <h3 className="font-heading font-semibold mb-4">Weekly Revenue</h3>
          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={revenueData}>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
              <XAxis dataKey="day" tick={{ fontSize: 12 }} stroke="hsl(var(--muted-foreground))" />
              <YAxis tick={{ fontSize: 12 }} stroke="hsl(var(--muted-foreground))" tickFormatter={(v) => `${(v / 1000).toFixed(0)}k`} />
              <Tooltip formatter={(v: number) => [`SSP ${v.toLocaleString()}`, 'Revenue']} />
              <Bar dataKey="revenue" fill="hsl(var(--primary))" radius={[6, 6, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Route Performance */}
        <div className="glass-card-elevated rounded-xl p-6">
          <h3 className="font-heading font-semibold mb-4">Route Performance</h3>
          <div className="space-y-3">
            {routePerformance.map((r) => (
              <div key={r.route} className="flex items-center gap-3">
                <span className="font-mono text-sm w-20 text-muted-foreground">{r.route}</span>
                <div className="flex-1 bg-muted rounded-full h-3 overflow-hidden">
                  <div
                    className="h-full gradient-primary rounded-full transition-all"
                    style={{ width: `${r.utilization}%` }}
                  />
                </div>
                <span className="text-sm font-semibold w-12 text-right">{r.utilization}%</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* System Features / Functionalities */}
      <div className="glass-card-elevated rounded-xl p-6">
        <h3 className="font-heading font-semibold mb-4">System Functionalities</h3>
        <p className="text-sm text-muted-foreground mb-4">
          Quick access to all major workflows in the platform so you can monitor and jump into any
          area of the system.
        </p>
        <div className="grid gap-4 md:grid-cols-2">
          {systemFeatures.map((feature) => (
            <div
              key={feature.label}
              className="bg-secondary rounded-lg p-4 flex flex-col justify-between gap-3"
            >
              <div className="flex items-start gap-3">
                <div className="mt-1">
                  <feature.icon className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <p className="font-heading font-semibold">{feature.label}</p>
                  <p className="text-xs text-muted-foreground mt-1">
                    {feature.description}
                  </p>
                </div>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-[11px] uppercase tracking-wide text-muted-foreground">
                  Linked page: <span className="font-mono text-xs text-foreground">{feature.path}</span>
                </span>
                <Link to={feature.path}>
                  <Button variant="outline" size="sm" className="text-xs">
                    {feature.actionLabel}
                  </Button>
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Late Arrival Management */}
      <div className="glass-card-elevated rounded-xl p-6">
        <div className="flex items-center gap-2 mb-4">
          <AlertTriangle className="h-5 w-5 text-warning" />
          <h3 className="font-heading font-semibold">Late Arrival Management</h3>
        </div>
        <div className="grid sm:grid-cols-3 gap-4">
          <div className="bg-secondary rounded-lg p-4">
            <p className="text-2xl font-heading font-bold text-warning">{adminStats.lateArrivals}</p>
            <p className="text-sm text-muted-foreground">Late arrivals today</p>
          </div>
          <div className="bg-secondary rounded-lg p-4">
            <p className="text-2xl font-heading font-bold text-accent">{adminStats.rescheduled}</p>
            <p className="text-sm text-muted-foreground">Successfully rescheduled</p>
          </div>
          <div className="bg-secondary rounded-lg p-4">
            <p className="text-2xl font-heading font-bold text-primary">{adminStats.lateArrivals - adminStats.rescheduled}</p>
            <p className="text-sm text-muted-foreground">Seats reassigned</p>
          </div>
        </div>
      </div>
    </div>
  );
}
