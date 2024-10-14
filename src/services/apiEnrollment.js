import supabase from "../config/supabaseClient.js";

export async function getEnrollments() {
  const { data, error } = await supabase.from("Enrollments").select(`
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
  console.log("data  " + JSON.stringify(data));
  if (error) {
    console.error("Error fetching enrollments:", error);
  } else {
    console.log("Enrollments with student and course names:", data);
  }
  return data;
}



export async function insertEnrollment(studentId, courseId, enrollmentDate, isFinished) {
  const { data, error } = await supabase
    .from("Enrollments")
    .insert([
      { 
        StudentID: studentId,
        CourseID: courseId,
        EnrollmentDate: enrollmentDate, // Add enrollment date
        isFinished: isFinished // Add isFinished boolean
      },
    ]);

  if (error) {
    throw new Error("Error inserting enrollment: " + error.message);
  }
  return data;
}
