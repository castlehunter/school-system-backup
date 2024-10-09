

import Container from "../../ui/Layout/Container";
import generalStyles from "../../generalStyles.module.css";
import { useParams, useNavigate } from "react-router-dom"; 
import React, { useEffect, useState } from "react";
import styles from "../Profile.module.css"; 
import Loader from "../../ui/Loader"; 
import EditContainer from "../../ui/Layout/EditContainer"; 
import { getCourseDetail, deleteCourse, updateCourse } from "../../services/apiCourse"; 
import Button from "../../components/Button/Button";
import { Link } from "react-router-dom";
import { getTeachers } from "../../services/apiTeacher"; 

import EditCourseForm from "../../components/Form/EditCourseForm";
function CourseDetail() {
  const { courseID } = useParams(); 
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
        const courseData = await getCourseDetail({ params: { ID: courseID } });
        setCourse(courseData);
      } catch (err) {
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    }

    fetchCourseDetails();
  }, [courseID]);

  const handleDeleteCourse = async () => {
    try {
      await deleteCourse(courseID); 
      alert("Course deleted successfully!");
      navigate("/course/course-list"); 
    } catch (err) {
      alert("Failed to delete the course: " + err.message);
    }
  };
  const handleBack = async () => {
    try {
      navigate("/course/course-list"); 
    } catch (err) {
      alert("Failed to go back " + err.message); 
    }
  };


  const handleCancelEdit = () => {
    setIsEditing(false); 
  };

  const handleEditCourse = async (updatedCourse) => {
    try {
      await updateCourse(courseID, updatedCourse); 
      alert("Course updated successfully!"); 
      setIsEditing(false); 
      const courseData = await getCourseDetail({ params: { ID: courseID } });
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
              <EditCourseForm course={course}       teachers={teachers}
              onSubmit={handleEditCourse}  onCancel={handleCancelEdit}/> 
            ) : (
              <div>
                <p>Course ID: {course.CourseID}</p>
                <p>Course Name: {course.CourseName}</p>
                <p>Description: {course.Description}</p>
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