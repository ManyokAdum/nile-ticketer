import { create } from 'zustand';
import type { UserRole, Ticket, Seat } from './mock-data';

interface BookingState {
  step: number;
  selectedRouteId: string | null;
  selectedTripId: string | null;
  selectedSeat: Seat | null;
  passengerName: string;
  passengerEmail: string;
  passengerPhone: string;
  setStep: (step: number) => void;
  setSelectedRoute: (id: string) => void;
  setSelectedTrip: (id: string) => void;
  setSelectedSeat: (seat: Seat | null) => void;
  setPassengerDetails: (name: string, email: string, phone: string) => void;
  reset: () => void;
}

interface AppState {
  currentRole: UserRole;
  setRole: (role: UserRole) => void;
  isLoggedIn: boolean;
  setLoggedIn: (v: boolean) => void;
  userName: string;
}

export const useBookingStore = create<BookingState>((set) => ({
  step: 1,
  selectedRouteId: null,
  selectedTripId: null,
  selectedSeat: null,
  passengerName: '',
  passengerEmail: '',
  passengerPhone: '',
  setStep: (step) => set({ step }),
  setSelectedRoute: (id) => set({ selectedRouteId: id, selectedTripId: null, selectedSeat: null, step: 2 }),
  setSelectedTrip: (id) => set({ selectedTripId: id, selectedSeat: null, step: 3 }),
  setSelectedSeat: (seat) => set({ selectedSeat: seat }),
  setPassengerDetails: (name, email, phone) => set({ passengerName: name, passengerEmail: email, passengerPhone: phone }),
  reset: () => set({ step: 1, selectedRouteId: null, selectedTripId: null, selectedSeat: null, passengerName: '', passengerEmail: '', passengerPhone: '' }),
}));

export const useAppStore = create<AppState>((set) => ({
  currentRole: 'passenger',
  setRole: (role) => set({ currentRole: role }),
  isLoggedIn: true,
  setLoggedIn: (v) => set({ isLoggedIn: v }),
  userName: 'John Kamau',
}));
