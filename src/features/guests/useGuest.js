import { useQuery } from "@tanstack/react-query";
import { getGuestByNationalId } from "../../services/apiGuests";

export function useGuest(nationalId) {
  const {
    isLoading: isFetchingGuest,
    data: guest,
    error,
  } = useQuery({
    queryKey: ["guest", nationalId],
    queryFn: () => getGuestByNationalId(nationalId),
    retry: false,
  });
  return { isFetchingGuest, guest, error };
}
