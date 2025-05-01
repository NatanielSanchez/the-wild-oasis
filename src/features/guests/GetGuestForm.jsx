import Form from "../../ui/Form";
import Input from "../../ui/Input";
import FormRow from "../../ui/FormRow";
import { useState } from "react";
import Button from "../../ui/Button";
import { useNewBooking } from "../../context/NewBookingContext";

function GetGuestForm({ onCloseModal }) {
  const { dispatch } = useNewBooking();
  const [nationalId, setNationalId] = useState("");

  function handleSubmit(e) {
    e.preventDefault();
    dispatch({ type: "setGuestNationalId", payload: nationalId });
    onCloseModal();
  }

  return (
    <Form onSubmit={handleSubmit}>
      <FormRow label="National Id">
        <Input type="text" value={nationalId} onChange={(e) => setNationalId(e.target.value)} />
      </FormRow>
      <FormRow>
        <Button variation="secondary" type="reset" onClick={() => onCloseModal?.()}>
          Cancel
        </Button>
        <Button>Find guest</Button>
      </FormRow>
    </Form>
  );
}

export default GetGuestForm;
