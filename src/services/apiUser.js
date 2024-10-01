import supabase from "../config/supabaseClient.js";

export async function getUsers() {
  const { data, error } = await supabase.from("Users").select(`
   UserNo,
   UserName,
   FirstName,
   LastName,
   Email,
   CreatedAt,
   HomeAddress,
   DateOfBirth,
   PhoneNumber,
   Roles(RoleName)
  `);

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

export async function getUserAllInfoById(userNo) {
  const { data: userData, error: userError } = await supabase
    .from("Users")
    .select(
      `
      UserName,
      PasswordHash,
      Roles(RoleName)
      Email,
      CreatedAt,
      IsAdmin,
      HomeAddress,
      DateOfBirth,
      PhoneNumber,
      FirstName,
      LastName,
      IsLockedOut,
      FailedPasswordAttempt,
      LastLoginDate,
      UserNo
    `
    )
    .eq("UserNo", userNo)
    .single();

  if (userError) {
    console.error(userError);
    throw new Error("Failed to load user information");
  }

  return { ...userData };
}

export async function getProfileInfoByNo(userNo) {
  const { data: userData, error: userError } = await supabase
    .from("Users")
    .select(
      `
      Email,
      HomeAddress,
      DateOfBirth,
      PhoneNumber,
      FirstName,
      LastName,
      UserNo
    `
    )
    .eq("UserNo", userNo)
    .single();

  if (userError) {
    console.error(userError);
    throw new Error("Failed to load user information");
  }

  return { ...userData };
}

export async function getSecurityInfoByNo(userNo) {
  const { data: userData, error: userError } = await supabase
    .from("Users")
    .select(`UserName, PasswordHash`)
    .eq("UserNo", userNo)
    .single();
  if (userError) {
    console.error(userError);
    throw new Error("Failed to load user information");
  }

  return { ...userData };
}

export async function getAccountInfoByNo(userNo) {
  const { data: userData, error: userError } = await supabase
    .from("Users")
    .select(
      `Roles(RoleName),
      CreatedAt,
      IsAdmin,
      IsLockedOut,
      FailedPasswordAttempt,
      LastLoginDate,
      UserNo`
    )
    .eq("UserNo", userNo)
    .single();
  console.log("API getAccountInfoByNo", userData);
  if (userError) {
    console.error(userError);
    throw new Error("Failed to load user information");
  }

  return userData;
}

export async function getRoleNameByNo(userNo) {
  const { data: roleData, error: roleError } = await supabase
    .from("Users")
    .select(`Roles(RoleName)`)
    .eq("UserNo", userNo)
    .single();

  console.log("API getRoleNameByNo", roleData);

  if (roleError) {
    console.error(roleError);
    throw new Error("Failed to load role information");
  }

  return roleData?.Roles?.RoleName || null;
}

// ============== This is a draft ============
export async function CreateUser(newUser) {
  try {
    // 1. Search Role table for RoleID
    const { data: roleData, error: roleError } = await supabase
      .from("Role")
      .select("RoleID")
      .eq("RoleName", newUser.RoleName)
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
        UserName: newUser.Username,
        PasswordHash: newUser.password,
        RoleID: roleID,
        Email: newUser.email,
        CreateAt: newUser.CreateAt,
        IsAdmin: newUser.isAdmin,
        HomeAddress: newUser.address,
        DateOfBirth: newUser.dob,
        PhoneNumber: newUser.phone,
        FirstName: newUser.firstName,
        LastName: newUser.lastName,
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

export async function UpdatePersonalInfo(userNo, userInfo) {
  try {
    const { data, error } = await supabase
      .from("Users")
      .update({
        FirstName: userInfo.FirstName,
        LastName: userInfo.LastName,
        Email: userInfo.Email,
        DateOfBirth: userInfo.DateOfBirth,
        PhoneNumber: userInfo.PhoneNumber,
        HomeAddress: userInfo.HomeAddress,
      })
      .eq("UserNo", userNo)
      .select();

    if (error) {
      console.error("Api update Error updating user data:", error);
      return null;
    } else {
      console.log("Api Returned data:", data);
      return data;
    }
  } catch (error) {
    console.error("api caught Unexpected error:", error);
    return null;
  }
}
