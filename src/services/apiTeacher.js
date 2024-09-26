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
  const { teacherID } = params;

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
    .eq("TeacherID", teacherID)
    .single();

  if (error) {
    console.error(error);
    throw new Error("Failed to load teacher!!");
  }

  return data;
}

export async function addTeacher(newTeacher) {
  try {
    const { userData, userError } = await supabase
      .from("Users")
      .insert([
        {
          FirstName: newTeacher.FirstName,
          LastName: newTeacher.LastName,
          Email: newTeacher.Email,
          PhoneNumber: newTeacher.PhoneNumber,
        },
      ])
      .select();

    if (userError) {
      console.error(userError);
      throw new Error("Failed creating user");
    }

    const newUserID = userData[0].UserID;

    const { teacherData, teacherError } = await supabase
      .from("Teachers")
      .insert([
        {
          TeacherID: newTeacher.TeacherID,
          UserID: newUserID,
        },
      ]);

    if (teacherError) {
      console.error(teacherError);
      throw new Error("Failed creating teacher");
    }

    return teacherData;
  } catch (err) {
    console.error(err);
    throw new Error("Failed creating teacher");
  }
}
