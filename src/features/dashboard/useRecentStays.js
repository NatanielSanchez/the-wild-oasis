import { useQuery } from "@tanstack/react-query";
import { useSearchParams } from "react-router-dom";
import { getStaysAfterDate } from "../../services/apiBookings";
import { subDays } from "date-fns";

/* returns bookings with a START DATE after the query date and before today, and also returns the ckecked in/out bookings (stays), and also the numDays filter */
export function useRecentStays() {
  const [searchParams] = useSearchParams();

  // FILTER:
  const numDays = !searchParams.get("last") ? 7 : Number(searchParams.get("last"));
  const queryDate = subDays(new Date(), numDays).toISOString(); // returns the current date - numDays

  const {
    data: recentStays,
    isLoading: isFetchingRecentStays,
    error,
  } = useQuery({
    queryKey: ["recentStays", `last-${numDays}`],
    queryFn: () => getStaysAfterDate(queryDate),
  });

  const confirmedStays = recentStays?.filter(
    (stay) => stay.status === "checked-in" || stay.status === "checked-out"
  );

  return { recentStays, confirmedStays, isFetchingRecentStays, error, numDays };
}
