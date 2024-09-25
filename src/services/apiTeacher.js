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

  console.log(data);
  if (error) {
    console.error(error);
    throw new Error("Failed to load teachers");
  }

  return data;
}

export async function getTeacher({ params }) {
  const { ID } = params;

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
    .eq("TeacherID", ID)
    .single();

  if (error) {
    console.error(error);
    throw new Error("Failed to load teacher");
  }

  return data;
}
