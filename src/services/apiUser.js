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

export async function getUserById(userNo) {
    const { data, error } = await supabase
      .from("Users")
      .select(`
        UserName,
        FirstName,
        LastName,
        Email,
        CreatedAt,
        HomeAddress,
        DateOfBirth,
        PhoneNumber
      `)
      .eq('id', userNo);
  
    console.log(data);
    if (error) {
      console.error(error);
      throw new Error("Failed to load student information");
    }
  
    return data;
  }
  