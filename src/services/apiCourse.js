import supabase from "../config/supabaseClient.js";

export async function getCourses() {
  const { data, error } = await supabase.from("Courses").select(`
    *,
    Programs (
        ProgramID,
        ProgramName,
        ProgramCode
      ), Sections (
        SectionID,
        SectionName
      ), Teachers(
        TeacherID, UserID, StartDate, EnrollmentID
      )
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
        ), Sections (
          SectionID,
          SectionName
        ), Teachers(
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
      .select("FirstName, LastName, Email")
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



  export async function deleteCourse({ params }) {
    const { ID } = params;  
  
    const { data, error } = await supabase
      .from("Courses") 
      .delete()
      .eq("CourseID", ID); 

    if (error) {
      console.error("Error deleting course:", error);
      throw new Error("Failed to delete course");
    }
  
    return {
      message: `Course successfully deleted.`,
      data,
    };
  }
  

  export async function updateCourse({ params, courseDetails }) {
    const { ID } = params; 
    const { CourseName, Description, TeacherID, ProgramID, CourseNumber } = courseDetails; 
  
    const { data, error } = await supabase
      .from("Courses") 
      .update({
        CourseName: CourseName,
        Description: Description,
        TeacherID: TeacherID,
        ProgramID: ProgramID,
        CourseNumber: CourseNumber,
      })
      .eq("CourseID", ID); 
  
    if (error) {
      console.error("Error updating course:", error);
      throw new Error("Failed to update course");
    }
  
    return {
      message: `Course with ID ${ID} was successfully updated.`,
      updatedCourse: data,
    };
  }



  export async function createCourse(courseDetails) {
    const { CourseName, Description, TeacherID, ProgramID, CourseNumber } = courseDetails;
  
    const { data, error } = await supabase
      .from("Courses") 
      .insert([
        {
          CourseName: CourseName,
          Description: Description,
          TeacherID: TeacherID,
          ProgramID: ProgramID,
          CourseNumber: CourseNumber,
        },
      ]);
  
    if (error) {
      console.error("Error creating course:", error);
      throw new Error("Failed to create course");
    }
  
    return {
      message: "Course successfully created.",
      newCourse: data,
    };
  }
  