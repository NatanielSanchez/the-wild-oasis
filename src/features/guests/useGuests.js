import { useQuery, useQueryClient } from "@tanstack/react-query";
import { getGuests } from "../../services/apiGuests";
import { useSearchParams } from "react-router-dom";
import { PAGE_SIZE } from "../../utils/constants";

export function useGuests() {
  const queryClient = useQueryClient();
  const [searchParams] = useSearchParams();

  // FILTERS
  const filters = [];

  const fullName = searchParams.get("name");
  if (fullName) filters.push({ method: "ilike", field: "fullName", value: `%${fullName}%` });

  const nationality = searchParams.get("nationality");
  if (nationality)
    filters.push({ method: "ilike", field: "nationality", value: `%${nationality}%` });

  // SORT
  const sortValue = searchParams.get("sortBy") || "fullName-asc";
  const [field, direction] = sortValue.split("-");
  const sortBy = { field, direction };

  // PAGINATION
  const page = !searchParams.get("page") ? 1 : Number(searchParams.get("page"));

  const {
    isLoading: isFetchingGuests,
    data: { guests, count: resultCount } = {},
    error,
  } = useQuery({
    queryKey: ["guests", filters, sortBy, page],
    queryFn: () => getGuests({ filters, sortBy, page }),
  });

  // PRE-FETCHING
  const pageCount = Math.ceil(resultCount / PAGE_SIZE);
  if (page < pageCount)
    queryClient.prefetchQuery({
      queryKey: ["guests", filters, sortBy, page + 1],
      queryFn: () => getGuests({ filters, sortBy, page: page + 1 }),
    });
  if (page > 1)
    queryClient.prefetchQuery({
      queryKey: ["guests", filters, sortBy, page - 1],
      queryFn: () => getGuests({ filters, sortBy, page: page - 1 }),
    });

  return { isFetchingGuests, guests, resultCount, error };
}
