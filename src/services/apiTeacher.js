import supabase from "../config/supabaseClient.js";

export async function getTeachers() {
  const { data, error } = await supabase.from("Teachers").select(`
    *,
    Users (
      UserNo,
      UserName,
      FirstName,
      LastName,
      Email,
      HomeAddress,
      DateOfBirth,
      PhoneNumber
    )
  `);

  if (error) {
    console.error(error);
    throw new Error("Failed to load teachers");
  }

  return data;
}

export async function getTeacherByNo(userNo) {
  const { data, error } = await supabase
    .from("Teachers")
    .select(
      `*,
    Users (
      UserNo,
      UserID,
      UserName,
      FirstName,
      LastName,
      Email,
      HomeAddress,
      DateOfBirth,
      PhoneNumber,
      RoleID,
      Roles: Roles (
        RoleID,
        RoleName
      )
    )
  `
    )
    .eq("Users.UserNo", userNo)
    .single();

  if (error) {
    console.error(error);
    throw new Error("Failed to load teacher!!");
  }
  console.log("API getTeacherByNo", data);
  return data;
}

export async function getExistingTeacherNo() {
  try {
    const { data, error } = await supabase
      .from("Teachers")
      .select("TeacherNo")
      .order("TeacherNo", { ascending: false })
      .limit(1);

    if (error) {
      console.error(error);
      throw new Error("Failed to fetch existing TeacherNo!");
    }

    return data.length > 0 ? data[0].TeacherNo : 0;
  } catch (err) {
    console.error(err);
    throw new Error("Failed to fetch existing TeacherNo!");
  }
}

export async function getTeacherCoursesByUserID(userID) {
  try {
    const { data: teacherData, error: teacherError } = await supabase
      .from("Teachers")
      .select("TeacherID")
      .eq("UserID", userID)
      .single();

    if (teacherError) {
      console.error("Error retrieving TeacherID:", teacherError);
      throw new Error("Failed to load TeacherID");
    }

    const teacherID = teacherData.TeacherID;

    const { data: coursesData, error: coursesError } = await supabase
      .from("Courses")
      .select("*")
      .eq("TeacherID", teacherID);

    if (coursesError) {
      console.error("Error retrieving teacher's courses:", coursesError);
      throw new Error("Failed to load teacher's courses");
    }

    return coursesData;
  } catch (error) {
    console.error(error.message);
    throw error;
  }
}

// get teacher's courses by userID
export async function getTeacherCourses(userNo) {
  try {
    // get userID
    const { data: userData, error: userError } = await supabase
      .from("Users")
      .select("UserID")
      .eq("UserNo", userNo)
      .single();
    if (userError) {
      console.error("Failed to fetch user:", userError);
      throw userError;
    }
    const userID = userData.UserID;

    // get teacherID
    const { data: teacherData, error: teacherError } = await supabase
      .from("Teachers")
      .select("TeacherID")
      .eq("UserID", userID)
      .single();
    if (teacherError) {
      console.error("Error retrieving TeacherID:", teacherError);
      throw new Error("Failed to load TeacherID");
    }
    const teacherID = teacherData.TeacherID;

    // get courses
    const { data: coursesData, error: coursesError } = await supabase
      .from("Courses")
      .select("*")
      .eq("TeacherID", teacherID);
    if (coursesError) {
      console.error("Error fetching courses:", coursesError);
      throw new Error("Failed to fetch courses");
    }
    return coursesData;
  } catch (error) {
    console.error(error.message);
    throw error;
  }
}

export async function addCourseToTeacher(courseData) {
  const { CourseID, TeacherID } = courseData;

  if (!CourseID || !TeacherID) {
    throw new Error('CourseID and TeacherID are required');
  }

  try {
    const { data, error } = await supabase
      .from("TeacherCourses")
      .insert({ CourseID, TeacherID });

    if (error) {
      console.error('Error adding teacher to course:', error);
      throw new Error('Failed to add teacher to course');
    }

    return { success: true, message: 'Teacher added to course successfully', data };
  } catch (error) {
    console.error('Error adding teacher to course:', error);
    throw new Error('Failed to add teacher to course');
  }
}

export async function sortTeachersBy(fieldName = "UserNo", ascending = true) {
  try {
    // Define valid fields for sorting to prevent SQL injection
    const validFields = [
      "UserNo",
      "UserName",
      "FirstName",
      "LastName",
      "Email",
      "HomeAddress",
      "DateOfBirth",
      "PhoneNumber",
    ];

    // Validate that fieldName is one of the valid fields
    if (!validFields.includes(fieldName)) {
      throw new Error(`Invalid field name for sorting: ${fieldName}`);
    }

    // Fetch sorted teacher data
    const { data, error } = await supabase
      .from("Teachers")
      .select(
        `
        *,
        Users (
          UserNo,
          UserName,
          FirstName,
          LastName,
          Email,
          HomeAddress,
          DateOfBirth,
          PhoneNumber
        )
      `
      )
      .order(`Users.${fieldName}`, { ascending }); // Order by field in Users table

    if (error) {
      console.error("Error fetching sorted teachers:", error);
      throw new Error("Failed to load sorted teachers");
    }

    console.log("Sorted Teachers:", data);
    return data;
  } catch (error) {
    console.error("Unexpected error in sortTeachersBy:", error);
    throw error;
  }
}
