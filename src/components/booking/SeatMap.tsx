import { ArrowLeft, AlertTriangle } from 'lucide-react';
import { useState, useMemo } from 'react';
import { trips, generateSeats, type Seat } from '@/lib/mock-data';
import { useBookingStore } from '@/lib/store';
import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion';

export default function SeatMap() {
  const { selectedTripId, selectedSeat, setSelectedSeat, setStep } = useBookingStore();
  const trip = trips.find((t) => t.id === selectedTripId);

  const seats = useMemo(() => {
    if (!trip) return [];
    return generateSeats(trip.totalSeats, trip.totalSeats - trip.availableSeats);
  }, [trip]);

  if (!trip) return null;

  const rows = Math.ceil(seats.length / 4);

  const handleSeatClick = (seat: Seat) => {
    if (seat.status === 'occupied') return;
    setSelectedSeat(selectedSeat?.id === seat.id ? null : seat);
  };

  return (
    <div className="space-y-4">
      <Button variant="ghost" size="sm" onClick={() => setStep(2)} className="text-muted-foreground">
        <ArrowLeft className="h-4 w-4 mr-1" /> Back to trips
      </Button>
      <div className="text-center mb-4">
        <h2 className="text-2xl font-heading font-bold">Select Your Seat</h2>
        <p className="text-muted-foreground mt-1">{trip.route.from} → {trip.route.to} · {trip.departureTime}</p>
      </div>

      {/* Legend */}
      <div className="flex justify-center gap-4 text-xs">
        <span className="flex items-center gap-1.5"><span className="w-4 h-4 rounded seat-available" /> Available</span>
        <span className="flex items-center gap-1.5"><span className="w-4 h-4 rounded seat-selected" /> Selected</span>
        <span className="flex items-center gap-1.5"><span className="w-4 h-4 rounded seat-occupied" /> Occupied</span>
        <span className="flex items-center gap-1.5"><span className="w-4 h-4 rounded seat-pending" /> Pending</span>
      </div>

      {/* Bus outline */}
      <div className="mx-auto max-w-xs">
        <div className="bg-muted/30 rounded-t-[2rem] rounded-b-xl border border-border/50 p-4 pt-8">
          {/* Steering */}
          <div className="flex justify-end mb-4 pr-2">
            <div className="w-8 h-8 rounded-full border-2 border-muted-foreground/30 flex items-center justify-center text-xs text-muted-foreground">D</div>
          </div>

          {/* Seats grid */}
          <div className="space-y-2">
            {Array.from({ length: rows }).map((_, rowIdx) => {
              const rowSeats = seats.slice(rowIdx * 4, rowIdx * 4 + 4);
              return (
                <div key={rowIdx} className="flex items-center justify-center gap-1">
                  {rowSeats.map((seat, colIdx) => (
                    <motion.button
                      key={seat.id}
                      whileHover={{ scale: seat.status !== 'occupied' ? 1.1 : 1 }}
                      whileTap={{ scale: seat.status !== 'occupied' ? 0.95 : 1 }}
                      onClick={() => handleSeatClick(seat)}
                      className={`w-12 h-10 rounded-lg text-xs font-semibold flex items-center justify-center transition-all ${
                        selectedSeat?.id === seat.id
                          ? 'seat-selected'
                          : seat.status === 'occupied'
                          ? 'seat-occupied'
                          : seat.status === 'pending_release'
                          ? 'seat-pending'
                          : 'seat-available'
                      } ${colIdx === 1 ? 'mr-4' : ''}`}
                      title={seat.status === 'pending_release' ? 'Late arrival - seat pending release' : undefined}
                    >
                      {seat.status === 'pending_release' && <AlertTriangle className="h-3 w-3" />}
                      {seat.status !== 'pending_release' && seat.number}
                    </motion.button>
                  ))}
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {selectedSeat && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="glass-card-elevated rounded-xl p-4 text-center"
        >
          <p className="font-heading font-semibold">Seat {selectedSeat.number} selected</p>
          {selectedSeat.status === 'pending_release' && (
            <p className="text-xs text-warning mt-1 flex items-center justify-center gap-1">
              <AlertTriangle className="h-3 w-3" /> This seat is pending release from a late arrival
            </p>
          )}
          <Button className="mt-3 gradient-primary" onClick={() => setStep(4)}>
            Continue to Details
          </Button>
        </motion.div>
      )}
    </div>
  );
}
