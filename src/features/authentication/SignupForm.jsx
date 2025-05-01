import { useForm } from "react-hook-form";
import Button from "../../ui/Button";
import Form from "../../ui/Form";
import FormRow from "../../ui/FormRow";
import Input from "../../ui/Input";
import { useSignUp } from "./useSignUp";
import SpinnerMini from "../../ui/SpinnerMini";
import { emailRegex } from "../../utils/constants";

function SignupForm() {
  const { isSigningUp, signUp } = useSignUp();
  const { handleSubmit, register, reset, formState, getValues } = useForm();
  const { errors } = formState;
  function onSubmit({ fullName, email, password }) {
    signUp({ fullName, email, password }, { onSuccess: () => reset() });
  }

  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
      <FormRow label="Full name" error={errors?.fullName?.message}>
        <Input
          type="text"
          id="fullName"
          {...register("fullName", { required: "This field is required" })}
          disabled={isSigningUp}
        />
      </FormRow>

      <FormRow label="Email address" error={errors?.email?.message}>
        <Input
          type="email"
          id="email"
          {...register("email", {
            required: "This field is required!",
            pattern: { value: emailRegex, message: "Invalid email" },
          })}
          disabled={isSigningUp}
        />
      </FormRow>

      <FormRow label="Password (min 8 characters)" error={errors?.password?.message}>
        <Input
          type="password"
          id="password"
          {...register("password", {
            required: "This field is required",
            minLength: { value: 8, message: "Password must be at least 8 characters long" },
            validate: (value) => value.length >= 8 || "Password must be at least 8 characters long",
          })}
          disabled={isSigningUp}
        />
      </FormRow>

      <FormRow label="Repeat password" error={errors?.passwordConfirm?.message}>
        <Input
          type="password"
          id="passwordConfirm"
          {...register("passwordConfirm", {
            required: "This field is required",
            validate: (value) => value === getValues().password || "Must match password",
          })}
          disabled={isSigningUp}
        />
      </FormRow>

      <FormRow>
        {/* type is an HTML attribute! */}
        <Button variation="secondary" type="reset" disabled={isSigningUp} onClick={reset}>
          Cancel
        </Button>
        <Button disabled={isSigningUp}>{!isSigningUp ? "Create new user" : <SpinnerMini />}</Button>
      </FormRow>
    </Form>
  );
}

export default SignupForm;
