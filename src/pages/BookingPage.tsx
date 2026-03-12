import { useBookingStore } from '@/lib/store';
import RouteSearch from '@/components/booking/RouteSearch';
import TripSelect from '@/components/booking/TripSelect';
import SeatMap from '@/components/booking/SeatMap';
import PassengerDetails from '@/components/booking/PassengerDetails';
import PaymentConfirm from '@/components/booking/PaymentConfirm';

const stepLabels = ['Route', 'Trip', 'Seat', 'Details', 'Payment'];

export default function BookingPage() {
  const { step } = useBookingStore();

  return (
    <div className="container max-w-3xl py-8">
      {/* Progress */}
      <div className="flex items-center justify-center gap-1 mb-8">
        {stepLabels.map((label, i) => (
          <div key={label} className="flex items-center">
            <div className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium transition-colors ${
              i + 1 === step ? 'gradient-primary text-primary-foreground' : i + 1 < step ? 'bg-accent/10 text-accent' : 'bg-muted text-muted-foreground'
            }`}>
              <span className="w-4 h-4 rounded-full flex items-center justify-center text-[10px] font-bold bg-primary-foreground/20">{i + 1}</span>
              <span className="hidden sm:inline">{label}</span>
            </div>
            {i < stepLabels.length - 1 && <div className={`w-6 h-0.5 mx-1 ${i + 1 < step ? 'bg-accent' : 'bg-border'}`} />}
          </div>
        ))}
      </div>

      {step === 1 && <RouteSearch />}
      {step === 2 && <TripSelect />}
      {step === 3 && <SeatMap />}
      {step === 4 && <PassengerDetails />}
      {step === 5 && <PaymentConfirm />}
    </div>
  );
}
