import { NewBookingProvider } from "../context/NewBookingContext";
import CreateBookingForm from "../features/bookings/CreateBookingForm";

function NewBooking() {
  return (
    <NewBookingProvider>
      <CreateBookingForm />
    </NewBookingProvider>
  );
}

export default NewBooking;
