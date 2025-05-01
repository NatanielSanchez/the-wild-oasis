import { useQuery } from "@tanstack/react-query";
import { getCabinById } from "../../services/apiCabins";

export function useCabin(cabinId) {
  const { isLoading: isFetchingCabin, data: cabin } = useQuery({
    queryKey: ["cabin", cabinId],
    queryFn: () => getCabinById(cabinId),
    retry: false,
  });

  return { isFetchingCabin, cabin };
}
