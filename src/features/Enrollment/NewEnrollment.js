import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  getEnrollmentDetails,
  insertEnrollments,
  getEnrollments, // Import your new function
} from "../../services/apiEnrollment";
import { getCourseDetail } from "../../services/apiCourse.js";
import Button from "../../components/Button/Button";
import styles from "../Profile.module.css";
import {
  getStudents,
  getStudentNameForCourse,
} from "../../services/apiStudent.js";
import Select from "react-select";
import formStyles from "../../components/Form/Form.module.css";

function EnrollmentForm() {
  const { courseNo } = useParams();
  const navigate = useNavigate();
  const [students, setStudents] = useState([]);
  const [selectedStudents, setSelectedStudents] = useState([]);
  const [enrollmentDate, setEnrollmentDate] = useState(
    new Date().toISOString().split("T")[0]
  ); // Current date
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [course, setCourse] = useState(null);
  const [enrolledStudents, setEnrolledStudents] = useState([]); // New state for enrolled students
  console.log(courseNo); 
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
    if (courseNo) {
      fetchEnrollments(courseNo); // Call fetchEnrollments once courseNo is set
    }
    async function fetchCourseDetails() {
      try {
        setIsLoading(true);
        setError(null);
        const courseData = await getCourseDetail({ params: { ID: courseNo } });
        setCourse(courseData);

        // Fetch enrolled students for the course
        const enrolledStudentsData = await getEnrollmentDetails({
          params: { CourseID: courseData.CourseID },
        });
        const preselectedStudents = enrolledStudentsData.map((student) => ({
          value: student.StudentID,
          label: `${student.Users.FirstName} ${student.Users.LastName}`,
        }));
        setSelectedStudents(preselectedStudents); // Set preselected students
        setEnrolledStudents(enrolledStudentsData); // Set enrolled students
      } catch (err) {
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    }

      async function fetchEnrollments(courseNo) {
        try {
          console.log("courseNo = ",courseNo);
          setIsLoading(true);
          // Get course details using courseNo to retrieve the courseID
          const courseDetails = await getCourseDetail({ params: { ID: courseNo } });
          console.log("coursedetails = ",courseDetails);
          const courseID = courseDetails.CourseID; // Extract courseID from course details
      
          // Get all enrollments
          const enrollments = await getEnrollments(); 
      
          // Filter enrollments by matching CourseID
          const filteredEnrollments = enrollments.filter((enrollment) => enrollment.CourseID === courseID);
      
          // Enrich filtered enrollments with student info
          const enrichedEnrollments = await Promise.all(filteredEnrollments.map(async (enrollment) => {
            const studentInfo = await getStudentNameForCourse(enrollment.StudentID); // Get student info
            return {
              ...enrollment,
              studentName: `${studentInfo.Users.FirstName} ${studentInfo.Users.LastName}`, // Enrich with student name
            };
          }));
      
          setEnrolledStudents(enrichedEnrollments); // Set enriched enrollments
        } catch (error) {
          console.error("Failed to fetch enrollments:", error);
        } finally {
          setIsLoading(false);
        }
      }
    

    fetchStudents();
    fetchCourseDetails();
    fetchEnrollments(); // Fetch enrollments when the component mounts
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
      <h1 className={styles.title}>
        Enroll Students in {course?.CourseName || ""}
      </h1>

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
              value={course?.CourseName || ""}
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

        {/* Display Enrolled Students */}
        <div className={formStyles.formRow}>
          <div className={formStyles.formItem}>
            <label className={formStyles.formLabel}>Enrolled Students</label>
            {enrolledStudents.length > 0 ? (
              <ul>
                {enrolledStudents.map((enrollment) => (
                  <li key={enrollment.StudentID}>
                    {enrollment.studentName} - {enrollment.Courses.CourseName}
                  </li>
                ))}
              </ul>
            ) : (
              <p>No students enrolled yet.</p>
            )}
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
