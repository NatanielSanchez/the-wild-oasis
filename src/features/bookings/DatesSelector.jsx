import { differenceInDays, isBefore, startOfDay } from "date-fns";
import { toast } from "react-hot-toast";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";
import { useBookingsByCabinId } from "./useBookingsByCabinId";
import Spinner from "../../ui/Spinner";
import Heading from "../../ui/Heading";
import styled from "styled-components";
import { useNewBooking } from "../../context/NewBookingContext";
import { useSettings } from "../settings/useSettings";

const Box = styled.div`
  background-color: var(--color-grey-0);
  border: 1px solid var(--color-grey-100);
  border-radius: var(--border-radius-lg);
  padding: 2rem 5rem;
`;

const initialState = {
  id: "new",
  title: "New Booking",
  color: "green",
  start: "",
  end: "",
  overlap: false,
  editable: true,
  durationEditable: true,
  startEditable: true,
};

function DatesSelector() {
  const { selectedCabinId, dispatch, dates } = useNewBooking();
  const { isFetchingBookings, bookingsByCabinId } = useBookingsByCabinId(selectedCabinId);
  const { settings = {}, isFetchingSettings } = useSettings();

  if (!selectedCabinId) return null;
  if (isFetchingBookings || isFetchingSettings) return <Spinner />;

  const events = bookingsByCabinId
    .filter((booking) => booking.status !== "checked-out")
    .map((booking) => {
      return {
        id: booking.id,
        title: `Booking ID: ${booking.id}`,
        start: booking.startDate,
        end: booking.endDate,
      };
    });

  const newBookingEvent = dates
    ? { ...initialState, start: dates.start, end: dates.end }
    : initialState;

  function handleSelect(selectInfo) {
    if (!isSelectionValid(selectInfo.start, selectInfo.end)) return;

    dispatch({
      type: "setDates",
      payload: {
        start: selectInfo.startStr,
        end: selectInfo.endStr,
      },
    });
  }

  function handleResize(resizeInfo) {
    const { event, revert } = resizeInfo;
    if (!isSelectionValid(event.start, event.end)) {
      revert(); // undo re-size
      return;
    }

    dispatch({
      type: "setDates",
      payload: {
        start: event.startStr,
        end: event.endStr,
      },
    });
  }

  function handleEventDrop(dropInfo) {
    const { event, revert } = dropInfo;
    if (!isSelectionValid(event.start, event.end)) {
      revert(); // undo re-size
      return;
    }

    dispatch({
      type: "setDates",
      payload: {
        start: event.startStr,
        end: event.endStr,
      },
    });
  }

  function handleEventClick(clickInfo) {
    if (clickInfo.event.id === "new") {
      dispatch({ type: "setDates", payload: null });
    }
  }

  function isSelectionValid(start, end) {
    let today = startOfDay(new Date());

    if (isBefore(start, today)) {
      toast.error(`Start date can't be before today!`);
      return false;
    }

    const numNights = differenceInDays(end, start);
    if (numNights < settings.minBookingLength || numNights > settings.maxBookingLength) {
      toast.error(
        `Booking length has to be between ${settings.minBookingLength} and ${settings.maxBookingLength} nights!`
      );
      return false;
    } else return true;
  }

  return (
    <>
      <Heading as="h3">Select start and end dates</Heading>
      <Box>
        <FullCalendar
          plugins={[dayGridPlugin, interactionPlugin]}
          height={500}
          initialView="dayGridMonth"
          events={[...events, newBookingEvent]}
          selectable={true}
          eventResizableFromStart={true}
          selectOverlap={false}
          select={handleSelect}
          eventResize={handleResize}
          eventDrop={handleEventDrop}
          eventClick={handleEventClick}
          displayEventTime={false}
        />
      </Box>
    </>
  );
}

export default DatesSelector;
