import styled from "styled-components";
import NewBookingSummary from "./NewBookingSummary";
const StyledBookingSubmit = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
`;

function BookingSubmit() {
  return (
    <StyledBookingSubmit>
      <NewBookingSummary />
    </StyledBookingSubmit>
  );
}

export default BookingSubmit;
