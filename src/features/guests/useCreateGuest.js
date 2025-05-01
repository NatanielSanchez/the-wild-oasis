import { useMutation } from "@tanstack/react-query";
import { createGuest as createGuestAPI } from "../../services/apiGuests";
import toast from "react-hot-toast";

export function useCreateGuest() {
  const { isLoading: isCreatingGuest, mutate: createGuest } = useMutation({
    mutationFn: createGuestAPI,
    onSuccess: (data) => toast.success("Guest created successfully: " + data.fullName),
    onError: (err) => toast.error(err),
  });
  return { isCreatingGuest, createGuest };
}
