import { useState } from 'react';
import { QrCode, CheckCircle2, XCircle, Camera, Search } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { sampleTickets } from '@/lib/mock-data';
import { motion, AnimatePresence } from 'framer-motion';

type ScanResult = 'idle' | 'valid' | 'invalid' | 'scanning';

export default function ScannerPage() {
  const [status, setStatus] = useState<ScanResult>('idle');
  const [manualId, setManualId] = useState('');
  const [scannedTicket, setScannedTicket] = useState<typeof sampleTickets[0] | null>(null);

  const simulateScan = () => {
    setStatus('scanning');
    setTimeout(() => {
      const ticket = sampleTickets[0];
      setScannedTicket(ticket);
      setStatus('valid');
    }, 1500);
  };

  const handleManualSearch = () => {
    const ticket = sampleTickets.find(t => t.id.toLowerCase() === manualId.toLowerCase());
    if (ticket) {
      setScannedTicket(ticket);
      setStatus('valid');
    } else {
      setScannedTicket(null);
      setStatus('invalid');
    }
  };

  const resetScan = () => {
    setStatus('idle');
    setScannedTicket(null);
    setManualId('');
  };

  return (
    <div className="container max-w-md py-8 space-y-6">
      <div className="text-center">
        <h1 className="text-3xl font-heading font-bold">Ticket Scanner</h1>
        <p className="text-muted-foreground mt-1">Validate boarding passes</p>
      </div>

      {/* Camera placeholder */}
      <div className="glass-card-elevated rounded-2xl overflow-hidden">
        <div className="aspect-square bg-foreground/5 flex items-center justify-center relative">
          {status === 'scanning' ? (
            <motion.div animate={{ opacity: [0.5, 1, 0.5] }} transition={{ repeat: Infinity, duration: 1.5 }}>
              <QrCode className="h-24 w-24 text-primary" />
            </motion.div>
          ) : (
            <div className="text-center space-y-3">
              <Camera className="h-16 w-16 text-muted-foreground mx-auto" />
              <p className="text-sm text-muted-foreground">Camera preview area</p>
            </div>
          )}
          {/* Scan frame overlay */}
          <div className="absolute inset-8 border-2 border-primary/30 rounded-2xl" />
          <div className="absolute top-8 left-8 w-6 h-6 border-t-2 border-l-2 border-primary rounded-tl-lg" />
          <div className="absolute top-8 right-8 w-6 h-6 border-t-2 border-r-2 border-primary rounded-tr-lg" />
          <div className="absolute bottom-8 left-8 w-6 h-6 border-b-2 border-l-2 border-primary rounded-bl-lg" />
          <div className="absolute bottom-8 right-8 w-6 h-6 border-b-2 border-r-2 border-primary rounded-br-lg" />
        </div>
      </div>

      <Button
        className="w-full gradient-primary text-primary-foreground"
        size="lg"
        onClick={simulateScan}
        disabled={status === 'scanning'}
      >
        <QrCode className="h-4 w-4 mr-2" /> {status === 'scanning' ? 'Scanning...' : 'Simulate QR Scan'}
      </Button>

      {/* Manual search */}
      <div className="flex gap-2">
        <Input
          placeholder="Enter Ticket ID manually"
          value={manualId}
          onChange={(e) => setManualId(e.target.value)}
          className="font-mono text-sm"
        />
        <Button variant="outline" onClick={handleManualSearch}><Search className="h-4 w-4" /></Button>
      </div>

      {/* Result */}
      <AnimatePresence>
        {status === 'valid' && scannedTicket && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className="glass-card-elevated rounded-xl p-5 border-accent/30"
          >
            <div className="flex items-center gap-2 mb-4">
              <CheckCircle2 className="h-6 w-6 text-accent" />
              <span className="font-heading font-bold text-accent">Valid Ticket</span>
            </div>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between"><span className="text-muted-foreground">Passenger</span><span className="font-semibold">{scannedTicket.passengerName}</span></div>
              <div className="flex justify-between"><span className="text-muted-foreground">Route</span><span>{scannedTicket.trip.route.from} → {scannedTicket.trip.route.to}</span></div>
              <div className="flex justify-between"><span className="text-muted-foreground">Seat</span><span className="font-semibold">{scannedTicket.seatNumber}</span></div>
              <div className="flex justify-between"><span className="text-muted-foreground">Status</span><span className="capitalize text-accent">{scannedTicket.status}</span></div>
              <div className="flex justify-between"><span className="text-muted-foreground">Payment</span><span className="capitalize">{scannedTicket.paymentStatus}</span></div>
            </div>
            <div className="flex gap-2 mt-4">
              <Button className="flex-1 bg-accent text-accent-foreground hover:bg-accent/90">Mark Boarded</Button>
              <Button variant="outline" className="flex-1" onClick={resetScan}>Scan Next</Button>
            </div>
          </motion.div>
        )}

        {status === 'invalid' && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className="glass-card-elevated rounded-xl p-5 border-destructive/30"
          >
            <div className="flex items-center gap-2 mb-2">
              <XCircle className="h-6 w-6 text-destructive" />
              <span className="font-heading font-bold text-destructive">Invalid Ticket</span>
            </div>
            <p className="text-sm text-muted-foreground">This ticket could not be verified. Please check the ID and try again.</p>
            <Button variant="outline" className="mt-3" onClick={resetScan}>Try Again</Button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
