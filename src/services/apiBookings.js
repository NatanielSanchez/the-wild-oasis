import supabase from "./supabase";
import { getToday } from "../utils/helpers";
import { PAGE_SIZE } from "../utils/constants";

export async function createBooking(newBooking) {
  const { data: booking, error } = await supabase
    .from("bookings")
    .insert([newBooking])
    .select()
    .single();
  if (error) {
    console.error(error);
    throw new Error("Booking not created: " + error.message);
  }
  console.log(booking);
  return booking;
}

/*
eq: equal =
gte: greater thatn or equal >=
order: for sorting the data
*/
export async function getBookings({ filters, sortBy, page }) {
  /* 
  -join the tables, getting only whats needed from the foreign tables, forcing an INNER join for the guests so the filters work as they should ffs stop sending me nulls!
  -also get the result count
  */
  let query = supabase.from("bookings").select(
    `
    id,
    created_at,
    startDate,
    endDate,
    numNights,
    numGuests,
    totalPrice,
    status,
    cabins(name),
    guests:guests!guestId!inner(fullName, email)
    `,
    { count: "exact" }
  );

  // could also pass a different method, like gte (greater thatn or equal)
  // if (filter) query = query[filter.method || "eq"](filter.field, filter.value);
  if (filters.length !== 0)
    filters.forEach((filter) => {
      query = query[filter.method || "eq"](filter.field, filter.value);
    });

  if (sortBy)
    query = query.order(sortBy.field, {
      ascending: sortBy.direction === "asc",
    });

  if (page) {
    const from = (page - 1) * PAGE_SIZE;
    const to = page * PAGE_SIZE - 1;
    query = query.range(from, to);
  }

  const { data, error, count } = await query;
  if (error) {
    console.error(error);
    throw new Error("Bookings not loaded: " + error.message);
  }
  return { data, count };
}

export async function getBooking(id) {
  const { data, error } = await supabase
    .from("bookings")
    .select("*, cabins(*), guests(*)")
    .eq("id", id)
    .single();

  if (error) {
    console.error(error);
    throw new Error("Booking not found");
  }

  return data;
}

export async function getBookingsByCabinId(cabinId) {
  if (!cabinId) return null;
  const { data, error } = await supabase
    .from("bookings")
    .select("id, startDate, endDate, status")
    .eq("cabinId", cabinId);

  if (error) {
    console.error(error);
    throw new Error("Bookings for cabin ID: " + cabinId + "not found");
  }

  return data;
}

// export async function getBookingsByGuestId(guestId) {
//   if (!guestId) return null;
//   const { data, error } = await supabase
//     .from("bookings")
//     .select("id, startDate, endDate, status")
//     .eq("guestId", guestId);

//   if (error) {
//     console.error(error);
//     throw new Error("Bookings for guest ID: " + guestId + "not found");
//   }

//   return data;
// }

// Returns all BOOKINGS that were created after the given date. Useful to get bookings created in the last 30 days, for example.
// date has to be an ISOString
export async function getBookingsAfterDate(date) {
  const { data, error } = await supabase
    .from("bookings")
    .select("created_at, totalPrice, extrasPrice")
    .gte("created_at", date)
    .lte("created_at", getToday({ end: true }));

  if (error) {
    console.error(error);
    throw new Error("Bookings could not get loaded: " + error.message);
  }

  return data;
}

// Returns all STAYS that are were created after the given date
export async function getStaysAfterDate(date) {
  const { data, error } = await supabase
    .from("bookings")
    // .select('*')
    .select("*, guests(fullName)")
    .gte("startDate", date)
    .lte("startDate", getToday());

  if (error) {
    console.error(error);
    throw new Error("Bookings could not get loaded");
  }

  return data;
}

// Activity means that there is a check in or a check out today
export async function getStaysTodayActivity() {
  const { data, error } = await supabase
    .from("bookings")
    .select("*, guests(fullName, nationality, countryFlag)")
    .or(
      `and(status.eq.unconfirmed,startDate.eq.${getToday()}),and(status.eq.checked-in,endDate.eq.${getToday()})`
    )
    .order("created_at");

  // Equivalent to this. But by doing the above query, we only download the data we actually need
  // (stay.status === 'unconfirmed' && isToday(new Date(stay.startDate))) ||
  // (stay.status === 'checked-in' && isToday(new Date(stay.endDate)))

  if (error) {
    console.error(error);
    throw new Error("Bookings could not get loaded");
  }
  return data;
}

export async function updateBooking(id, obj) {
  const { data, error } = await supabase
    .from("bookings")
    .update(obj)
    .eq("id", id)
    .select()
    .single();

  if (error) {
    console.error(error);
    throw new Error("Booking could not be updated");
  }
  return data;
}

export async function deleteBooking(id) {
  // CHECK RLS POLICIES
  const { error } = await supabase.from("bookings").delete().eq("id", id);

  if (error) {
    console.error(error);
    throw new Error("Booking could not be deleted");
  }
}
