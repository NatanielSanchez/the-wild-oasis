import { useQuery } from "@tanstack/react-query";
import { getStaysTodayActivity } from "../../services/apiBookings";

export function useTodayActivity() {
  const {
    isLoading: isFetchingTodayActivity,
    data: activities, // bookings that either check in/out TODAY
    error,
  } = useQuery({
    queryKey: ["today-activity"],
    queryFn: getStaysTodayActivity,
  });

  return { isFetchingTodayActivity, activities, error };
}
