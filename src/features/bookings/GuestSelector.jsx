import { useNewBooking } from "../../context/NewBookingContext";
import Button from "../../ui/Button";
import ButtonGroup from "../../ui/ButtonGroup";
import Modal from "../../ui/Modal";
import CreateGuestForm from "../guests/CreateGuestForm";
import GetGuestForm from "../guests/GetGuestForm";
import GuestInfo from "../guests/GuestInfo";
import Row from "../../ui/Row";

function GuestSelector() {
  const { isFetchingGuest, dispatch } = useNewBooking();
  return (
    <Row>
      <ButtonGroup justifyContent="flex-start">
        <Modal>
          <Modal.Open opens="new-guest">
            <Button disabled={isFetchingGuest}>Load new guest</Button>
          </Modal.Open>
          <Modal.Open opens="existing-guest">
            <Button disabled={isFetchingGuest}>Load existing guest</Button>
          </Modal.Open>
          <Modal.Window name="new-guest">
            <CreateGuestForm
              onSuccess={(data) =>
                dispatch({ type: "setGuestNationalId", payload: data.nationalId })
              }
            />
          </Modal.Window>
          <Modal.Window name="existing-guest">
            <GetGuestForm />
          </Modal.Window>
        </Modal>
      </ButtonGroup>
      <GuestInfo />
    </Row>
  );
}

export default GuestSelector;
