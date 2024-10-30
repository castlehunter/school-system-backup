import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  getEnrollmentDetails,
  insertEnrollments,
} from "../../services/apiEnrollment";
import { getCourseDetail } from "../../services/apiCourse.js";
import Button from "../../components/Button/Button";
import styles from "../Profile.module.css";
import { getStudents } from "../../services/apiStudent.js";
import Select from "react-select";
import formStyles from "../../components/Form/Form.module.css";

function EnrollmentForm() {
  const { courseNo } = useParams();
  const navigate = useNavigate();
  const [students, setStudents] = useState([]);
  const [selectedStudents, setSelectedStudents] = useState([]);
  const [enrollmentDate, setEnrollmentDate] = useState(new Date().toISOString().split('T')[0]); // Current date
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [course, setCourse] = useState(null);

  useEffect(() => {
    async function fetchStudents() {
      try {
        const studentsData = await getStudents();
        const options = studentsData.map((student) => ({
          value: student.StudentID,
          label: `${student.Users.FirstName} ${student.Users.LastName}`,
        }));
        setStudents(options);
      } catch (error) {
        console.error("Failed to fetch students:", error);
      }
    }

    async function fetchCourseDetails() {
      try {
        setIsLoading(true);
        setError(null);
        const courseData = await getCourseDetail({ params: { ID: courseNo } });
        setCourse(courseData);

        // Fetch enrolled students for the course
        const enrolledStudents = await getEnrollmentDetails({ params: { CourseID: courseData.CourseID } });
        const preselectedStudents = enrolledStudents.map(student => ({
          value: student.StudentID,
          label: `${student.Users.FirstName} ${student.Users.LastName}`,
        }));
        setSelectedStudents(preselectedStudents); // Set preselected students
      } catch (err) {
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    }

    fetchStudents();
    fetchCourseDetails();
  }, [courseNo]);

  const handleSave = async (event) => {
    event.preventDefault(); 
    try {
      const newEnrollmentData = selectedStudents.map((student) => ({
        CourseID: course.CourseID,
        EnrollmentDate: enrollmentDate,
        StudentID: student.value,
      }));
      console.log("Enrollment data is:", newEnrollmentData);
      await insertEnrollments(newEnrollmentData);
      alert("Enrollment created successfully!");
      navigate("/courses/course-list");
    } catch (error) {
      alert("Failed to create enrollment: " + error.message);
    }
  };

  const handleStudentChange = (selectedOptions) => {
    setSelectedStudents(selectedOptions || []);
  };

  return (
    <div className={styles.enrollmentForm}>
      <h1 className={styles.title}>Enroll Students in {course?.CourseName || ''}</h1>

      <form>
        <div className={formStyles.formRow}>
          <div className={formStyles.formItem}>
            <label htmlFor="courseName" className={formStyles.formLabel}>
              Course Name
            </label>
            <input
              type="text"
              id="courseName"
              name="CourseName"
              value={course?.CourseName || ''}
              readOnly
              className={formStyles.formInput}
            />
          </div>

          <div className={formStyles.formItem}>
            <label htmlFor="Students" className={formStyles.formLabel}>
              Select Students
            </label>
            <Select
              options={students}
              value={selectedStudents}
              onChange={handleStudentChange}
              isMulti
              placeholder="Select students"
              className={formStyles.formInput}
            />
          </div>
        </div>

        <div className={styles.formActions}>
          <Button onClickBtn={handleSave} className={styles.saveButton}>
            Save
          </Button>
          <Button
            onClickBtn={() => navigate("/courses/course-list")}
            className={styles.backButton}
          >
            Back to List
          </Button>
        </div>
      </form>
    </div>
  );
}

export default EnrollmentForm;
