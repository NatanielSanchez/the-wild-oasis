import { useMutation, useQueryClient } from "@tanstack/react-query";
import { logOut as logOutAPI } from "../../services/apiAuth";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

export function useLogOut() {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const { isLoading: isLoggingOut, mutate: logOut } = useMutation({
    mutationFn: logOutAPI,
    onSuccess: () => {
      toast.success("Logged out successfully!");

      // could also invalidate all queries, which will re-render all components using them, including ProtectedRoute
      queryClient.removeQueries();
      navigate("/login");
    },
    onError: (err) => toast.error("Failed to log out: " + err.message),
  });

  return { isLoggingOut, logOut };
}
