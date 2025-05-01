import supabase, { supabaseUrl } from "./supabase";

export async function getCabins() {
  let { data: cabins, error } = await supabase.from("cabins").select("*");
  if (error) {
    console.error(error);
    throw new Error("Failed to load cabins: " + error.message);
  } else return cabins;
}

export async function getCabinById(id) {
  if (!id) return null;
  let { data: cabin, error } = await supabase.from("cabins").select("*").eq("id", id).single();
  if (error) {
    console.error(error);
    throw new Error("Failed to load cabin ID " + id + ": " + error.message);
  } else return cabin;
}

/* Creates AND edits cabins */
export async function createEditCabin(newCabin, id) {
  let query = supabase.from("cabins");

  // build the image Url
  const hasImageUrl = newCabin.image?.startsWith?.(supabaseUrl);
  const imageName = `${Math.random()}-${newCabin.image.name}`.replaceAll("/", "");
  const imageUrl = hasImageUrl
    ? newCabin.image
    : `${supabaseUrl}/storage/v1/object/public/cabin-images//${imageName}`;

  // POST a cabin: the object goes into an ARRAY!
  if (!id) query = query.insert([{ ...newCabin, image: imageUrl }]);
  // UPDATE a cabin: the object doesnt go into an array!
  if (id) query = query.update({ ...newCabin, image: imageUrl }).eq("id", id);

  const { data: cabin, error: cabinError } = await query.select().single();
  if (cabinError) {
    console.error(cabinError);
    throw new Error("Failed to add new cabin: " + cabinError.message);
  }

  // upload the actual image to supabase bucket...
  if (hasImageUrl) return cabin;

  const { error: imageStorageError } = await supabase.storage
    .from("cabin-images")
    .upload(imageName, newCabin.image);
  if (imageStorageError) {
    console.error(imageStorageError);
    await supabase.from("cabins").delete().eq("id", cabin.id);
    throw new Error(
      "Failed to add new image to bucket. Cabin not created. " + imageStorageError.message
    );
  }
  return cabin;
}

export async function deleteCabin(id) {
  const { error } = await supabase.from("cabins").delete().eq("id", id);
  if (error) {
    console.error(error);
    throw new Error("Failed to delete cabin with ID " + id + ": " + error.message);
  }
}
