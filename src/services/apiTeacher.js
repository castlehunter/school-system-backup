import supabase from "../config/supabaseClient.js";

export async function getTeachers() {
  const { data, error } = await supabase.from("Teachers").select(`
    *,
    Users (
      UserNo,
      UserName,
      FirstName,
      LastName,
      Email,
      HomeAddress,
      DateOfBirth,
      PhoneNumber
    )
  `);

  if (error) {
    console.error(error);
    throw new Error("Failed to load teachers");
  }

  return data;
}

export async function getTeacherByNo(userNo) {
  const { data, error } = await supabase
    .from("Teachers")
    .select(
      `*,
    Users (
      UserNo,
      UserID,
      UserName,
      FirstName,
      LastName,
      Email,
      HomeAddress,
      DateOfBirth,
      PhoneNumber,
      RoleID,
      Roles: Roles (
        RoleID,
        RoleName
      )
    )
  `
    )
    .eq("Users.UserNo", userNo)
    .single();

  if (error) {
    console.error(error);
    throw new Error("Failed to load teacher!!");
  }
  console.log("API getTeacherByNo", data);
  return data;
}

export async function getExistingTeacherNo() {
  try {
    const { data, error } = await supabase
      .from("Teachers")
      .select("TeacherNo")
      .order("TeacherNo", { ascending: false })
      .limit(1);

    if (error) {
      console.error(error);
      throw new Error("Failed to fetch existing TeacherNo!");
    }

    return data.length > 0 ? data[0].TeacherNo : 0;
  } catch (err) {
    console.error(err);
    throw new Error("Failed to fetch existing TeacherNo!");
  }
}
