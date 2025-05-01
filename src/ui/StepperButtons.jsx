import styled from "styled-components";
import Button from "./Button";
import { useNewBooking } from "../context/NewBookingContext";

const StyledStepperButtons = styled.div`
  display: flex;
  align-items: center;
  margin: 0 auto;
  gap: 2rem;
`;

function StepperButtons() {
  const { dispatch, currentStep, isCurrentStepCompleted } = useNewBooking();
  return (
    <StyledStepperButtons>
      <Button variation="secondary" onClick={() => dispatch({ type: "previousStep" })}>
        Previous step
      </Button>
      {currentStep < 5 && (
        <Button onClick={() => dispatch({ type: "nextStep" })} disabled={!isCurrentStepCompleted}>
          Next step
        </Button>
      )}
    </StyledStepperButtons>
  );
}

export default StepperButtons;
