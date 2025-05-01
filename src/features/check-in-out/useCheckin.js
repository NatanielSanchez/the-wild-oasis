import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateBooking } from "../../services/apiBookings";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

export function useCheckin() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const { isLoading: isCheckingIn, mutate: checkin } = useMutation({
    mutationFn: ({ bookingId, breakfast }) =>
      updateBooking(bookingId, { status: "checked-in", isPaid: true, ...breakfast }),
    onSuccess: (data) => {
      toast.success(`Booking #${data.id} was checked in successfully!`);
      queryClient.invalidateQueries({ active: true });
      navigate("/");
    },
    onError: (err) => toast.error("Booking was not checked in: " + err.message),
  });
  return { isCheckingIn, checkin };
}
