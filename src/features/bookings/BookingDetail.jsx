import styled from "styled-components";
import { useNavigate } from "react-router-dom";

import { useBooking } from "./useBooking";
import { useMoveBack } from "../../hooks/useMoveBack";
import BookingDataBox from "./BookingDataBox";
import Row from "../../ui/Row";
import Heading from "../../ui/Heading";
import Tag from "../../ui/Tag";
import ButtonGroup from "../../ui/ButtonGroup";
import Button from "../../ui/Button";
import ButtonText from "../../ui/ButtonText";
import Spinner from "../../ui/Spinner";
import { useCheckout } from "../check-in-out/useCheckout.js";
import Modal from "../../ui/Modal.jsx";
import ConfirmDelete from "../../ui/ConfirmDelete.jsx";
import { useDeleteBooking } from "./useDeleteBooking.js";
import Empty from "../../ui/Empty.jsx";

const HeadingGroup = styled.div`
  display: flex;
  gap: 2.4rem;
  align-items: center;
`;
const statusToTagName = {
  unconfirmed: "blue",
  "checked-in": "green",
  "checked-out": "silver",
};

function BookingDetail() {
  const { booking, isFetchingBooking } = useBooking();
  const { checkout, isCheckingOut } = useCheckout();
  const { deleteBooking, isDeletingBooking } = useDeleteBooking();
  const navigate = useNavigate();
  const moveBack = useMoveBack();

  if (isFetchingBooking) return <Spinner />;
  if (!booking) return <Empty resourceName="booking" />;

  const { id: bookingId, status } = booking;
  const isWorking = isFetchingBooking || isCheckingOut || isDeletingBooking;

  return (
    <>
      <Row type="horizontal">
        <HeadingGroup>
          <Heading as="h1">Booking #{bookingId}</Heading>
          <Tag type={statusToTagName[status]}>{status.replace("-", " ")}</Tag>
        </HeadingGroup>
        <ButtonText onClick={moveBack}>&larr; Back</ButtonText>
      </Row>

      <BookingDataBox booking={booking} />

      <ButtonGroup>
        {status === "unconfirmed" && (
          <Button onClick={() => navigate(`/checkin/${bookingId}`)}>Check in</Button>
        )}
        {status === "checked-in" && (
          <Button onClick={() => checkout(bookingId)} disabled={isCheckingOut}>
            Check out
          </Button>
        )}

        <Modal>
          <Modal.Open opens="delete-booking">
            <Button variation="danger">Delete</Button>
          </Modal.Open>
          <Modal.Window name="delete-booking">
            <ConfirmDelete
              resourceName={`Booking #${bookingId}`}
              onConfirm={() => {
                deleteBooking(bookingId, { onSettled: moveBack() });
              }}
              disabled={isWorking}
            />
          </Modal.Window>
        </Modal>
        {/* <Button variation="secondary" onClick={moveBack}>
          Back
        </Button> */}
      </ButtonGroup>
    </>
  );
}

export default BookingDetail;
