import Heading from "../../ui/Heading";
import Row from "../../ui/Row";
import CabinSelector from "./CabinSelector";
import DatesSelector from "./DatesSelector";
import GuestSelector from "./GuestSelector";
import NumOccupantsSelector from "./NumOccupantsSelector";
import Observations from "./Observations";
import BookingSubmit from "./BookingSubmit";
import Stepper from "../../ui/Stepper";
import StepperButtons from "../../ui/StepperButtons";
import { useNewBooking } from "../../context/NewBookingContext";

function CreateBookingForm() {
  const { currentStep, guestNationalId, selectedCabinId, dates, dispatch } = useNewBooking();

  return (
    <>
      <Row type="horizontal">
        <Heading>Create new booking</Heading>
      </Row>

      <Stepper
        active={currentStep}
        onActiveChange={(number) => dispatch({ type: "setCurrentStep", payload: number })}
      >
        <Stepper.Step label="Guest" completed={guestNationalId}>
          <GuestSelector />
        </Stepper.Step>
        <Stepper.Step label="Cabin" completed={selectedCabinId}>
          <CabinSelector />
        </Stepper.Step>
        <Stepper.Step
          label="Date range"
          completed={dates}
          disableSelection={selectedCabinId === null}
        >
          <DatesSelector />
        </Stepper.Step>
        <Stepper.Step label="Occupants / observations" disableSelection={selectedCabinId === null}>
          <Row>
            <NumOccupantsSelector />
            <Observations />
          </Row>
        </Stepper.Step>
        <Stepper.Completed>
          <BookingSubmit />
        </Stepper.Completed>
      </Stepper>

      <StepperButtons />
    </>
  );
}

export default CreateBookingForm;
