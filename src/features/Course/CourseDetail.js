import Container from "../../ui/Layout/Container";
import generalStyles from "../../generalStyles.module.css";
import { useParams, useNavigate } from "react-router-dom"; 
import React, { useEffect, useState } from "react";
import styles from "../Profile.module.css"; 
import Loader from "../../ui/Loader"; 
import EditContainer from "../../ui/Layout/EditContainer"; 
import { getCourseDetail, deleteCourse, updateCourse } from "../../services/apiCourse"; 
import Button from "../../components/Button/Button";
import { getTeachers } from "../../services/apiTeacher"; 
import EditCourseForm from "../../components/Form/EditCourseForm";

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
        console.error('Failed to fetch teachers:', error);
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

  const handleEditCourse = async (updatedCourse) => {
    try {
      await updateCourse(courseNo, updatedCourse); 
      alert("Course updated successfully!"); 
      setIsEditing(false); 
      const courseData = await getCourseDetail({ params: { ID: courseNo } });
      setCourse(courseData);
    } catch (err) {
      alert("Failed to update course: " + err.message); 
    }
  };

  if (isLoading) {
    return <Loader />;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className={styles.ProfileLayout}>
      <div className={styles.basicInfo}>
        <h2>Course Details</h2>
        {course ? (
          <div>
            {isEditing ? (
              <EditCourseForm 
                course={course}       
                teachers={teachers}
                onSubmit={handleEditCourse}  
                onCancel={handleCancelEdit}
              /> 
            ) : (
              <div>
                <p>Course Code: {course.CourseNo}</p>
                <p>Course Name: {course.CourseName}</p>
                <p>Description: {course.Description}</p>
                <p>Start Date: {course.StartDate}</p>
                <p>End Date: {course.EndDate}</p>
                <p>Time: {course.Time}</p>
                <p>Program Name: {course.Programs.ProgramName}</p>
                <p>Program Code: {course.Programs.ProgramCode}</p>
                <p>Teacher Name: {course.TeacherUser.FirstName} {course.TeacherUser.LastName}</p>
                <p>Teacher Email: {course.TeacherUser.Email}</p>
                <Button onClickBtn={() => setIsEditing(true)}>Edit Course</Button> 
                <Button onClickBtn={handleDeleteCourse}>Delete Course</Button>
                <Button onClickBtn={handleBack}>Back</Button>
              </div>
            )}
          </div>
        ) : (
          <p>No course data found.</p>
        )}
      </div>
    </div>
  );
}

export default CourseDetail;
