import { useQuery } from "@tanstack/react-query";
import { getBookingsByCabinId } from "../../services/apiBookings";

export function useBookingsByCabinId(cabinId) {
  const {
    isLoading: isFetchingBookings,
    data: bookingsByCabinId,
    error,
  } = useQuery({
    queryKey: ["bookings-by-cabin", cabinId],
    queryFn: () => getBookingsByCabinId(cabinId),
    retry: false,
  });

  return { isFetchingBookings, bookingsByCabinId, error };
}
