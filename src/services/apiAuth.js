import supabase, { supabaseUrl } from "./supabase";

export async function signUp({ fullName, email, password }) {
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: { fullName, avatar: "" },
    },
  });
  if (error) throw new Error("Failed to sign up: " + error.message);
  return data; // returns an object with a user and a session
}

/* supabase stores the user object in local storage */
export async function logIn({ email, password }) {
  let { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) throw new Error("Failed to log in: " + error.message);
  return data; // returns an object with a user and a session
}

/* this will check local storage for an active session */
export async function getCurrentUser() {
  const { data: session } = await supabase.auth.getSession();
  if (!session.session) return null;

  // the user info is also in local storage, but its safer to get it again from the database
  const { data, error } = await supabase.auth.getUser();
  if (error) throw new Error(error.message);
  return data?.user;
}

export async function logOut() {
  const { error } = await supabase.auth.signOut();
  if (error) throw new Error("Failed to log out: " + error.message);
}

export async function updateCurrentUser({ password, fullName, avatar }) {
  // Update user password OR name
  let updateData;
  if (password) updateData = { password };
  if (fullName) updateData = { data: { fullName } };
  const { data: updatedUser, error: updateError } = await supabase.auth.updateUser(updateData);
  if (updateError) throw new Error("Failed to update user data: " + updateError.message);
  if (!avatar) return updatedUser;

  // Upload avatar
  const fileName = `avatar-${updatedUser.user.id}-${Math.random()}`;
  const { error: fileUploadError } = await supabase.storage
    .from("avatars")
    .upload(fileName, avatar);
  if (fileUploadError) throw new Error("Failed to upload image: " + fileUploadError.message);

  // Update user avatar
  const { data, error: avatarUpdateError } = await supabase.auth.updateUser({
    data: { avatar: `${supabaseUrl}/storage/v1/object/public/avatars//${fileName}` },
  });
  if (avatarUpdateError)
    throw new Error("Failed to update user avatar: " + avatarUpdateError.message);

  return data;
}
