import { Clock, Users, ArrowLeft } from 'lucide-react';
import { trips } from '@/lib/mock-data';
import { useBookingStore } from '@/lib/store';
import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion';

export default function TripSelect() {
  const { selectedRouteId, setSelectedTrip, setStep } = useBookingStore();
  const available = trips.filter((t) => t.routeId === selectedRouteId);

  return (
    <div className="space-y-4">
      <Button variant="ghost" size="sm" onClick={() => setStep(1)} className="text-muted-foreground">
        <ArrowLeft className="h-4 w-4 mr-1" /> Back to routes
      </Button>
      <div className="text-center mb-6">
        <h2 className="text-2xl font-heading font-bold">Choose Your Trip</h2>
        <p className="text-muted-foreground mt-1">Available departures for your selected route</p>
      </div>
      <div className="grid gap-3">
        {available.map((trip, i) => (
          <motion.button
            key={trip.id}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.05 }}
            onClick={() => setSelectedTrip(trip.id)}
            className="glass-card-elevated rounded-xl p-5 text-left hover:border-primary/30 hover:shadow-[var(--shadow-glow)] transition-all"
          >
            <div className="flex items-center justify-between">
              <div>
                <div className="flex items-center gap-3 mb-2">
                  <span className="font-heading text-xl font-bold">{trip.departureTime}</span>
                  <span className="text-muted-foreground">→</span>
                  <span className="font-heading text-xl font-bold">{trip.arrivalTime}</span>
                </div>
                <div className="flex items-center gap-4 text-sm text-muted-foreground">
                  <span className="flex items-center gap-1"><Clock className="h-3.5 w-3.5" />{trip.route.duration}</span>
                  <span className="flex items-center gap-1"><Users className="h-3.5 w-3.5" />{trip.availableSeats} seats left</span>
                </div>
              </div>
              <div className="text-right">
                <span className="font-heading text-lg font-bold text-primary">SSP {trip.route.price.toLocaleString()}</span>
                <div className={`text-xs mt-1 px-2 py-0.5 rounded-full ${trip.availableSeats < 10 ? 'bg-destructive/10 text-destructive' : 'bg-accent/10 text-accent'}`}>
                  {trip.availableSeats < 10 ? 'Filling up' : 'Available'}
                </div>
              </div>
            </div>
          </motion.button>
        ))}
        {available.length === 0 && (
          <div className="text-center py-12 text-muted-foreground">
            No trips available for this route today.
          </div>
        )}
      </div>
    </div>
  );
}
