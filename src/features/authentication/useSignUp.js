import { useMutation } from "@tanstack/react-query";
import { signUp as signUpAPI } from "../../services/apiAuth";
import toast from "react-hot-toast";

export function useSignUp() {
  const { isLoading: isSigningUp, mutate: signUp } = useMutation({
    mutationFn: (newUser) => signUpAPI(newUser),
    onSuccess: (data) => {
      toast.success(
        `New user ${data.user.user_metadata.fullName} successfully created! Please confirm email at ${data.user.user_metadata.email}`
      );
    },
    onError: (err) => toast.error(err),
  });
  return { isSigningUp, signUp };
}
