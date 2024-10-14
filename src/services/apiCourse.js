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

  const { data: userData, error: userError } = await supabase
    .from("Users")
    .select("UserID, UserName, FirstName, LastName, Email")
    .eq("UserID", userID)
    .single();

  if (userError) {
    console.error(userError);
    throw new Error("Failed to load user data");
  }

  const fullCourseData = {
    ...courseData,
    TeacherUser: userData,
  };

  return fullCourseData;
}




export async function deleteCourse(courseID) {
  const { error } = await supabase
    .from("Courses")
    .delete()
    .eq("CourseID", courseID);

  if (error) {
    throw new Error("Failed to delete course: " + error.message);
  }
}
  

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
  const { CourseName, Description, TeacherID, ProgramID, StartDate, EndDate, Time } = courseData;

  const { data, error } = await supabase
    .from("Courses")
    .insert([
      {
        CourseName,
        Description,
        TeacherID, 
        ProgramID, 
        StartDate: StartDate || null, 
        Time: Time || null,
        EndDate: EndDate || null, 
      },
    ]);

  if (error) {
    console.error("Error adding course:", error);
    throw new Error("Failed to add course");
  }

  return data;
}

  
  
  