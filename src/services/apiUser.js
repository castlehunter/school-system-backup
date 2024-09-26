import supabase from "../config/supabaseClient.js";

export async function getUsers() {
  const { data, error } = await supabase.from("Users").select(`
   UserName,
   FirstName,
   LastName,
   Email,
   CreatedAt,
   HomeAddress,
   DateOfBirth,
   PhoneNumber
  `);

  console.log(data);
  if (error) {
    console.error(error);
    throw new Error("Failed to load users");
  }

  return data;
}