import styled from "styled-components";
import { Flag } from "../../ui/Flag";
import { useNewBooking } from "../../context/NewBookingContext";
import Spinner from "../../ui/Spinner";
import { useGuest } from "./useGuest";
import Heading from "../../ui/Heading";

const Box = styled.div`
  background-color: var(--color-grey-0);
  border: 1px solid var(--color-grey-100);
  border-radius: var(--border-radius-md);
  padding: 0.5rem;
`;

const CommonRow = styled.div`
  display: grid;
  grid-template-columns: 1fr 2fr 2fr 1fr;
  column-gap: 2.4rem;
  align-items: center;
`;

const StyledGuestInfo = styled(CommonRow)`
  padding: 1rem 1.5rem;
  border-bottom: 2px dashed var(--color-grey-100);
  text-transform: uppercase;
  letter-spacing: 0.4px;
  font-weight: 600;
  color: var(--color-grey-600);
`;

const Guest = styled(CommonRow)`
  padding: 1rem 1.5rem;
`;

const GuestNationality = styled.div`
  display: flex;
  align-items: center;

  & img {
    padding-left: 0.5rem;
  }
`;

const NoGuest = styled.p`
  font-size: 2rem;
  font-weight: 400;
  color: var(--color-red-800);
`;

function GuestInfo() {
  const { guestNationalId } = useNewBooking();
  const { guest, isFetchingGuest } = useGuest(guestNationalId);
  if (isFetchingGuest) return <Spinner />;
  if (!guest)
    return <NoGuest>No guest loaded! Find a guest by national ID or create a new one.</NoGuest>;

  return (
    <>
      <Heading as="h3">Guest information</Heading>
      <Box>
        <StyledGuestInfo>
          <div>National ID</div>
          <div>Full Name</div>
          <div>E-mail</div>
          <div>Nationality</div>
        </StyledGuestInfo>
        <Guest>
          <div>{guest.nationalId}</div>
          <div>{guest.fullName}</div>
          <div>{guest.email}</div>
          <GuestNationality>
            {guest.nationality}
            <Flag src={guest.countryFlag} alt="" />
          </GuestNationality>
        </Guest>
      </Box>
    </>
  );
}

export default GuestInfo;
