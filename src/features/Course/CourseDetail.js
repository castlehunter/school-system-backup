import Container from "../../ui/Layout/Container";
import generalStyles from "../../generalStyles.module.css";
import EditCourseForm from "../../components/Form/EditCourseForm";
import styles from "../Profile.module.css";
import { useParams, useNavigate } from "react-router-dom";
import React, { useEffect, useState } from "react";
import Loader from "../../ui/Loader";
import EditContainer from "../../ui/Layout/EditContainer";
import {
  getCourseDetail,
  deleteCourse,
  updateCourse,
} from "../../services/apiCourse";
import Button from "../../components/Button/Button";
import { getTeachers } from "../../services/apiTeacher";
import formStyles from "../../components/Form/Form.module.css";

function CourseDetail() {
  const { courseNo, courseName } = useParams(); // Extract both courseNo and courseName
  const navigate = useNavigate();
  const [course, setCourse] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [teachers, setTeachers] = useState([]);

  useEffect(() => {
    async function fetchData() {
      try {
        const teacherData = await getTeachers();
        setTeachers(teacherData);
      } catch (error) {
        console.error("Failed to fetch teachers:", error);
      }
    }
    fetchData();
  }, []);

  useEffect(() => {
    async function fetchCourseDetails() {
      try {
        setIsLoading(true);
        setError(null);
        // Fetch course data using courseNo
        const courseData = await getCourseDetail({ params: { ID: courseNo } });
        setCourse(courseData);
      } catch (err) {
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    }
    fetchCourseDetails();
  }, [courseNo]);

  const handleDeleteCourse = async () => {
    try {
      await deleteCourse(courseNo);
      alert("Course deleted successfully!");
      navigate("/courses/course-list");
    } catch (err) {
      alert("Failed to delete the course: " + err.message);
    }
  };

  const handleBack = () => {
    navigate("/courses/course-list");
  };

  const handleCancelEdit = () => {
    setIsEditing(false);
  };

  // const handleEditCourse = async (updatedCourse) => {
  //   try {
  //     await updateCourse(courseNo, updatedCourse);
  //     alert("Course updated successfully!");
  //     setIsEditing(false);
  //     const courseData = await getCourseDetail({ params: { ID: courseNo } });
  //     setCourse(courseData);
  //   } catch (err) {
  //     alert("Failed to update course: " + err.message);
  //   }
  // };

  async function handleClickSave() {
    try {
      const res = await updateCourse(courseNo, course);
      setIsEditing(false);
      if (res) {
        alert("User information updated successfully!");

        console.log("User updated successfully!", res);
      } else {
        alert("Failed to update user information.");
        console.error("Failed to update user information.");
      }
    } catch (error) {
      console.error("Error saving user data:", error);
      alert("An error occurred while saving the user data.");
    }
  }

  function handleEditBtn(e) {
    e.preventDefault();
    setIsEditing((prev) => !prev);
  }

  function handleChange(e) {
    const { name, value } = e.target;
    const updatedCourse = {
      ...course,
      [name]: value,
      Programs: {
        ...course.Programs,
        [name]: value,
      },
    };
    setCourse(updatedCourse);
  }

  if (isLoading) {
    return <Loader />;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div>
      {course ? (
        <EditContainer
          title="Course Details"
          isEdit={isEditing}
          onClickEdit={handleEditBtn}
          onClickSave={handleClickSave}
          onClickCancel={handleCancelEdit}
          headingType="primaryHeading"
        >
          <div className={formStyles.sectionLayout}>
            <form>
              <div className={formStyles.formRow}>
                <div className={formStyles.formItem}>
                  <label htmlFor="courseID" className={formStyles.formLabel}>
                    Course ID
                  </label>
                  <input
                    type="text"
                    id="courseID"
                    name="CourseID"
                    className={formStyles.formInput}
                    readOnly
                    disabled
                    value={course.CourseID}
                  />
                </div>
              </div>

              <div className={formStyles.formRow}>
                <div className={formStyles.formItem}>
                  <label htmlFor="courseName" className={formStyles.formLabel}>
                    Course Name
                  </label>
                  <input
                    type="text"
                    id="courseName"
                    name="CourseName"
                    className={formStyles.formInput}
                    disabled={!isEditing}
                    value={course.CourseName}
                    onChange={handleChange}
                  />
                </div>
                <div className={formStyles.formItem}>
                  <label htmlFor="description" className={formStyles.formLabel}>
                    Course Description
                  </label>
                  <input
                    type="text"
                    id="description"
                    name="Description"
                    className={formStyles.formInput}
                    disabled={!isEditing}
                    value={course.Description}
                    onChange={handleChange}
                  />
                </div>
              </div>

              <div className={formStyles.formRow}>
                <div className={formStyles.formItem}>
                  <label htmlFor="startDate" className={formStyles.formLabel}>
                    Start Date
                  </label>
                  <input
                    type="date"
                    id="startDate"
                    name="StartDate"
                    className={formStyles.formInput}
                    disabled={!isEditing}
                    value={course.StartDate}
                    onChange={handleChange}
                  />
                </div>
                <div className={formStyles.formItem}>
                  <label htmlFor="endDate" className={formStyles.formLabel}>
                    End Date
                  </label>
                  <input
                    type="date"
                    id="endDate"
                    name="EndDate"
                    className={formStyles.formInput}
                    disabled={!isEditing}
                    value={course.EndDate}
                    onChange={handleChange}
                  />
                </div>
              </div>

              <div className={formStyles.formRow}>
                <div className={formStyles.formItem}>
                  <label htmlFor="teacherName" className={formStyles.formLabel}>
                    Teacher Name
                  </label>
                  {isEditing ? (
                    teachers && teachers.length > 0 ? (
                      <select
                        value={course.TeacherID}
                        // onChange={(e) => setTeacherID(e.target.value)}
                        name="TeacherID"
                        onChange={handleChange}
                        required
                        className={formStyles.formInput}
                      >
                        {teachers.map((teacher) => (
                          <option
                            key={teacher.TeacherID}
                            value={teacher.TeacherID}
                          >
                            {teacher.Users.FirstName} {teacher.Users.LastName}
                          </option>
                        ))}
                      </select>
                    ) : (
                      <p>No teachers found or loading...</p>
                    )
                  ) : (
                    <input
                      type="text"
                      id="teacherName"
                      name="TeacherName"
                      className={formStyles.formInput}
                      disabled={!isEditing}
                      value={`${course.TeacherUser.FirstName} ${course.TeacherUser.LastName}`}
                    />
                  )}
                </div>
                <div className={formStyles.formItem}>
                  <label htmlFor="courseTime" className={formStyles.formLabel}>
                    Course Time
                  </label>
                  <input
                    type="text"
                    id="courseTime"
                    name="Time"
                    className={formStyles.formInput}
                    disabled={!isEditing}
                    value={course.Time}
                    onChange={handleChange}
                  />
                </div>
              </div>

              <div className={formStyles.formRow}>
                <div className={formStyles.formItem}>
                  <label htmlFor="programName" className={formStyles.formLabel}>
                    Program Name
                  </label>
                  <input
                    type="text"
                    id="programName"
                    name="ProgramName"
                    className={formStyles.formInput}
                    disabled={!isEditing}
                    value={course.Programs.ProgramName}
                    onChange={handleChange}
                    readOnly
                  
                  />
                </div>
                <div className={formStyles.formItem}>
                  <label htmlFor="programCode" className={formStyles.formLabel}>
                    Program Code
                  </label>
                  <input
                    type="text"
                    id="programCode"
                    name="ProgramCode"
                    className={formStyles.formInput}
                    disabled={!isEditing}
                    value={course.Programs.ProgramCode}
                    onChange={handleChange}
                    readOnly
                    
                  />
                </div>
              </div>
            </form>
          </div>
          <div className={formStyles.buttons}>
            <Button onClickBtn={handleDeleteCourse}>Delete Course</Button>
            <Button onClickBtn={handleBack}>Back To List</Button>
          </div>
        </EditContainer>
      ) : (
        <p>No course data found.</p>
      )}
    </div>
    // <div className={styles.ProfileLayout}>
    //   <div className={styles.basicInfo}>
    //     <h2>Course Details</h2>
    //     {course ? (
    //       <div>
    //         {isEditing ? (
    //           <EditCourseForm
    //             course={course}
    //             teachers={teachers}
    //             onSubmit={handleEditCourse}
    //             onCancel={handleCancelEdit}
    //           />
    //         ) : (
    //           <div>
    //             <p>Course Code: {course.CourseNo}</p>
    //             <p>Course Name: {course.CourseName}</p>
    //             <p>Description: {course.Description}</p>
    //             <p>Start Date: {course.StartDate}</p>
    //             <p>End Date: {course.EndDate}</p>
    //             <p>Time: {course.Time}</p>
    //             <p>Program Name: {course.Programs.ProgramName}</p>
    //             <p>Program Code: {course.Programs.ProgramCode}</p>
    //             <p>Teacher Name: {course.TeacherUser.FirstName} {course.TeacherUser.LastName}</p>
    //             <p>Teacher Email: {course.TeacherUser.Email}</p>
    //             <Button onClickBtn={() => setIsEditing(true)}>Edit Course</Button>
    //             <Button onClickBtn={handleDeleteCourse}>Delete Course</Button>
    //             <Button onClickBtn={handleBack}>Back</Button>
    //           </div>
    //         )}
    //       </div>
    //     ) : (
    //       <p>No course data found.</p>
    //     )}
    //   </div>
    // </div>
  );
}

export default CourseDetail;
