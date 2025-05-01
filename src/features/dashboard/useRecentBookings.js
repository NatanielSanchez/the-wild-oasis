import { useQuery } from "@tanstack/react-query";
import { useSearchParams } from "react-router-dom";
import { getBookingsAfterDate } from "../../services/apiBookings";
import { subDays } from "date-fns";

/* returns bookings CREATED after the query date and before today */
export function useRecentBookings() {
  const [searchParams] = useSearchParams();

  // FILTER:
  const numDays = !searchParams.get("last") ? 7 : Number(searchParams.get("last"));
  const queryDate = subDays(new Date(), numDays).toISOString(); // returns the current date - numDays

  const {
    data: recentBookings,
    isLoading: isFetchingRecentBookings,
    error,
  } = useQuery({
    queryKey: ["recentBookings", `last-${numDays}`],
    queryFn: () => getBookingsAfterDate(queryDate),
  });

  return { recentBookings, isFetchingRecentBookings, error };
}
