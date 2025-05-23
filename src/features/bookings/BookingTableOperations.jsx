import { Link } from "react-router-dom";
import TableOperations from "../../ui/TableOperations";
import SortBy from "../../ui/SortBy";
import Filter from "../../ui/Filter";
import InputFilter from "../../ui/InputFilter";
import Button from "../../ui/Button";

function BookingTableOperations() {
  return (
    <TableOperations>
      <Button as={Link} to="/bookings/newBooking">
        New booking
      </Button>

      <InputFilter fieldName="name" />

      <Filter
        filterField="status"
        options={[
          { value: "all", label: "All" },
          { value: "checked-out", label: "Checked out" },
          { value: "checked-in", label: "Checked in" },
          { value: "unconfirmed", label: "Unconfirmed" },
        ]}
      />

      <SortBy
        options={[
          { value: "startDate-desc", label: "Sort by date (recent first)" },
          { value: "startDate-asc", label: "Sort by date (earlier first)" },
          {
            value: "totalPrice-desc",
            label: "Sort by amount (high first)",
          },
          { value: "totalPrice-asc", label: "Sort by amount (low first)" },
        ]}
      />
    </TableOperations>
  );
}

export default BookingTableOperations;
