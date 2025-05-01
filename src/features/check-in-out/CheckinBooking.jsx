import styled from "styled-components";
import BookingDataBox from "../../features/bookings/BookingDataBox";

import Row from "../../ui/Row";
import Heading from "../../ui/Heading";
import ButtonGroup from "../../ui/ButtonGroup";
import Button from "../../ui/Button";
import ButtonText from "../../ui/ButtonText";

import { useMoveBack } from "../../hooks/useMoveBack";
import { useBooking } from "../bookings/useBooking";
import Spinner from "../../ui/Spinner";
import { useEffect, useState } from "react";
import Checkbox from "../../ui/Checkbox";
import { useCheckin } from "./useCheckin";
import { useSettings } from "../settings/useSettings";
import { formatCurrency } from "../../utils/helpers";
import Empty from "../../ui/Empty";

const Box = styled.div`
  /* Box */
  background-color: var(--color-grey-0);
  border: 1px solid var(--color-grey-100);
  border-radius: var(--border-radius-md);
  padding: 2.4rem 4rem;
`;

function CheckinBooking() {
  const [confirmPaid, setConfirmPaid] = useState(false);
  const [addBreakfast, setAddBreakfast] = useState(false);
  const { booking, isFetchingBooking } = useBooking();
  const { settings, isFetchingSettings } = useSettings();
  const moveBack = useMoveBack();
  const { isCheckingIn, checkin } = useCheckin();
  useEffect(() => {
    setConfirmPaid(booking?.isPaid ?? false);
  }, [booking]);

  if (isFetchingBooking || isFetchingSettings) return <Spinner />;
  if (!booking) return <Empty resourceName="booking" />;

  const { id: bookingId, totalPrice, numGuests, hasBreakfast, numNights } = booking;
  const totalBreakfastPrice = settings.breakfastPrice * numGuests * numNights;

  function handleCheckin() {
    if (!confirmPaid) return;
    if (addBreakfast) {
      checkin({
        bookingId,
        breakfast: {
          hasBreakfast: true,
          extrasPrice: totalBreakfastPrice,
          totalPrice: totalPrice + totalBreakfastPrice,
        },
      });
    } else checkin({ bookingId, breakfast: {} });
  }

  return (
    <>
      <Row type="horizontal">
        <Heading as="h1">Check in booking #{bookingId}</Heading>
        <ButtonText onClick={moveBack}>&larr; Back</ButtonText>
      </Row>

      <BookingDataBox booking={booking} />
      {!hasBreakfast && (
        <Box>
          <Checkbox
            checked={addBreakfast}
            onChange={() => {
              setAddBreakfast((add) => !add);
              setConfirmPaid(false);
            }}
            id="breakfast"
            disabled={isCheckingIn}
          >
            Add breakfast for {formatCurrency(totalBreakfastPrice)}
          </Checkbox>
        </Box>
      )}
      <Box>
        <Checkbox
          checked={confirmPaid}
          onChange={() => setConfirmPaid((paid) => !paid)}
          id="confirm"
          disabled={confirmPaid || isCheckingIn}
        >
          Confirm payment:{" "}
          {!addBreakfast
            ? formatCurrency(totalPrice)
            : `${formatCurrency(totalPrice + totalBreakfastPrice)} (${formatCurrency(
                totalPrice
              )} + ${formatCurrency(totalBreakfastPrice)})`}
        </Checkbox>
      </Box>
      <ButtonGroup>
        <Button onClick={handleCheckin} disabled={!confirmPaid || isCheckingIn}>
          Check in booking #{bookingId}
        </Button>
        {/* <Button variation="secondary" onClick={moveBack}>
          Back
        </Button> */}
      </ButtonGroup>
    </>
  );
}

export default CheckinBooking;
