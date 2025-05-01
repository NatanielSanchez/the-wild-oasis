import { useQuery } from "@tanstack/react-query";
import { getCountries } from "../services/apiCountries";
export function useCountries() {
  const {
    isLoading: isFetchingCountries,
    data: countries,
    error,
  } = useQuery({
    queryKey: ["countries"],
    queryFn: getCountries,
  });
  return { isFetchingCountries, countries, error };
}
