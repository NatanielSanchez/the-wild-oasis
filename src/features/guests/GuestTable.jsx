import Empty from "../../ui/Empty";
import Menus from "../../ui/Menus";
import Pagination from "../../ui/Pagination";
import Spinner from "../../ui/Spinner";
import Table from "../../ui/Table";
import GuestRow from "./GuestRow";
import { useGuests } from "./useGuests";

function GuestTable() {
  const { isFetchingGuests, guests, resultCount, error } = useGuests();
  if (isFetchingGuests) return <Spinner />;
  if (error) return <Empty resourceName="guests" />;
  return (
    <Menus>
      <Table columns="2fr 1fr 2fr 2fr 0.4fr">
        <Table.Header>
          <div>Full name</div>
          <div>National ID</div>
          <div>E-mail</div>
          <div>Nationality</div>
          <div></div>
        </Table.Header>

        <Table.Body
          items={guests}
          renderItem={(guest) => <GuestRow key={guest.id} guest={guest} />}
        />
        <Table.Footer>
          <Pagination resultCount={resultCount} />
        </Table.Footer>
      </Table>
    </Menus>
  );
}

export default GuestTable;
