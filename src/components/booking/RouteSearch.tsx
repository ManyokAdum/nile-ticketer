import { MapPin, ArrowRight, Clock, Ruler } from 'lucide-react';
import { routes } from '@/lib/mock-data';
import { useBookingStore } from '@/lib/store';
import { motion } from 'framer-motion';

export default function RouteSearch() {
  const { setSelectedRoute } = useBookingStore();

  return (
    <div className="space-y-4">
      <div className="text-center mb-8">
        <h2 className="text-2xl font-heading font-bold">Select Your Route</h2>
        <p className="text-muted-foreground mt-1">Choose from our available intercity routes</p>
      </div>
      <div className="grid gap-3 sm:grid-cols-2">
        {routes.map((route, i) => (
          <motion.button
            key={route.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.05 }}
            onClick={() => setSelectedRoute(route.id)}
            className="glass-card-elevated rounded-xl p-5 text-left hover:border-primary/30 hover:shadow-[var(--shadow-glow)] transition-all group"
          >
            <div className="flex items-center gap-2 mb-3">
              <MapPin className="h-4 w-4 text-primary" />
              <span className="font-heading font-semibold">{route.from}</span>
              <ArrowRight className="h-4 w-4 text-muted-foreground" />
              <span className="font-heading font-semibold">{route.to}</span>
            </div>
            <div className="flex items-center gap-4 text-sm text-muted-foreground">
              <span className="flex items-center gap-1"><Ruler className="h-3.5 w-3.5" />{route.distance}</span>
              <span className="flex items-center gap-1"><Clock className="h-3.5 w-3.5" />{route.duration}</span>
            </div>
            <div className="mt-3 flex items-center justify-between">
              <span className="font-heading text-lg font-bold text-primary">SSP {route.price.toLocaleString()}</span>
              <span className="text-xs text-muted-foreground group-hover:text-primary transition-colors">Select →</span>
            </div>
          </motion.button>
        ))}
      </div>
    </div>
  );
}
