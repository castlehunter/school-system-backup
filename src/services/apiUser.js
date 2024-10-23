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
      `Roles(RoleName),
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

  console.log("API getProfileInfoByNo", userData);
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

export async function getFullNameByNo(userNo) {
  const { data: fullNameData, error: err } = await supabase
    .from("Users")
    .select(
      `FirstName,
      LastName`
    )
    .eq("UserNo", userNo)
    .single();

  if (err) {
    console.error(err);
    throw new Error("Failed to load full name information");
  }

  return fullNameData
    ? `${fullNameData.FirstName} ${fullNameData.LastName}`.trim()
    : null;
}

// ============== This is a draft ============
export async function CreateUser(newUser) {
  try {
    // 1. Search Role table for RoleID

    const { data: roleData, error: roleError } = await supabase
      .from("Roles")
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

    // 2. Search School table for SchoolID

    const { data: schoolData, error: schoolError } = await supabase
      .from("School")
      .select("SchoolID")
      .eq("SchoolNo", 1) // *temporary searching the school by no. and we only have 1 school for test
      .single();

    if (schoolError) {
      console.error("Error fetching SchoolID", schoolError);
      return;
    }

    const schoolID = schoolData?.SchoolID;

    if (!schoolID) {
      console.error("SchoolID not found for the given School number.");
      return;
    }

    // 3. Insert User record
    const { data, error } = await supabase.from("Users").insert([
      {
        UserName: newUser.Username,
        PasswordHash: newUser.password,
        RoleID: roleID,
        Email: newUser.email,
        CreatedAt: newUser.CreateAt,
        IsAdmin: newUser.isAdmin,
        SchoolID: schoolID,
        HomeAddress: newUser.address,
        DateOfBirth: newUser.dob,
        PhoneNumber: newUser.phone,
        FirstName: newUser.firstName,
        LastName: newUser.lastName,
        SecurityQuestion: newUser.SecurityQuestion,
        SecurityAnswer: newUser.SecurityAnswer,
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

//function to create multiplt users
export async function CreateMultipleUsers(excelData) {
  
  if (excelData.length > 0)
  {
    const {data, error} = await supabase
      .from("Users")
      .insert(excelData);
  

  if(error) {
    console.error("Error inserting dat:", error)
  }
  else{
    console.log("data inserted successfully", data)
  }
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

export async function updatePassword(username, currentPassword, newPassword) {
  try {
    const { data: userData, error: fetchError } = await supabase
      .from("Users")
      .select("PasswordHash")
      .eq("UserName", username)
      .single();

    if (fetchError) {
      throw new Error("Failed to fetch user: " + fetchError.message);
    }

    if (currentPassword !== userData.PasswordHash) {
      throw new Error("Current password is incorrect.");
    }

    // const newPasswordHash = await hashPassword(newPassword);
    const newPasswordHash = newPassword;
    const { data, error } = await supabase
      .from("Users")
      .update({ PasswordHash: newPasswordHash })
      .eq("UserName", username);

    if (error) {
      throw new Error("Failed to update password: " + error.message);
    }

    return data;
  } catch (error) {
    console.error("Error updating password:", error);
    throw error;
  }
}
