import { useMutation } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { createBooking as createBookingAPI } from "../../services/apiBookings";

export function useCreateBooking() {
  const { isLoading: isCreatingBooking, mutate: createBooking } = useMutation({
    mutationFn: createBookingAPI,
    onSuccess: (booking) => {
      toast.success("New booking with ID " + booking.id + " successfully created!");
    },
    onError: (err) => {
      toast.error(err);
    },
  });
  return { isCreatingBooking, createBooking };
}
