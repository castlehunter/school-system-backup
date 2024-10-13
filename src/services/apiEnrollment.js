import supabase from "../config/supabaseClient.js";

export async function getEnrollmentList() {
    const { data, error } = await supabase
    .from("Enrollments")
    .select(`
      *,
      Students (
        StudentID,
        UserID,
        Users (
          UserID,
          FirstName,
          LastName
        )
      ),
      Courses (
        CourseID,
        CourseName
      )
    `);
  console.log('data  ' + JSON.stringify(data));
  if (error) {
    console.error("Error fetching enrollments:", error);
  } else {
    console.log("Enrollments with student and course names:", data);
  }
  return data;
}
