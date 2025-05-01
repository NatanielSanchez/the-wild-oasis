import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateCurrentUser as updateCurrentUserAPI } from "../../services/apiAuth";
import toast from "react-hot-toast";

export function useUpdateUser() {
  const queryClient = useQueryClient();
  const { isLoading: isUpdatingUser, mutate: updateCurrentUser } = useMutation({
    mutationFn: (updateData) => updateCurrentUserAPI(updateData),
    onSuccess: (data) => {
      toast.success("User data updated successfully!");
      queryClient.setQueryData(["user"], data.user);
      // queryClient.invalidateQueries({
      //   queryKey: ["user"],
      // });
    },
    onError: (err) => toast.error(err.message),
  });
  return { isUpdatingUser, updateCurrentUser };
}
