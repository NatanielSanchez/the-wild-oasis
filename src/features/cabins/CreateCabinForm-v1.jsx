import { useForm } from "react-hook-form";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";

import Input from "../../ui/Input";
import Form from "../../ui/Form";
import Button from "../../ui/Button";
import FileInput from "../../ui/FileInput";
import Textarea from "../../ui/Textarea";
import { createCabin } from "../../services/apiCabins";
import FormRow from "../../ui/FormRow";

function CreateCabinForm({ cabinToEdit }) {
  const { register, handleSubmit, reset, getValues, formState } = useForm();
  const { errors } = formState;

  const queryClient = useQueryClient();
  const { mutate, isLoading: isCreatingCabin } = useMutation({
    mutationFn: createCabin,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["cabins"],
      });
      reset();
      toast.success("Cabin created sucessfully!");
    },
    onError: (err) => {
      toast.error(err.message);
    },
  });

  function onSubmit(data) {
    // the image is submited as the first element of a FileList
    mutate({ ...data, image: data.image[0] });
  }

  function onError(errors) {
    // console.log(errors)
  }
  return (
    <Form onSubmit={handleSubmit(onSubmit, onError)}>
      <FormRow label="Cabin name" error={errors?.name?.message}>
        <Input
          type="text"
          id="name"
          disabled={isCreatingCabin}
          {...register("name", { required: "This field is required!" })}
        />
      </FormRow>

      <FormRow label="Maximum Capacity" error={errors?.maxCapacity?.message}>
        <Input
          type="number"
          id="maxCapacity"
          disabled={isCreatingCabin}
          {...register("maxCapacity", {
            required: "This field is required!",
            min: {
              value: 1,
              message: "Capacity should be at least 1",
            },
          })}
        />
      </FormRow>

      <FormRow label="Regular Price" error={errors?.regularPrice?.message}>
        <Input
          type="number"
          id="regularPrice"
          disabled={isCreatingCabin}
          {...register("regularPrice", {
            required: "This field is required!",
            min: {
              value: 1,
              message: "Price should be at least 1",
            },
          })}
        />
      </FormRow>

      <FormRow label="Discount" error={errors?.discount?.message}>
        <Input
          type="number"
          id="discount"
          defaultValue={0}
          disabled={isCreatingCabin}
          {...register("discount", {
            required: "This field is required!",
            validate: (value) =>
              value <= getValues().regularPrice ||
              "Discount must be less than price",
          })}
        />
      </FormRow>

      <FormRow
        label="Description for website"
        error={errors?.description?.message}
      >
        <Textarea
          type="number"
          id="description"
          defaultValue=""
          disabled={isCreatingCabin}
          {...register("description", { required: "This field is required!" })}
        />
      </FormRow>

      <FormRow label="Cabin photo">
        <FileInput
          id="image"
          accept="image/*"
          type="number"
          disabled={isCreatingCabin}
          {...register("image", { required: "This field is required!" })}
        />
      </FormRow>

      <FormRow>
        {/* type is an HTML attribute! */}
        <Button variation="secondary" type="reset" disabled={isCreatingCabin}>
          Cancel
        </Button>
        <Button disabled={isCreatingCabin}>Add cabin</Button>
      </FormRow>
    </Form>
  );
}

export default CreateCabinForm;
