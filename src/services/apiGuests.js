import { PAGE_SIZE } from "../utils/constants";
import supabase from "./supabase";

export async function getGuests({ filters, sortBy, page }) {
  let query = supabase.from("guests").select("*", { count: "exact" });

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

  let { data: guests, error, count } = await query;
  if (error) throw new Error("Failed to load guests: " + error.message);

  return { guests, count };
}

export async function getGuestByNationalId(id) {
  if (!id) return null;
  let { data: guest, error } = await supabase
    .from("guests")
    .select("*")
    .eq("nationalId", id)
    .single();
  if (error) throw new Error("Failed to fetch guest with national ID " + id + ": " + error.message);
  return guest;
}

export async function createGuest(guest) {
  const { data: newGuest, error } = await supabase.from("guests").insert([guest]).select().single();
  if (error) throw new Error("Failed to create new guest: " + error.message);
  return newGuest;
}
