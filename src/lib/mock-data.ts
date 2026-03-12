export type UserRole = 'passenger' | 'staff' | 'admin' | 'conductor';

export interface Route {
  id: string;
  from: string;
  to: string;
  distance: string;
  duration: string;
  price: number;
}

export interface Trip {
  id: string;
  routeId: string;
  route: Route;
  busId: string;
  departureTime: string;
  arrivalTime: string;
  date: string;
  totalSeats: number;
  availableSeats: number;
  status: 'scheduled' | 'boarding' | 'departed' | 'arrived' | 'cancelled';
}

export interface Seat {
  id: string;
  number: string;
  row: number;
  col: number;
  status: 'available' | 'occupied' | 'selected' | 'pending_release';
  passengerName?: string;
}

export interface Ticket {
  id: string;
  tripId: string;
  trip: Trip;
  seatNumber: string;
  passengerName: string;
  passengerEmail: string;
  passengerPhone: string;
  status: 'active' | 'boarded' | 'cancelled' | 'rescheduled' | 'no_show';
  qrCode: string;
  paymentStatus: 'paid' | 'pending' | 'refunded';
  amount: number;
  bookedAt: string;
}

export const routes: Route[] = [
  { id: 'r1', from: 'Juba', to: 'Yei', distance: '160 km', duration: '3h 30m', price: 8000 },
  { id: 'r2', from: 'Juba', to: 'Nimule', distance: '195 km', duration: '4h', price: 9000 },
  { id: 'r3', from: 'Juba', to: 'Bor', distance: '190 km', duration: '4h 30m', price: 8500 },
  { id: 'r4', from: 'Juba', to: 'Wau', distance: '650 km', duration: '12h', price: 18000 },
  { id: 'r5', from: 'Juba', to: 'Malakal', distance: '610 km', duration: '11h 30m', price: 17500 },
  { id: 'r6', from: 'Juba', to: 'Rumbek', distance: '450 km', duration: '9h', price: 14000 },
  { id: 'r7', from: 'Juba', to: 'Kampala', distance: '515 km', duration: '10h', price: 22000 },
  { id: 'r8', from: 'Juba', to: 'Nairobi', distance: '930 km', duration: '18h', price: 35000 },
  { id: 'r9', from: 'Juba', to: 'Kigali', distance: '1280 km', duration: '24h', price: 42000 },
];

export const trips: Trip[] = [
  { id: 't1', routeId: 'r1', route: routes[0], busId: 'b1', departureTime: '06:00', arrivalTime: '13:30', date: '2026-03-05', totalSeats: 44, availableSeats: 12, status: 'scheduled' },
  { id: 't2', routeId: 'r1', route: routes[0], busId: 'b2', departureTime: '14:00', arrivalTime: '21:30', date: '2026-03-05', totalSeats: 44, availableSeats: 28, status: 'scheduled' },
  { id: 't3', routeId: 'r2', route: routes[1], busId: 'b3', departureTime: '07:00', arrivalTime: '13:00', date: '2026-03-05', totalSeats: 44, availableSeats: 5, status: 'scheduled' },
  { id: 't4', routeId: 'r3', route: routes[2], busId: 'b4', departureTime: '08:00', arrivalTime: '10:30', date: '2026-03-05', totalSeats: 32, availableSeats: 20, status: 'scheduled' },
  { id: 't5', routeId: 'r1', route: routes[0], busId: 'b1', departureTime: '22:00', arrivalTime: '05:30', date: '2026-03-05', totalSeats: 44, availableSeats: 35, status: 'scheduled' },
];

export function generateSeats(totalSeats: number, occupiedCount: number): Seat[] {
  const seats: Seat[] = [];
  const cols = 4;
  const rows = Math.ceil(totalSeats / cols);
  const occupiedIndices = new Set<number>();
  
  while (occupiedIndices.size < occupiedCount) {
    occupiedIndices.add(Math.floor(Math.random() * totalSeats));
  }

  // Add 2 pending release seats
  const pendingIndices = new Set<number>();
  const availableIndices = Array.from({ length: totalSeats }, (_, i) => i).filter(i => !occupiedIndices.has(i));
  for (let i = 0; i < Math.min(2, availableIndices.length); i++) {
    const idx = availableIndices[Math.floor(Math.random() * availableIndices.length)];
    pendingIndices.add(idx);
  }

  for (let i = 0; i < totalSeats; i++) {
    const row = Math.floor(i / cols);
    const col = i % cols;
    const seatNum = `${row + 1}${String.fromCharCode(65 + col)}`;
    seats.push({
      id: `s${i}`,
      number: seatNum,
      row: row + 1,
      col: col + 1,
      status: occupiedIndices.has(i) ? 'occupied' : pendingIndices.has(i) ? 'pending_release' : 'available',
      passengerName: occupiedIndices.has(i) ? `Passenger ${i + 1}` : undefined,
    });
  }
  return seats;
}

export const sampleTickets: Ticket[] = [
  {
    id: 'TK-20260305-001',
    tripId: 't1',
    trip: trips[0],
    seatNumber: '3A',
    passengerName: 'John Deng',
    passengerEmail: 'john@email.com',
    passengerPhone: '+211912345678',
    status: 'active',
    qrCode: 'TK-20260305-001',
    paymentStatus: 'paid',
    amount: 1500,
    bookedAt: '2026-03-03T10:00:00',
  },
  {
    id: 'TK-20260305-002',
    tripId: 't3',
    trip: trips[2],
    seatNumber: '5B',
    passengerName: 'John Deng',
    passengerEmail: 'john@email.com',
    passengerPhone: '+211912345678',
    status: 'boarded',
    qrCode: 'TK-20260305-002',
    paymentStatus: 'paid',
    amount: 1200,
    bookedAt: '2026-03-01T14:00:00',
  },
];

export const adminStats = {
  totalRevenue: 2_450_000,
  todayRevenue: 185_000,
  totalTickets: 1_840,
  todayTickets: 142,
  seatUtilization: 78,
  lateArrivals: 23,
  rescheduled: 8,
  activeRoutes: 9,
  activeBuses: 12,
};

export const revenueData = [
  { day: 'Mon', revenue: 165000 },
  { day: 'Tue', revenue: 180000 },
  { day: 'Wed', revenue: 155000 },
  { day: 'Thu', revenue: 195000 },
  { day: 'Fri', revenue: 220000 },
  { day: 'Sat', revenue: 245000 },
  { day: 'Sun', revenue: 185000 },
];

export const routePerformance = [
  { route: 'JUB-YEI', tickets: 420, utilization: 85 },
  { route: 'JUB-NIM', tickets: 310, utilization: 72 },
  { route: 'JUB-BOR', tickets: 280, utilization: 90 },
  { route: 'JUB-WAU', tickets: 190, utilization: 65 },
  { route: 'JUB-MAL', tickets: 240, utilization: 70 },
];
