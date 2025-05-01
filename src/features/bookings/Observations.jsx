import styled from "styled-components";
import Heading from "../../ui/Heading";
import Textarea from "../../ui/Textarea";
import { useNewBooking } from "../../context/NewBookingContext";

const StyledObservations = styled.div`
  display: flex;
  gap: 1rem;
  align-items: center;
`;

function Observations() {
  const { observations, dispatch } = useNewBooking();
  return (
    <StyledObservations>
      <Heading as="h3">Observations: </Heading>
      <Textarea
        value={observations}
        onChange={(e) => dispatch({ type: "setObservations", payload: e.target.value })}
      />
    </StyledObservations>
  );
}

export default Observations;
