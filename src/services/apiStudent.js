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
