import React, { useState, useEffect } from "react";
import formStyles from "./Form.module.css";
import EditContainer from "../../ui/Layout/EditContainer";
import Button from "../Button/Button";
import { getCourses } from "../../services/apiCourse";
import { addCourse } from "../../services/apiCourse";
import { useNavigate, useParams } from "react-router-dom";

function AddCourseForTeacher({ userNo }) {
  const navigate = useNavigate();
  const [courses, setCourses] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchCourses() {
      try {
        const courseData = await getCourses();
        setCourses(courseData);
      } catch (error) {
        console.error("Failed to fetch courses:", error);
        setError("Failed to fetch courses.");
      }
    }

    fetchCourses();
  }, []);

  const handleAddCourse = async (course) => {
    try {
      await addCourse({ ...course, TeacherID: userNo });
      alert("Course added successfully!");
      navigate(`/teachers/${userNo}`);
    } catch (error) {
      console.error("Error adding course:", error);
      alert("An error occurred while adding the course.");
    }
  };

  return (
    <>
      <EditContainer title="Add Course for Teacher">
        <div className={formStyles.formContainer}>
          {error && <div className={formStyles.error}>{error}</div>}
          <table className={formStyles.courseTable}>
            <thead>
              <tr>
                <th>Course Name</th>
                <th>Start Date</th>
                <th>End Date</th>
                <th>Time</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {courses.map((course) => (
                <tr key={course.CourseID}>
                  <td>{course.CourseName}</td>
                  <td>{new Date(course.StartDate).toLocaleDateString()}</td>
                  <td>{new Date(course.EndDate).toLocaleDateString()}</td>
                  <td>{course.Time}</td>
                  <td>
                    <Button
                      type="button"
                      size="small"
                      onClick={() => handleAddCourse(course)}
                    >
                      Add
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <div className={formStyles.buttonContainer}>
            <Button onClickBtn={() => navigate(`/teachers/${userNo}`)} size="large">
              Back
            </Button>
          </div>
        </div>
      </EditContainer>
    </>
  );
}

export default AddCourseForTeacher;