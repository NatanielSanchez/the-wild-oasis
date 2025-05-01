import { useMutation, useQueryClient } from "@tanstack/react-query";
import { logIn as logInAPI } from "../../services/apiAuth";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

/* its a mutation cuz something changes on the server, and its easier to handle the success and error */
export function useLogIn() {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const { isLoading: isLogging, mutate: logIn } = useMutation({
    mutationFn: (credentials) => logInAPI(credentials),
    onSuccess: (data) => {
      queryClient.setQueryData(["user"], data.user); // only cache the user!
      toast.success("Logged in successfully!");
      navigate("/dashboard", { replace: true });
    },
    onError: (err) => toast.error(err.message),
  });

  return { isLogging, logIn };
}
