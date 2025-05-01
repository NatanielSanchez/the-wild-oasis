/*
-Country list with ISO 3166 codes provided by https://restcountries.com/
-Country flags as svg URL (which needs an ISO 3166 code) provided by https://flagcdn.com/
*/
import { Controller, useForm } from "react-hook-form";
import Select, { components } from "react-select";

import { emailRegex } from "../../utils/constants";
import Form from "../../ui/Form";
import FormRow from "../../ui/FormRow";
import Input from "../../ui/Input";
import ButtonGroup from "../../ui/ButtonGroup";
import Button from "../../ui/Button";
import { useCountries } from "../../hooks/useCountries";
import toast from "react-hot-toast";
import { Flag } from "../../ui/Flag";
import Spinner from "../../ui/Spinner";
import { useCreateGuest } from "./useCreateGuest";

const selectStyles = {
  control: (baseStyles) => ({
    ...baseStyles,
    width: "100%",
    background: "var(--color-grey-0)",
    border: "1px solid var(--color-grey-300)",
  }),
  singleValue: (baseStyles) => ({
    ...baseStyles,
    color: "var(--color-grey-700)",
  }),
  input: (baseStyles) => ({
    ...baseStyles,
    color: "var(--color-grey-700)",
  }),
  option: (baseStyles, state) => ({
    ...baseStyles,
    background: state.isFocused ? "var(--color-grey-100)" : "var(--color-grey-0)",
    color: "var(--color-grey-700)",
  }),
  menuList: (baseStyles) => ({
    ...baseStyles,
    background: "var(--color-grey-0)",
  }),
  dropdownIndicator: (baseStyles, state) => ({
    ...baseStyles,
    color: "var(--color-grey-800)",
  }),
  clearIndicator: (baseStyles) => ({
    ...baseStyles,
    color: "var(--color-grey-800)",
  }),
};

const MAX_VISIBLE_OPTIONS = 20;

function filterOptions(option, inputValue) {
  if (!inputValue) return option.data.index < MAX_VISIBLE_OPTIONS;
  return option.data.label.toLowerCase().includes(inputValue.toLowerCase());
}

/*
-onsuccess: function to do something with the created guest
*/
function CreateGuestForm({ onCloseModal, onSuccess }) {
  const { isFetchingCountries, countries, error: countriesError } = useCountries();
  const { isCreatingGuest, createGuest } = useCreateGuest();
  const { register, handleSubmit, formState, control } = useForm();
  const { errors } = formState;

  if (isFetchingCountries) return <Spinner />;
  if (countriesError) {
    toast.error(countriesError);
    onCloseModal?.();
  }

  const options = countries?.map((country, i) => {
    return {
      index: i,
      value: country.name,
      label: country.name,
      isoCode: country.isoCode,
    };
  });

  function submitNewGuest(data) {
    const newGuest = {
      fullName: data.fullName,
      nationalId: data.nationalId,
      email: data.email,
      nationality: data.country.value,
      countryFlag: `https://flagcdn.com/${data.country.isoCode.toLowerCase()}.svg`,
    };
    createGuest(newGuest, {
      onSuccess: (data) => {
        onCloseModal?.();
        onSuccess?.(data);
      },
    });
  }

  return (
    <Form type="modal" onSubmit={handleSubmit(submitNewGuest)}>
      <FormRow label="Full Name" error={errors?.fullName?.message}>
        <Input
          id="fullName"
          type="text"
          placeholder="John Smith..."
          disabled={isCreatingGuest}
          {...register("fullName", { required: "This field is required!" })}
        />
      </FormRow>
      <FormRow label="National Id" error={errors?.nationalId?.message}>
        <Input
          id="nationalId"
          type="text"
          placeholder="1234-JS-56789"
          disabled={isCreatingGuest}
          {...register("nationalId", { required: "This field is required!" })}
        />
      </FormRow>
      <FormRow label="E-mail" error={errors?.email?.message}>
        <Input
          id="email"
          type="text"
          placeholder="john@gmail.com"
          disabled={isCreatingGuest}
          {...register("email", {
            required: "This field is required!",
            pattern: { value: emailRegex, message: "Invalid e-mail!" },
          })}
        />
      </FormRow>
      <FormRow label="Nationality" error={errors?.country?.message}>
        <Controller
          control={control}
          name="country"
          rules={{ required: "Please select a country!" }}
          render={({ field: { onChange: onCountryChange, value: currentCountry } }) => (
            <Select
              id="country"
              placeholder="Select a country..."
              components={{ Option: CustomOption, SingleValue: CustomSingleValue }}
              options={options}
              filterOption={filterOptions}
              onChange={(selected) => onCountryChange(selected)}
              value={currentCountry} // starts undefined, but is verified by the Controller rules
              isLoading={isFetchingCountries}
              isDisabled={isFetchingCountries || isCreatingGuest}
              isClearable={true}
              isSearchable={true}
              backspaceRemovesValue={true}
              captureMenuScroll={true}
              closeMenuOnSelect={true}
              styles={selectStyles}
            />
          )}
        />
      </FormRow>
      <ButtonGroup>
        <Button type="reset" variation="secondary" onClick={() => onCloseModal?.()}>
          Cancel
        </Button>
        <Button>Create new guest</Button>
      </ButtonGroup>
    </Form>
  );
}

function CustomOption(props) {
  return (
    <components.Option {...props}>
      <div style={{ display: "flex", gap: "1rem" }}>
        <Flag src={`https://flagcdn.com/${props.data.isoCode.toLowerCase()}.svg`} alt="" />
        {props.data.label}
      </div>
    </components.Option>
  );
}
function CustomSingleValue(props) {
  return (
    <components.SingleValue {...props}>
      <div style={{ display: "flex", gap: "1rem", paddingLeft: "0.5rem" }}>
        <Flag src={`https://flagcdn.com/${props.data.isoCode.toLowerCase()}.svg`} alt="" />
        {props.data.label}
      </div>
    </components.SingleValue>
  );
}

export default CreateGuestForm;
