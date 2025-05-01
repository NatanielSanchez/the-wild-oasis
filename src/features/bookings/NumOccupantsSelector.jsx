import styled from "styled-components";
import Button from "../../ui/Button";
import Heading from "../../ui/Heading";
import { useNewBooking } from "../../context/NewBookingContext";
import { useSettings } from "../settings/useSettings";
import Spinner from "../../ui/Spinner";
import { useCabin } from "../cabins/useCabin";

const StyledOccupantSelector = styled.div`
  display: flex;
  gap: 1rem;
  align-items: center;

  & span {
    width: 2rem;
    text-align: center;
  }
`;

function NumOccupantsSelector() {
  const { selectedCabinId, numOccupants, dispatch } = useNewBooking();
  const { cabin, isFetchingCabin } = useCabin(selectedCabinId);
  const { settings = {}, isFetchingSettings } = useSettings();
  function handleInc() {
    if (numOccupants < settings.maxGuestsPerBooking)
      dispatch({ type: "setNumOccupants", payload: numOccupants + 1 });
  }

  function handleDec() {
    if (numOccupants > 1) dispatch({ type: "setNumOccupants", payload: numOccupants - 1 });
  }

  if (isFetchingSettings || isFetchingCabin) return <Spinner />;
  if (!cabin) return null;

  const max =
    settings.maxGuestsPerBooking < cabin.maxCapacity
      ? settings.maxGuestsPerBooking
      : cabin.maxCapacity;

  return (
    <StyledOccupantSelector>
      <Heading as="h3">Number of occupants (max of {max}):</Heading>
      <Button size="small" variation="secondary" onClick={handleDec} disabled={numOccupants === 1}>
        -
      </Button>
      <span>{numOccupants}</span>
      <Button
        size="small"
        variation="secondary"
        onClick={handleInc}
        disabled={
          numOccupants === settings.maxGuestsPerBooking || numOccupants === cabin.maxCapacity
        }
      >
        +
      </Button>
    </StyledOccupantSelector>
  );
}

export default NumOccupantsSelector;
