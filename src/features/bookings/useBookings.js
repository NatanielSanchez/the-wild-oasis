import { useQuery, useQueryClient } from "@tanstack/react-query";
import { getBookings } from "../../services/apiBookings";
import { useSearchParams } from "react-router-dom";
import { PAGE_SIZE } from "../../utils/constants";

export function useBookings() {
  const queryClient = useQueryClient();
  const [searchParams] = useSearchParams();

  // FILTERS: an array of filter objects
  const filters = [];
  const status = searchParams.get("status");
  if (status && status !== "all") filters.push({ field: "status", value: status });

  const fullName = searchParams.get("name");
  if (fullName) filters.push({ method: "ilike", field: "guests.fullName", value: `%${fullName}%` });

  // SORT: an object
  const sortValue = searchParams.get("sortBy") || "startDate-desc";
  const [field, direction] = sortValue.split("-");
  const sortBy = { field, direction };

  // PAGINATION: a number
  const page = !searchParams.get("page") ? 1 : Number(searchParams.get("page"));

  const {
    data: { data: bookings, count: resultCount } = {}, // cant destructure while fetching because its undefined!
    isLoading: isFetchingBookings,
    error,
  } = useQuery({
    queryKey: ["bookings", filters, sortBy, page],
    queryFn: () => getBookings({ filters, sortBy, page }),
  });

  // PRE-FETCHING
  const pageCount = Math.ceil(resultCount / PAGE_SIZE);
  if (page < pageCount)
    queryClient.prefetchQuery({
      queryKey: ["bookings", filters, sortBy, page + 1],
      queryFn: () => getBookings({ filters, sortBy, page: page + 1 }),
    });
  if (page > 1)
    queryClient.prefetchQuery({
      queryKey: ["bookings", filters, sortBy, page - 1],
      queryFn: () => getBookings({ filters, sortBy, page: page - 1 }),
    });
  return { bookings, resultCount, isFetchingBookings, error };
}
