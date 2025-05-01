import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateBooking } from "../../services/apiBookings";
import toast from "react-hot-toast";

export function useCheckout() {
  const queryClient = useQueryClient();
  const { isLoading: isCheckingOut, mutate: checkout } = useMutation({
    mutationFn: (bookingId) => updateBooking(bookingId, { status: "checked-out" }),
    onSuccess: (data) => {
      toast.success(`Booking #${data.id} was checked out successfully!`);
      queryClient.invalidateQueries({ active: true });
    },
    onError: (err) => toast.error("Booking was not checked out: " + err.message),
  });
  return { isCheckingOut, checkout };
}
