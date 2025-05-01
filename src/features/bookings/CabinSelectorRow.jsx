import styled from "styled-components";
import Table from "../../ui/Table";
import { formatCurrency } from "../../utils/helpers";
import Checkbox from "../../ui/Checkbox";
import Modal from "../../ui/Modal";
import BigImage from "../../ui/BigImage";
import { useNewBooking } from "../../context/NewBookingContext";

const Img = styled.img`
  display: block;
  width: 5rem;
  aspect-ratio: 3 / 2;
  object-fit: cover;
  object-position: center;
  transform: scale(1.5) translateX(-7px);
`;

const Cabin = styled.div`
  font-family: "Sono";
  font-weight: 600;
  font-size: 1.5rem;
  color: var(--color-grey-600);
`;

const Price = styled.div`
  font-family: "Sono";
  font-weight: 600;
`;

const Discount = styled.div`
  font-family: "Sono";
  font-weight: 500;
  color: var(--color-green-700);
`;

function CabinSelectorRow({ cabin }) {
  const { selectedCabinId, dispatch } = useNewBooking();
  const { id, image, name, maxCapacity, regularPrice, discount } = cabin;
  return (
    <Table.Row>
      <Modal>
        <Modal.Open opens="full-image">
          <Img src={image} />
        </Modal.Open>
        <Modal.Window name="full-image">
          <BigImage image={image} />
        </Modal.Window>
      </Modal>
      <Cabin>{name}</Cabin>
      <Price>{formatCurrency(regularPrice)}</Price>
      <div>{maxCapacity} people</div>
      <Discount>{discount ? formatCurrency(discount) : "-"}</Discount>
      <Checkbox
        checked={id === selectedCabinId}
        onChange={() => dispatch({ type: "setSelectedCabinId", payload: id })}
      />
    </Table.Row>
  );
}

export default CabinSelectorRow;
