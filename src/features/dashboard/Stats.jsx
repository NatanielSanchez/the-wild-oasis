import Stat from "./Stat";
import { HiOutlineBriefcase, HiOutlineChartBar } from "react-icons/hi";
import { HiOutlineBanknotes, HiOutlineCalendarDays } from "react-icons/hi2";
import { formatCurrency } from "../../utils/helpers";

function Stats({ bookings, confirmedStays, numDays, cabinCount }) {
  const numBookings = bookings.length;
  const sales = bookings.reduce((acc, cur) => acc + cur.totalPrice, 0);
  const numStays = confirmedStays.length;

  // number of checked in nights / all available nights per cabin (so the days filter * numCabins)
  const occupationRate =
    confirmedStays.reduce((acc, cur) => acc + cur.numNights, 0) / (numDays * cabinCount);

  return (
    <>
      <Stat icon={<HiOutlineBriefcase />} title="Bookings" value={numBookings} color="blue" />
      <Stat
        icon={<HiOutlineBanknotes />}
        title="Sales"
        value={formatCurrency(sales)}
        color="green"
      />
      <Stat icon={<HiOutlineCalendarDays />} title="Check ins" value={numStays} color="indigo" />
      <Stat
        icon={<HiOutlineChartBar />}
        title="Occupancy rate"
        value={Math.round(occupationRate * 100) + "%"}
        color="yellow"
      />
    </>
  );
}

export default Stats;
