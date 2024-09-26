import supabase from "../config/supabaseClient.js";

export async function getTeachers() {
  const { data, error } = await supabase.from("Teachers").select(`
    *,
    Users (
      UserID,
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

export async function getTeacher({ params }) {
  const { teacherNo } = params;

  const { data, error } = await supabase
    .from("Teachers")
    .select(
      `
      *,
      Users (
        UserID,
        UserName,
        FirstName,
        LastName,
        Email,
        HomeAddress,
        DateOfBirth,
        PhoneNumber
      )
    `
    )
    .eq("TeacherNo", teacherNo)
    .single();

  console.log("api Data", data);
  if (error) {
    console.error(error);
    throw new Error("Failed to load teacher!!");
  }

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
