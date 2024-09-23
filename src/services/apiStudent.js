import supabase from "../config/supabaseClient";

// This code is for testing only. Uncomment to see the effect of the student list page.
export async function getStudents() {
  try {
    const response = await fetch("/data/students.json");
    if (!response.ok) {
      throw new Error("Failed to fetch student data");
    }
    const data = await response.json();
    console.log(data);
    return data;
  } catch (error) {
    console.error("Error fetching student data:", error);
    return [];
  }
  // throw new Error("Failed to load student list");
}

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
