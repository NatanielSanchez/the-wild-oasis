import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import Table from "../../ui/Table";
import Menus from "../../ui/Menus";
import { HiOutlineCalendar, HiOutlineCalendarDateRange } from "react-icons/hi2";

const Name = styled.div`
  font-size: 1.6rem;
`;
const NationalId = styled.div`
  font-size: 1.6rem;
  font-family: "Sono";
`;

const Email = styled.a`
  font-size: 1.4rem;
  color: var(--color-brand-500);
  &:hover {
    text-decoration: underline;
  }
  &:active {
    color: var(--color-purple-link);
  }
`;

const Nationality = styled.div`
  display: flex;
  gap: 0.5rem;
  align-items: center;

  font-size: 1.5rem;

  & img {
    max-width: 2.5rem;
  }
`;

function GuestRow({ guest }) {
  const navigate = useNavigate();
  return (
    <Table.Row>
      <Name>{guest.fullName}</Name>

      <NationalId>{guest.nationalId}</NationalId>

      <span>
        <Email href={`mailto:${guest.email}`}>{guest.email}</Email>
      </span>

      <Nationality>
        <img src={guest.countryFlag} alt="" />
        {guest.nationality}
      </Nationality>

      <Menus.Menu>
        <Menus.Toggle id={guest.id} />
        <Menus.List id={guest.id}>
          <Menus.Button
            icon={<HiOutlineCalendarDateRange />}
            onClick={() => navigate(`/bookings?name=${guest.fullName}`)}
          >
            Bookings
          </Menus.Button>
          <Menus.Button
            icon={<HiOutlineCalendar />}
            onClick={() => navigate(`/bookings/newBooking?guestNationalId=${guest.nationalId}`)}
          >
            New booking
          </Menus.Button>
        </Menus.List>
      </Menus.Menu>
    </Table.Row>
  );
}

export default GuestRow;
