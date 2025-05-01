import { useQueryClient } from "@tanstack/react-query";
import Button from "../../ui/Button";
import InputFilter from "../../ui/InputFilter";
import Modal from "../../ui/Modal";
import SortBy from "../../ui/SortBy";
import TableOperations from "../../ui/TableOperations";
import CreateGuestForm from "./CreateGuestForm";

function GuestTableOperations() {
  const queryClient = useQueryClient();
  return (
    <TableOperations>
      <Modal>
        <Modal.Open opens="new-guest-form">
          <Button>Add guest</Button>
        </Modal.Open>
        <Modal.Window name="new-guest-form">
          <CreateGuestForm
            onSuccess={() => queryClient.invalidateQueries({ queryKey: ["guests"] })}
          />
        </Modal.Window>
      </Modal>

      <InputFilter fieldName="name" />
      <InputFilter fieldName="nationality" />
      <SortBy
        options={[
          { value: "fullName-asc", label: "Sort by name (A-Z)" },
          { value: "fullName-desc", label: "Sort by name (Z-A)" },
        ]}
      />
    </TableOperations>
  );
}

export default GuestTableOperations;
