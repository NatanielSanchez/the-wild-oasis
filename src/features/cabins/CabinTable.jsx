import { useSearchParams } from "react-router-dom";
import { useCabins } from "./useCabins";
import { getCoparatorFunction } from "../../utils/helpers";
import Spinner from "../../ui/Spinner";
import CabinRow from "./CabinRow";
import Table from "../../ui/Table";
import Menus from "../../ui/Menus";
import Empty from "../../ui/Empty";

function CabinTable() {
  const { cabins, isFetchingCabins } = useCabins();
  const [searchParams] = useSearchParams();

  if (isFetchingCabins) return <Spinner />;
  if (!cabins.length) return <Empty resourceName="cabins" />;

  // 1. Filter the cabins
  const filter = searchParams.get("discount") || "all";
  let filteredCabins;
  switch (filter) {
    case "all":
      filteredCabins = cabins;
      break;
    case "with-discount":
      filteredCabins = cabins.filter((cabin) => cabin.discount > 0);
      break;
    case "no-discount":
      filteredCabins = cabins.filter((cabin) => cabin.discount <= 0);
      break;
    default:
      throw new Error("Something is wrong with the filters!");
  }

  // 2. Sort the cabins
  const sortBy = searchParams.get("sortBy") || "name-asc";
  const [field, direction] = sortBy.split("-");
  // get a comparator function fitting for the data type
  const comparator = getCoparatorFunction(
    filteredCabins.length ? typeof filteredCabins.at(0)[field] : null
  );
  const modifier = direction === "asc" ? 1 : -1;
  const sortedCabins = filteredCabins.sort(
    (a, b) => comparator(a[field], b[field]) * modifier
  );

  return (
    <Menus>
      <Table columns="0.6fr 1.8fr 2.2fr 1fr 1fr 1fr">
        <Table.Header>
          <div></div>
          <div>Cabin</div>
          <div>Capacity</div>
          <div>Price</div>
          <div>Discount</div>
          <div></div>
        </Table.Header>
        <Table.Body
          items={sortedCabins} // the data to loop over
          renderItem={(cabin) => <CabinRow key={cabin.id} cabin={cabin} />} // what to do with each item of data
        />
      </Table>
    </Menus>
  );
}

export default CabinTable;
