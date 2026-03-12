import { MapPin, Clock, Ruler } from 'lucide-react';
import { routes } from '@/lib/mock-data';

export default function AdminRoutes() {
  return (
    <div className="container py-8 space-y-6">
      <div>
        <h1 className="text-3xl font-heading font-bold">Routes Management</h1>
        <p className="text-muted-foreground mt-1">
          Overview of active intercity routes across South Sudan.
        </p>
      </div>

      <div className="grid gap-3 md:grid-cols-2">
        {routes.map((route) => (
          <div
            key={route.id}
            className="glass-card-elevated rounded-xl p-5 flex flex-col gap-3"
          >
            <div className="flex items-center gap-2">
              <MapPin className="h-4 w-4 text-primary" />
              <span className="font-heading font-semibold">{route.from}</span>
              <span className="text-muted-foreground mx-1">→</span>
              <span className="font-heading font-semibold">{route.to}</span>
            </div>
            <div className="flex items-center gap-4 text-sm text-muted-foreground">
              <span className="flex items-center gap-1">
                <Ruler className="h-3.5 w-3.5" />
                {route.distance}
              </span>
              <span className="flex items-center gap-1">
                <Clock className="h-3.5 w-3.5" />
                {route.duration}
              </span>
            </div>
            <div className="flex items-center justify-between mt-2">
              <span className="text-xs text-muted-foreground">
                Route ID: {route.id.toUpperCase()}
              </span>
              <span className="font-heading font-bold text-primary">
                SSP {route.price.toLocaleString()}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

