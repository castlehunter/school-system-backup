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
    .eq("CourseNo", ID)
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

export async function updateCourse(courseNo, updatedData) {
  const { data, error } = await supabase
    .from("Courses")
    .update(updatedData)
    .eq("CourseNo", courseNo);

  if (error) {
    console.error(error.message);
    throw new Error("Failed to update course");
  }

  return data;
}

export async function addCourse(courseData) {
  const {
    CourseName,
    Description,
    TeacherID,
    ProgramID,
    StartDate,
    EndDate,
    Time,
  } = courseData;

  const { data, error } = await supabase.from("Courses").insert([
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

export async function getTeacherFullNameByCourseID(courseID) {
  // Step 1: Get course data by CourseID to retrieve TeacherID
  const { data: courseData, error: courseError } = await supabase
    .from("Courses")
    .select("TeacherID")
    .eq("CourseID", courseID)
    .single();

  if (courseError) {
    console.error("Error fetching course data:", courseError);
    throw new Error("Failed to fetch course data");
  }

  const teacherID = courseData.TeacherID;

  // Step 2: Get Teacher data by TeacherID to retrieve UserID
  const { data: teacherData, error: teacherError } = await supabase
    .from("Teachers")
    .select("UserID")
    .eq("TeacherID", teacherID)
    .single();

  if (teacherError) {
    console.error("Error fetching teacher data:", teacherError);
    throw new Error("Failed to fetch teacher data");
  }

  const userID = teacherData.UserID;

  // Step 3: Get User data by UserID to retrieve FullName
  const { data: userData, error: userError } = await supabase
    .from("Users")
    .select("FirstName, LastName")
    .eq("UserID", userID)
    .single();

  if (userError) {
    console.error("Error fetching user data:", userError);
    throw new Error("Failed to fetch user data");
  }

  // Construct the full name
  const fullName = `${userData.FirstName} ${userData.LastName}`;
  return fullName;
}
