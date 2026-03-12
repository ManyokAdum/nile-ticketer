import { ArrowLeft } from 'lucide-react';
import { useState } from 'react';
import { useBookingStore } from '@/lib/store';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { trips } from '@/lib/mock-data';
import { motion } from 'framer-motion';

export default function PassengerDetails() {
  const { selectedTripId, selectedSeat, setStep, setPassengerDetails } = useBookingStore();
  const trip = trips.find((t) => t.id === selectedTripId);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [errors, setErrors] = useState<Record<string, string>>({});

  const validate = () => {
    const e: Record<string, string> = {};
    if (!name.trim()) e.name = 'Name is required';
    if (!email.trim() || !/\S+@\S+\.\S+/.test(email)) e.email = 'Valid email required';
    if (!phone.trim() || phone.length < 10) e.phone = 'Valid phone required';
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleContinue = () => {
    if (!validate()) return;
    setPassengerDetails(name, email, phone);
    setStep(5);
  };

  if (!trip || !selectedSeat) return null;

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6 max-w-md mx-auto">
      <Button variant="ghost" size="sm" onClick={() => setStep(3)} className="text-muted-foreground">
        <ArrowLeft className="h-4 w-4 mr-1" /> Back to seat selection
      </Button>
      <div className="text-center">
        <h2 className="text-2xl font-heading font-bold">Passenger Details</h2>
        <p className="text-muted-foreground mt-1">{trip.route.from} → {trip.route.to} · Seat {selectedSeat.number}</p>
      </div>

      <div className="glass-card-elevated rounded-xl p-6 space-y-4">
        <div>
          <Label htmlFor="name">Full Name</Label>
          <Input id="name" value={name} onChange={(e) => setName(e.target.value)} placeholder="John Kamau" />
          {errors.name && <p className="text-destructive text-xs mt-1">{errors.name}</p>}
        </div>
        <div>
          <Label htmlFor="email">Email Address</Label>
          <Input id="email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="john@email.com" />
          {errors.email && <p className="text-destructive text-xs mt-1">{errors.email}</p>}
        </div>
        <div>
          <Label htmlFor="phone">Phone Number</Label>
          <Input id="phone" value={phone} onChange={(e) => setPhone(e.target.value)} placeholder="+211912345678" />
          {errors.phone && <p className="text-destructive text-xs mt-1">{errors.phone}</p>}
        </div>
      </div>

      <div className="glass-card-elevated rounded-xl p-4">
        <h3 className="font-heading font-semibold mb-3">Trip Summary</h3>
        <div className="space-y-2 text-sm">
          <div className="flex justify-between"><span className="text-muted-foreground">Route</span><span>{trip.route.from} → {trip.route.to}</span></div>
          <div className="flex justify-between"><span className="text-muted-foreground">Date</span><span>{trip.date}</span></div>
          <div className="flex justify-between"><span className="text-muted-foreground">Departure</span><span>{trip.departureTime}</span></div>
          <div className="flex justify-between"><span className="text-muted-foreground">Seat</span><span>{selectedSeat.number}</span></div>
          <div className="border-t pt-2 mt-2 flex justify-between font-heading font-bold">
            <span>Total</span><span className="text-primary">SSP {trip.route.price.toLocaleString()}</span>
          </div>
        </div>
      </div>

      <Button className="w-full gradient-primary text-primary-foreground" size="lg" onClick={handleContinue}>
        Proceed to Payment
      </Button>
    </motion.div>
  );
}
