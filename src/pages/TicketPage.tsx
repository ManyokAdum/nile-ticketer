import { useParams, Link, useLocation } from 'react-router-dom';
import { QRCodeSVG } from 'qrcode.react';
import { ArrowLeft, Download, Bus, MapPin, Calendar, Clock, Armchair } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { sampleTickets, trips } from '@/lib/mock-data';
import { motion } from 'framer-motion';

export default function TicketPage() {
  const { id } = useParams();
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const overrideName = searchParams.get('name') || undefined;
  const tripId = searchParams.get('tripId') || undefined;
  const seatFromQuery = searchParams.get('seat') || undefined;
  
  // Use sample ticket or generate one from ID
  const fromSample = sampleTickets.find(t => t.id === id);
  const fromTrip = tripId ? trips.find(t => t.id === tripId) : undefined;

  const baseTicket = fromSample || {
    id: id || 'TK-DEMO',
    trip: fromTrip || trips[0],
    seatNumber: seatFromQuery || '3A',
    passengerName: 'John Deng',
    passengerEmail: 'john@email.com',
    status: 'active' as const,
    paymentStatus: 'paid' as const,
    amount: (fromTrip || trips[0]).route.price,
    bookedAt: new Date().toISOString(),
  };

  const ticket = {
    ...baseTicket,
    passengerName: overrideName || baseTicket.passengerName,
  };

  return (
    <div className="container max-w-md py-8">
      <Link to="/my-tickets">
        <Button variant="ghost" size="sm" className="text-muted-foreground mb-4">
          <ArrowLeft className="h-4 w-4 mr-1" /> Back to Dashboard
        </Button>
      </Link>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="glass-card-elevated rounded-2xl overflow-hidden"
      >
        {/* Header */}
        <div className="gradient-primary p-6 text-primary-foreground text-center">
          <div className="flex items-center justify-center gap-2 mb-2">
            <Bus className="h-5 w-5" />
            <span className="font-heading font-bold text-lg">Nile Ticketer</span>
          </div>
          <p className="text-sm opacity-80">Digital Boarding Pass</p>
        </div>

        {/* Content */}
        <div className="p-6 space-y-5">
          {/* Route */}
          <div className="flex items-center justify-between">
            <div className="text-center">
              <p className="font-heading text-2xl font-bold">{ticket.trip.route.from.slice(0, 3).toUpperCase()}</p>
              <p className="text-xs text-muted-foreground">{ticket.trip.route.from}</p>
            </div>
            <div className="flex-1 px-4">
              <div className="border-t-2 border-dashed border-primary/30 relative">
                <Bus className="h-4 w-4 text-primary absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-card" />
              </div>
            </div>
            <div className="text-center">
              <p className="font-heading text-2xl font-bold">{ticket.trip.route.to.slice(0, 3).toUpperCase()}</p>
              <p className="text-xs text-muted-foreground">{ticket.trip.route.to}</p>
            </div>
          </div>

          {/* Details grid */}
          <div className="grid grid-cols-2 gap-3">
            <div className="bg-secondary rounded-lg p-3">
              <div className="flex items-center gap-1.5 text-xs text-muted-foreground mb-1">
                <Calendar className="h-3 w-3" /> Date
              </div>
              <p className="font-heading font-semibold text-sm">{ticket.trip.date}</p>
            </div>
            <div className="bg-secondary rounded-lg p-3">
              <div className="flex items-center gap-1.5 text-xs text-muted-foreground mb-1">
                <Clock className="h-3 w-3" /> Departure
              </div>
              <p className="font-heading font-semibold text-sm">{ticket.trip.departureTime}</p>
            </div>
            <div className="bg-secondary rounded-lg p-3">
              <div className="flex items-center gap-1.5 text-xs text-muted-foreground mb-1">
                <Armchair className="h-3 w-3" /> Seat
              </div>
              <p className="font-heading font-semibold text-sm">{ticket.seatNumber}</p>
            </div>
            <div className="bg-secondary rounded-lg p-3">
              <div className="flex items-center gap-1.5 text-xs text-muted-foreground mb-1">
                Status
              </div>
              <p className={`font-heading font-semibold text-sm capitalize ${ticket.status === 'active' ? 'text-accent' : ticket.status === 'boarded' ? 'text-primary' : 'text-destructive'}`}>
                {ticket.status}
              </p>
            </div>
          </div>

          {/* Passenger */}
          <div className="border-t border-dashed pt-4">
            <p className="text-xs text-muted-foreground">Passenger</p>
            <p className="font-heading font-semibold">{ticket.passengerName}</p>
          </div>

          {/* QR Code */}
          <div className="flex justify-center py-4">
            <div className="bg-card p-4 rounded-xl border">
              <QRCodeSVG value={ticket.id} size={160} level="H" />
            </div>
          </div>

          <p className="text-center text-xs text-muted-foreground font-mono">{ticket.id}</p>

          <Button variant="outline" className="w-full" size="lg">
            <Download className="h-4 w-4 mr-2" /> Download Ticket
          </Button>
        </div>
      </motion.div>
    </div>
  );
}
