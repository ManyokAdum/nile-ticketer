import { ArrowLeft, CreditCard, CheckCircle2, Loader2 } from 'lucide-react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useBookingStore } from '@/lib/store';
import { Button } from '@/components/ui/button';
import { trips } from '@/lib/mock-data';
import { motion, AnimatePresence } from 'framer-motion';

export default function PaymentConfirm() {
  const { selectedTripId, selectedSeat, passengerName, passengerEmail, setStep, reset } = useBookingStore();
  const trip = trips.find((t) => t.id === selectedTripId);
  const navigate = useNavigate();
  const [processing, setProcessing] = useState(false);
  const [confirmed, setConfirmed] = useState(false);

  if (!trip || !selectedSeat) return null;

  const ticketId = `TK-${trip.date.replace(/-/g, '')}-${Math.floor(Math.random() * 999).toString().padStart(3, '0')}`;

  const handlePayment = () => {
    setProcessing(true);
    setTimeout(() => {
      setProcessing(false);
      setConfirmed(true);
    }, 2000);
  };

  const handleViewTicket = () => {
    const params = new URLSearchParams();
    if (passengerName) params.set('name', passengerName);
    params.set('tripId', trip.id);
    params.set('seat', selectedSeat.number);
    navigate(`/ticket/${ticketId}?${params.toString()}`);
    reset();
  };

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6 max-w-md mx-auto">
      <AnimatePresence mode="wait">
        {!confirmed ? (
          <motion.div key="payment" exit={{ opacity: 0 }} className="space-y-6">
            <Button variant="ghost" size="sm" onClick={() => setStep(4)} className="text-muted-foreground">
              <ArrowLeft className="h-4 w-4 mr-1" /> Back
            </Button>
            <div className="text-center">
              <h2 className="text-2xl font-heading font-bold">Payment</h2>
              <p className="text-muted-foreground mt-1">Simulated payment gateway</p>
            </div>

            <div className="glass-card-elevated rounded-xl p-6">
              <div className="space-y-3 text-sm">
                <div className="flex justify-between"><span className="text-muted-foreground">Passenger</span><span>{passengerName}</span></div>
                <div className="flex justify-between"><span className="text-muted-foreground">Route</span><span>{trip.route.from} → {trip.route.to}</span></div>
                <div className="flex justify-between"><span className="text-muted-foreground">Seat</span><span>{selectedSeat.number}</span></div>
                <div className="flex justify-between"><span className="text-muted-foreground">Ticket ID</span><span className="font-mono text-xs">{ticketId}</span></div>
                <div className="border-t pt-3 mt-3 flex justify-between font-heading font-bold text-lg">
                  <span>Total</span><span className="text-primary">SSP {trip.route.price.toLocaleString()}</span>
                </div>
              </div>
            </div>

            <Button
              className="w-full gradient-primary text-primary-foreground"
              size="lg"
              onClick={handlePayment}
              disabled={processing}
            >
              {processing ? (
                <><Loader2 className="h-4 w-4 mr-2 animate-spin" /> Processing...</>
              ) : (
                <><CreditCard className="h-4 w-4 mr-2" /> Pay SSP {trip.route.price.toLocaleString()}</>
              )}
            </Button>
          </motion.div>
        ) : (
          <motion.div
            key="confirmed"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-center space-y-6 py-8"
          >
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: 'spring', stiffness: 200, damping: 15 }}
            >
              <CheckCircle2 className="h-20 w-20 text-accent mx-auto" />
            </motion.div>
            <div>
              <h2 className="text-2xl font-heading font-bold">Booking Confirmed!</h2>
              <p className="text-muted-foreground mt-2">Your ticket has been issued. A confirmation has been sent to {passengerEmail}.</p>
            </div>
            <div className="glass-card-elevated rounded-xl p-4 text-sm inline-block mx-auto">
              <p className="font-mono text-xs text-muted-foreground">Ticket ID</p>
              <p className="font-heading font-bold text-lg">{ticketId}</p>
            </div>
            <div className="flex gap-3 justify-center">
              <Button variant="outline" onClick={() => { reset(); navigate('/book'); }}>Book Another</Button>
              <Button className="gradient-primary text-primary-foreground" onClick={handleViewTicket}>View Ticket</Button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
