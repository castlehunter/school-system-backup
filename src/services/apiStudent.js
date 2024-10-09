import supabase from "../config/supabaseClient.js";

// This code is for testing only. Uncomment to see the effect of the student list page.
// export async function getStudents() {
//   try {
//     const response = await fetch("/data/students.json");
//     if (!response.ok) {
//       throw new Error("Failed to fetch student data");
//     }
//     const data = await response.json();
//     console.log(data);
//     return data;
//   } catch (error) {
//     console.error("Error fetching student data:", error);
//     return [];
//   }
//   // throw new Error("Failed to load student list");
// }

// Supabase example
// export async function supabaseExample() {
//   try {
//     const { data, error } = await supabase.from("students").select("*");

//     if (error) {
//       throw new Error("Failed to fetch student data: " + error.message);
//     }

//     console.log(data);
//     return data;
//   } catch (error) {
//     console.error("Error fetching student data:", error);
//     return [];
//   }
// }

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
    ),
    Programs (
      ProgramName
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
export async function updateStudent(StudentNo, updatedData) {
  const { data, error } = await supabase
    .from("Students")
    .update(updatedData)
    .eq("StudentNo", StudentNo);

  if (error) {
    console.error("Failed to update student:", error);
    throw error;
  }

  return data;
}

// deleting a student
export async function deleteStudent(StudentNo) {
  const { data, error } = await supabase
    .from("Students")
    .delete()
    .eq("StudentNo", StudentNo);

  if (error) {
    handleError(error, "Failed to delete student");
  }

  return data;
}

// get student by student number
export async function getStudentByStudentNo(StudentNo) {
  const { data, error } = await supabase
    .from("Students")
    .select("*")
    .eq("StudentNo", StudentNo)
    .single();

  if (error) {
    console.error("Failed to fetch student:", error);
    throw error;
  }

  return data;
}

// error handling
function handleError(error, message) {
  console.error(error);
  throw new Error(message);
}
