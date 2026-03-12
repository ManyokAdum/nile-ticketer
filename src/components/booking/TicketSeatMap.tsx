import { useMemo } from 'react';
import { generateSeats, type Ticket } from '@/lib/mock-data';

interface TicketSeatMapProps {
  ticket: Ticket;
}

export default function TicketSeatMap({ ticket }: TicketSeatMapProps) {
  const { trip, seatNumber } = ticket;
  const seats = useMemo(() => {
    return generateSeats(trip.totalSeats, trip.totalSeats - trip.availableSeats);
  }, [trip]);

  const rows = Math.ceil(seats.length / 4);

  return (
    <div className="space-y-2">
      <p className="text-xs text-muted-foreground text-center">
        {trip.route.from} → {trip.route.to} · {trip.departureTime}
      </p>
      <div className="mx-auto max-w-[200px]">
        <div className="bg-muted/30 rounded-t-xl rounded-b-lg border border-border/50 p-3 pt-6">
          <div className="flex justify-end mb-2 pr-1">
            <div className="w-6 h-6 rounded-full border-2 border-muted-foreground/30 flex items-center justify-center text-[10px] text-muted-foreground">
              D
            </div>
          </div>
          <div className="space-y-1.5">
            {Array.from({ length: rows }).map((_, rowIdx) => {
              const rowSeats = seats.slice(rowIdx * 4, rowIdx * 4 + 4);
              return (
                <div key={rowIdx} className="flex items-center justify-center gap-0.5">
                  {rowSeats.map((seat, colIdx) => {
                    const isMySeat = seat.number === seatNumber;
                    return (
                      <div
                        key={seat.id}
                        className={`w-9 h-7 rounded-md text-[10px] font-semibold flex items-center justify-center transition-all ${
                          isMySeat
                            ? 'seat-mine'
                            : seat.status === 'occupied'
                            ? 'seat-occupied'
                            : seat.status === 'pending_release'
                            ? 'seat-pending'
                            : 'seat-available'
                        } ${colIdx === 1 ? 'mr-3' : ''}`}
                      >
                        {seat.number}
                      </div>
                    );
                  })}
                </div>
              );
            })}
          </div>
        </div>
      </div>
      <p className="text-xs text-center font-medium text-primary">
        Your seat: {seatNumber}
      </p>
    </div>
  );
}
