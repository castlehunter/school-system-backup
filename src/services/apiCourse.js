import supabase from "../config/supabaseClient.js";

export async function getCourses() {
  const { data, error } = await supabase.from("Courses").select(`
    *
  `);

  console.log(data);
  if (error) {
    console.error(error);
    throw new Error("Failed to load courses");
  }

  return data;
}



export async function getCourseDetail({ params }) {
  const { ID } = params;

  // Step 1: Fetch course data, including the TeacherID
  const { data: courseData, error: courseError } = await supabase
    .from("Courses")
    .select(
      `
      *,
      Programs (
        ProgramID,
        ProgramName,
        ProgramCode
      ),  Teachers(
        TeacherID
      )
    `
    )
    .eq("CourseID", ID)
    .single();

  if (courseError) {
    console.error(courseError);
    throw new Error("Failed to load course");
  }

  // Step 2: Use TeacherID from the course to query the UserID from Teachers table
  const { data: teacherData, error: teacherError } = await supabase
    .from("Teachers")
    .select("UserID")
    .eq("TeacherID", courseData.Teachers.TeacherID)
    .single();

  if (teacherError) {
    console.error(teacherError);
    throw new Error("Failed to load teacher data");
  }

  const userID = teacherData.UserID;

  // Step 3: Use UserID to fetch the user details from the Users table
  const { data: userData, error: userError } = await supabase
    .from("Users")
    .select("UserID, UserName, FirstName, LastName, Email")
    .eq("UserID", userID)
    .single();

  if (userError) {
    console.error(userError);
    throw new Error("Failed to load user data");
  }

  // Combine course data with the teacher's user data
  const fullCourseData = {
    ...courseData,
    TeacherUser: userData, // Adding the user data to the course data
  };

  return fullCourseData;
}

// export async function getCourseDetail({ params }) {
//   const { ID } = params;
  
//   console.log("Fetching course details for ID:", ID);

//   const { data: courseData, error: courseError } = await supabase
//     .from("Courses")
//     .select(`*`)
//     .eq("CourseID", ID)
//     .single();

  
//   const fullCourseData = {
//     ...courseData,
//   };

//   return fullCourseData;
// }




export async function deleteCourse(courseID) {
  const { error } = await supabase
    .from("Courses")
    .delete()
    .eq("CourseID", courseID);

  if (error) {
    throw new Error("Failed to delete course: " + error.message);
  }
}
  

  // In your api/courses.js file
  export async function updateCourse(courseID, updatedData) {
    const { data, error } = await supabase
      .from("Courses")
      .update(updatedData)
      .eq("CourseID", courseID);
  
    if (error) {
      console.error(error.message);
      throw new Error("Failed to update course");
    }
  
    return data;
  }





export async function addCourse(courseData) {
  // Destructure the necessary fields from courseData
  const { CourseName, Description, TeacherID, ProgramID, StartDate, EndDate, Time } = courseData;

  // Use Supabase to insert the new course
  const { data, error } = await supabase
    .from("Courses")
    .insert([
      {
        CourseName,
        Description,
        TeacherID, // Ensure this is a valid UUID
        ProgramID, // Ensure this is a valid UUID
        StartDate: StartDate || null, // Set to null if not provided
        Time: Time || null,
        EndDate: EndDate || null, // Set to null if not provided
      },
    ]);

  // Check for errors and handle them
  if (error) {
    console.error("Error adding course:", error);
    throw new Error("Failed to add course");
  }

  // Return the newly added course data
  return data;
}

  
  
  