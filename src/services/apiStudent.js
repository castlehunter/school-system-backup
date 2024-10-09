import supabase from "../config/supabaseClient.js";

export async function getStudents() {
  const { data, error } = await supabase.from("Students").select(`
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
    throw new Error("Failed to load students");
  }

  return data;
}

// adding a student
export async function addStudent(student) {
  const { data, error } = await supabase.from("Students").insert([student]);

  if (error) {
    handleError(error, "Failed to add student");
  }

  return data;
}

// updating a student
export async function updateStudent(studentNo, updatedData) {
  const { data, error } = await supabase
    .from("Students")
    .update(updatedData)
    .eq("StudentNo", studentNo);

  if (error) {
    handleError(error, "Failed to update student");
  }

  return data;
}

// deleting a student
export async function deleteStudent(studentNo) {
  const { data, error } = await supabase
    .from("Students")
    .delete()
    .eq("StudentNo", studentNo);

  if (error) {
    handleError(error, "Failed to delete student");
  }

  return data;
}

// get student by student number
export async function getStudentByStudentNo(studentNo) {
  const { data, error } = await supabase
    .from("Students")
    .select("*")
    .eq("StudentNo", studentNo)
    .single();

  if (error) {
    handleError(error, "Failed to get student");
  }

  return data;
}

// error handling
function handleError(error, message) {
  console.error(error);
  throw new Error(message);
}
