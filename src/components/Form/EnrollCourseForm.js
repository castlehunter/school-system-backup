import React, { useState, useEffect } from "react";
import formStyles from "./Form.module.css";
import EditContainer from "../../ui/Layout/EditContainer";
import Button from "../Button/Button";
import { getCourses } from "../../services/apiCourse";
import { getStudentByUserNo } from "../../services/apiStudent";
import { insertEnrollment } from "../../services/apiEnrollment";
import { useParams, useNavigate } from "react-router-dom";
import MainTitle from "../../ui/MainTitle/MainTitle";

function EnrollCourseForm() {
  const { userNo } = useParams();
  const navigate = useNavigate();
  const [courses, setCourses] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [studentData, setStudentData] = useState(null);

  useEffect(() => {
    async function fetchData() {
      try {
        setIsLoading(true);
        const courseData = await getCourses();
        setCourses(courseData);
      } catch (error) {
        console.error("Failed to fetch courses:", error);
        setError("Failed to fetch courses.");
      } finally {
        setIsLoading(false);
      }
    }
    fetchData();
  }, []);

  useEffect(() => {
    async function fetchData() {
      try {
        setIsLoading(true);

        const data = await getStudentByUserNo(userNo);
        setStudentData(data);
      } catch (error) {
        setError("Failed to fetch student data.");
      } finally {
        setIsLoading(false);
      }
    }

    fetchData();
  }, []);

  async function handleEnroll(courseId) {
    try {
      const studentId = studentData.StudentID;
      await insertEnrollment(
        studentId,
        courseId,
        new Date().toISOString(),
        false
      );
      alert("Student enrolled successfully!");
    } catch (error) {
      console.error("Error enrolling student:", error);
      alert("An error occurred while enrolling the student.");
    }
  }

  return (
    <>
      <MainTitle
        title={
          isLoading || !studentData
            ? `Course Enrollment`
            : `Course Enrollment: ${studentData?.Users?.FirstName} ${studentData?.Users?.LastName}`
        }
        goBack={true}
      />
      <EditContainer>
        <div className={formStyles.formContainer}>
          {error && <div className={formStyles.error}>{error}</div>}
          <table className={formStyles.courseTable}>
            <thead>
              <tr>
                <th>Course Name</th>
                <th>Start Date</th>
                <th>End Date</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {courses.map((course) => (
                <tr key={course.CourseID}>
                  <td>{course.CourseName}</td>
                  <td>{new Date(course.StartDate).toLocaleDateString()}</td>
                  <td>{new Date(course.EndDate).toLocaleDateString()}</td>
                  <td>
                    <Button
                      onClickBtn={() => handleEnroll(course.CourseID)}
                      size="small"
                    >
                      Enroll
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </EditContainer>
    </>
  );
}

export default EnrollCourseForm;
