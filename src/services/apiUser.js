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

// export async function generateUserNo() {
//   try {
//     const { data, error } = await supabase
//       .from("Users")
//       .select("UserNo")
//       .order("UserNo", { ascending: false })
//       .limit(1);

//     if (error) {
//       console.error(error);
//       throw new Error("Failed to fetch existing UserNo!");
//     }

//     const newUserNo = data.length > 0 ? data[0].UserNo + 1 : 1;

//     console.log("Generated UserNo:", newUserNo);
//     return newUserNo;
//   } catch (err) {
//     console.error(err);
//     throw new Error("Failed to fetch existing UserNo!");
//   }
// }

export async function getUserById(userNo) {
  const { data, error } = await supabase
    .from("Users")
    .select(
      `
        UserName,
        FirstName,
        LastName,
        Email,
        CreatedAt,
        HomeAddress,
        DateOfBirth,
        PhoneNumber,
        UserNo
      `
    )
    .eq("UserNo", userNo)
    .single();

  console.log(data);
  if (error) {
    console.error(error);
    throw new Error("Failed to load user information");
  }

  return data;
}

export async function createUser(formData) {
  try {
    // 1. Search Role table for role id
    const { data: roleData, error: roleError } = await supabase
      .from("Role")
      .select("RoleID")
      .eq("RoleName", formData.Role)
      .single();

    if (roleError) {
      console.error("Error fetching RoleID:", roleError);
      return;
    }

    const roleID = roleData?.RoleID;

    if (!roleID) {
      console.error("RoleID not found for the given RoleName.");
      return;
    }

    // 2. Insert User record
    const { data, error } = await supabase.from("Users").insert([
      {
        UserName: formData.Username,
        PasswordHash: formData.password,
        RoleID: roleID,
        Email: formData.email,
        CreateAt: formData.CreateAt,
        IsAdmin: formData.isAdmin,
        HomeAddress: formData.address,
        DateOfBirth: formData.dob,
        PhoneNumber: formData.phone,
        FirstName: formData.firstName,
        LastName: formData.lastName,
      },
    ]);

    if (error) {
      console.error("Error uploading data:", error);
    } else {
      console.log("User created successfully:", data);
    }
  } catch (error) {
    console.error("Unexpected error:", error);
  }
}
