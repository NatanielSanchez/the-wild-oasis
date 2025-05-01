import styled from "styled-components";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";
import Heading from "../../ui/Heading";
import { useNavigate } from "react-router-dom";
import Tag from "../../ui/Tag";
import Row from "../../ui/Row";

const StyledBookingCalendar = styled.div`
  /* Box */
  background-color: var(--color-grey-0);
  border: 1px solid var(--color-grey-100);
  border-radius: var(--border-radius-md);
  padding: 3.2rem;
  grid-column: 1 / -1;
`;

const TagGroup = styled.div`
  display: flex;
  gap: 0.5rem;
  justify-content: flex-end;
`;

const colors = {
  "checked-in": "var(--color-green-100)",
  "checked-out": "var(--color-blue-100)",
  unconfirmed: "var(--color-silver-100)",
};

function BookingCalendar({ bookings, numDays }) {
  const navigate = useNavigate();

  function handleEventClick(e) {
    navigate(`/bookings/${e.event.id}`);
  }

  return (
    <StyledBookingCalendar>
      <Row type="horizontal">
        <Heading as="h2">Bookings from the last {numDays} days</Heading>
        <TagGroup>
          <Tag type="green">Checked in</Tag>
          <Tag type="blue">Checked out</Tag>
          <Tag type="silver">Unconfirmed</Tag>
        </TagGroup>
      </Row>

      <FullCalendar
        plugins={[dayGridPlugin, interactionPlugin]}
        initialView="dayGridMonth"
        events={bookings.map((booking) => {
          return {
            id: booking.id,
            title: `Cabin ID ${booking.cabinId} - ${booking.guests.fullName}`,
            start: booking.startDate,
            end: booking.endDate,
            color: colors[booking.status],
            textColor: "var(--color-grey-800)",
            className: "eventStyle",
          };
        })}
        eventClick={handleEventClick}
        displayEventTime={false}
      />
    </StyledBookingCalendar>
  );
}

export default BookingCalendar;
