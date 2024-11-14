import React, { useState, useEffect } from "react";
import formStyles from "./Form.module.css";
import EditContainer from "../../ui/Layout/EditContainer";
import Button from "../Button/Button";
import { getCourses } from "../../services/apiCourse";
import { addCourseToTeacher } from "../../services/apiTeacher";
import { useNavigate, useParams } from "react-router-dom";
import MainTitle from "../../ui/MainTitle/MainTitle";

function AddCourseForTeacher() {
  const { userNo } = useParams();
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
      await addCourseToTeacher({
        CourseID: course.CourseID,
        TeacherID: userNo,
      });
      alert("Course added successfully!");
      navigate(`/teachers/${userNo}`);
    } catch (error) {
      console.error("Error adding course:", error);
      alert("An error occurred while adding the course.");
    }
  };

  return (
    <>
      <MainTitle title={`Add courses for`} goBack={true} />
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
                <th>Action</th>
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
        </div>
      </EditContainer>
    </>
  );
}

export default AddCourseForTeacher;
