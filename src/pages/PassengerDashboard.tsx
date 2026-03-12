import { Link } from 'react-router-dom';
import { Ticket, MapPin, ArrowRight, Clock, QrCode, Calendar } from 'lucide-react';
import { sampleTickets } from '@/lib/mock-data';
import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion';

export default function PassengerDashboard() {
  return (
    <div className="container max-w-3xl py-8 space-y-8">
      <div>
        <h1 className="text-3xl font-heading font-bold">My Tickets</h1>
        <p className="text-muted-foreground mt-1">View and manage your bookings</p>
      </div>

      <Link to="/book">
        <Button className="gradient-primary text-primary-foreground" size="lg">
          <Ticket className="h-4 w-4 mr-2" /> Book New Trip
        </Button>
      </Link>

      <div className="space-y-4">
        <h2 className="font-heading font-semibold text-lg">Recent Bookings</h2>
        {sampleTickets.map((ticket, i) => (
          <motion.div
            key={ticket.id}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
          >
            <Link to={`/ticket/${ticket.id}`}>
              <div className="glass-card-elevated rounded-xl p-5 hover:border-primary/30 hover:shadow-[var(--shadow-glow)] transition-all">
                <div className="flex items-start justify-between">
                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <MapPin className="h-4 w-4 text-primary" />
                      <span className="font-heading font-semibold">{ticket.trip.route.from}</span>
                      <ArrowRight className="h-4 w-4 text-muted-foreground" />
                      <span className="font-heading font-semibold">{ticket.trip.route.to}</span>
                    </div>
                    <div className="flex items-center gap-4 text-sm text-muted-foreground">
                      <span className="flex items-center gap-1"><Calendar className="h-3.5 w-3.5" />{ticket.trip.date}</span>
                      <span className="flex items-center gap-1"><Clock className="h-3.5 w-3.5" />{ticket.trip.departureTime}</span>
                    </div>
                    <div className="flex items-center gap-3 text-xs">
                      <span className="font-mono text-muted-foreground">{ticket.id}</span>
                      <span className={`px-2 py-0.5 rounded-full capitalize ${
                        ticket.status === 'active' ? 'bg-accent/10 text-accent' : ticket.status === 'boarded' ? 'bg-primary/10 text-primary' : 'bg-destructive/10 text-destructive'
                      }`}>{ticket.status}</span>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-heading font-bold text-primary">Seat {ticket.seatNumber}</p>
                    <QrCode className="h-8 w-8 text-muted-foreground mt-2 ml-auto" />
                  </div>
                </div>
              </div>
            </Link>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
