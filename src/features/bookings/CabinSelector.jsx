import Heading from "../../ui/Heading";
import Spinner from "../../ui/Spinner";
import Table from "../../ui/Table";
import { useCabins } from "../cabins/useCabins";
import CabinSelectorRow from "./CabinSelectorRow";

function CabinSelector() {
  const { cabins, isFetchingCabins } = useCabins();
  if (isFetchingCabins) return <Spinner />;
  return (
    <>
      <Heading as="h3">Select a cabin</Heading>
      <Table columns="0.6fr 1fr 2fr 1fr 1fr .5fr" title="Select a cabin">
        <Table.Header>
          <div></div>
          <div>Cabin</div>
          <div>Price per occupant</div>
          <div>Capacity</div>
          <div>Discount</div>
          <div></div>
        </Table.Header>
        <Table.Body
          items={cabins}
          renderItem={(cabin) => <CabinSelectorRow key={cabin.id} cabin={cabin} />}
        />
      </Table>
    </>
  );
}

export default CabinSelector;
