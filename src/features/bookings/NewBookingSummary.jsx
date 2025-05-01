import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { differenceInDays, formatDate } from "date-fns";
import { useCreateBooking } from "./useCreateBooking";
import { useNewBooking } from "../../context/NewBookingContext";
import { useGuest } from "../guests/useGuest";
import { useCabin } from "../cabins/useCabin";
import { formatCurrency } from "../../utils/helpers";
import Heading from "../../ui/Heading";
import Spinner from "../../ui/Spinner";
import Button from "../../ui/Button";

const StyledNewBookingSummary = styled.div`
  width: 100rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 0.5rem;
  font-size: 2rem;
`;

const Item = styled.div`
  display: flex;
  gap: 0.5rem;

  & span {
    color: var(--color-grey-900);
    font-weight: 700;
    text-decoration: underline;
  }

  & p {
    color: var(--color-grey-600);
    margin-bottom: 1.2rem;
  }
`;

const Box = styled.div`
  background-color: var(--color-grey-100);
  border: 0.5px solid var(--color-grey-700);
  border-radius: var(--border-radius-md);
  padding: 1rem;
  margin: 0.5rem 0;
`;

const CommonRow = styled.div`
  display: grid;
  grid-template-columns: repeat(${(props) => (props.withDiscount ? 5 : 4)}, 1fr);
  column-gap: 2rem;
  align-items: center;
  text-align: center;

  & div {
    padding: 0.4rem;
  }
`;

const HeaderRow = styled(CommonRow)`
  font-size: 2.5rem;
  font-weight: 700;
  text-decoration: underline;
  border-bottom: 2px dashed var(--color-grey-500);
`;

const Price = styled.div`
  color: var(--color-green-500);
  font-weight: 800;
`;

/* dates are so annoying */
function normalizeDate(date) {
  const normalizedDate = new Date(date);
  normalizedDate.setUTCHours(0, 0, 0, 0);
  return normalizedDate.toISOString().slice(0, -1);
}

function NewBookingSummary() {
  const navigate = useNavigate();
  const { guestNationalId, selectedCabinId, dates, numOccupants, observations } = useNewBooking();
  const { guest, isFetchingGuest } = useGuest(guestNationalId);
  const { cabin, isFetchingCabin } = useCabin(selectedCabinId);
  const { isCreatingBooking, createBooking } = useCreateBooking();

  if (isFetchingCabin || isFetchingGuest) return <Spinner />;

  const cabinHasDiscount = cabin.discount > 0;
  const numNights = differenceInDays(dates.end, dates.start);
  const cabinPrice =
    (cabinHasDiscount ? cabin.regularPrice - cabin.discount : cabin.regularPrice) *
    numOccupants *
    numNights;

  function handleCreateBooking() {
    const newBooking = {
      guestId: guest.id,
      cabinId: cabin.id,
      startDate: normalizeDate(dates.start),
      endDate: normalizeDate(dates.end),
      status: "unconfirmed",
      numGuests: numOccupants,
      numNights,
      cabinPrice,
      extrasPrice: 0,
      totalPrice: cabinPrice + 0,
      hasBreakfast: false,
      isPaid: false,
      observations,
    };
    createBooking(newBooking, {
      onSuccess: (booking) => {
        navigate(`/checkin/${booking.id}`);
      },
    });
  }

  console.log(normalizeDate(new Date(dates.start)));

  return (
    <>
      <StyledNewBookingSummary>
        <Heading as="h4">Confirm new booking</Heading>
        <Item>
          <span>Guest name: </span> <p>{guest.fullName}</p> &mdash; <span>Cabin: </span>{" "}
          <p>{cabin.name}</p> &mdash; <span>Occupants: </span> <p>{numOccupants}</p>
        </Item>
        <Item>
          <span>Start date: </span>
          <p>{formatDate(normalizeDate(new Date(dates.start)), "yyyy MMM dd")}</p> &mdash;{" "}
          <span>End date: </span>
          <p>{formatDate(normalizeDate(new Date(dates.end)), "yyyy MMM dd")}</p>
        </Item>
        <Box>
          <HeaderRow withDiscount={cabinHasDiscount}>
            <div>Cabin price</div>
            {cabinHasDiscount && <div>Discount</div>}
            <div>Occupants</div>
            <div>Nights</div>
            <div>Total</div>
          </HeaderRow>
          <CommonRow withDiscount={cabinHasDiscount}>
            <Price>{formatCurrency(cabin.regularPrice)}</Price>
            {cabinHasDiscount && <Price>{formatCurrency(cabin.discount)}</Price>}
            <div>{numOccupants}</div>
            <div>{numNights}</div>
            <Price>{formatCurrency(cabinPrice)}</Price>
          </CommonRow>
        </Box>
        {observations && (
          <Item>
            <span>Observations: </span> <p>{observations}</p>
          </Item>
        )}
      </StyledNewBookingSummary>
      <Button
        disabled={!guestNationalId || !selectedCabinId || !dates || isCreatingBooking}
        onClick={handleCreateBooking}
      >
        Submit new booking
      </Button>
    </>
  );
}

export default NewBookingSummary;
