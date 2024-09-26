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

export async function generateUserNo() {
  try {
    const { data, error } = await supabase
      .from("Users")
      .select("UserNo")
      .order("UserNo", { ascending: false })
      .limit(1);

    if (error) {
      console.error(error);
      throw new Error("Failed to fetch existing UserNo!");
    }

    const newUserNo = data.length > 0 ? data[0].UserNo + 1 : 1;

    console.log("Generated UserNo:", newUserNo);
    return newUserNo;
  } catch (err) {
    console.error(err);
    throw new Error("Failed to fetch existing UserNo!");
  }
}
