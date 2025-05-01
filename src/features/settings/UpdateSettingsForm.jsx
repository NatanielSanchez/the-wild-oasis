import Form from "../../ui/Form";
import FormRow from "../../ui/FormRow";
import Input from "../../ui/Input";
import Spinner from "../../ui/Spinner";
import { useUpdateSetting } from "./useUpdateSetting";
import { useSettings } from "./useSettings";
import { useRef } from "react";

function UpdateSettingsForm() {
  const {
    settings = {}, // cannot access the data while fetching, so asign an empty object initially
    isFetchingSettings,
  } = useSettings();
  const inputRefs = [useRef(null), useRef(null), useRef(null), useRef(null)];

  const { updateSetting, isUpdatingSetting } = useUpdateSetting();

  function handleUpdate(e, fieldName) {
    const { value } = e.target;
    console.log(settings[fieldName]);
    if (!value || Number(value) === settings[fieldName]) return;
    updateSetting({ [fieldName]: value }); // turn the string into a key with bracket notation
  }

  if (isFetchingSettings) return <Spinner />;
  return (
    <Form>
      <FormRow label="Minimum nights/booking">
        <Input
          type="number"
          id="min-nights"
          defaultValue={settings.minBookingLength}
          disabled={isUpdatingSetting}
          ref={inputRefs[0]}
          onMouseDown={() => inputRefs[0].current.focus()}
          onBlur={(e) => handleUpdate(e, "minBookingLength")}
        />
      </FormRow>
      <FormRow label="Maximum nights/booking">
        <Input
          type="number"
          id="max-nights"
          defaultValue={settings.maxBookingLength}
          disabled={isUpdatingSetting}
          ref={inputRefs[1]}
          onMouseDown={() => inputRefs[1].current.focus()}
          onBlur={(e) => handleUpdate(e, "maxBookingLength")}
        />
      </FormRow>
      <FormRow label="Maximum guests/booking">
        <Input
          type="number"
          id="max-guests"
          defaultValue={settings.maxGuestsPerBooking}
          disabled={isUpdatingSetting}
          ref={inputRefs[2]}
          onMouseDown={() => inputRefs[2].current.focus()}
          onBlur={(e) => handleUpdate(e, "maxGuestsPerBooking")}
        />
      </FormRow>
      <FormRow label="Breakfast price">
        <Input
          type="number"
          id="breakfast-price"
          defaultValue={settings.breakfastPrice}
          disabled={isUpdatingSetting}
          ref={inputRefs[3]}
          onMouseDown={() => inputRefs[3].current.focus()}
          onBlur={(e) => handleUpdate(e, "breakfastPrice")}
        />
      </FormRow>
    </Form>
  );
}

export default UpdateSettingsForm;
