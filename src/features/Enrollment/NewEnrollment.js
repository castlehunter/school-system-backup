import React, { useState, useEffect } from "react";
import supabase from "../../config/supabaseClient.js";
import EditContainer from "../../ui/Layout/EditContainer.js";
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
import MainTitle from "../../ui/MainTitle/MainTitle.js";

function EnrollmentForm() {
  console.log('EnrollmentForm');
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
  const [enrolledStudents, setEnrolledStudents] = useState([]);
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
      fetchEnrollments(courseNo);
    }
    async function fetchCourseDetails() {
      try {
        setIsLoading(true);
        setError(null);
        const courseData = await getCourseDetail({ params: { ID: courseNo } });
        setCourse(courseData);

        const enrolledStudentsData = await getEnrollmentDetails({
          params: { CourseID: courseData.CourseID },
        });
        const preselectedStudents = enrolledStudentsData.map((student) => ({
          value: student.StudentID,
          label: `${student.Users.FirstName} ${student.Users.LastName}`,
        }));
        setSelectedStudents(preselectedStudents);
        setEnrolledStudents(enrolledStudentsData);
      } catch (err) {
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    }

    async function fetchEnrollments(courseNo) {
      try {
        console.log("courseNo = ", courseNo);
        setIsLoading(true);
        const courseDetails = await getCourseDetail({
          params: { ID: courseNo },
        });
        console.log("coursedetails = ", courseDetails);
        const courseID = courseDetails.CourseID;

        const enrollments = await getEnrollments();

        const filteredEnrollments = enrollments.filter(
          (enrollment) => enrollment.CourseID === courseID
        );

        const enrichedEnrollments = await Promise.all(
          filteredEnrollments.map(async (enrollment) => {
            const studentInfo = await getStudentNameForCourse(
              enrollment.StudentID
            );
            return {
              ...enrollment,
              studentName: `${studentInfo.Users.FirstName} ${studentInfo.Users.LastName}`, // Enrich with student name
            };
          })
        );

        setEnrolledStudents(enrichedEnrollments);
      } catch (error) {
        console.error("Failed to fetch enrollments:", error);
      } finally {
        setIsLoading(false);
      }
    }

    fetchStudents();
    fetchCourseDetails();
    fetchEnrollments();
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
      window.location.reload();

      // navigate("/courses/course-list");
    } catch (error) {
      alert("Failed to create enrollment: " + error.message);
    }
  };

  const handleStudentChange = (selectedOptions) => {
    setSelectedStudents(selectedOptions || []);
  };

  const handleUnenroll = async (studentID) => {
    try {
      setIsLoading(true);
      setError(null);

      await unenrollStudentFromCourse(studentID, course.CourseID);

      const updatedEnrollments = enrolledStudents.filter(
        (enrollment) => enrollment.StudentID !== studentID
      );

      setEnrolledStudents(updatedEnrollments);

      alert("Student unenrolled successfully!");
    } catch (error) {
      setError(error.message);
      console.error("Failed to unenroll student:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const unenrollStudentFromCourse = async (studentID, courseID) => {
    const { error } = await supabase
      .from("Enrollments")
      .delete()
      .eq("StudentID", studentID)
      .eq("CourseID", courseID);

    if (error) {
      throw new Error("Failed to unenroll student: " + error.message);
    }
  };

  return (
    <>
      <MainTitle
        title={`Enroll Students in ${course?.CourseName || ""}`}
        prevPath={"/courses/course-list"}
        goBack={true}
      />
      <EditContainer>
        <div className={styles.enrollmentForm}>
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
                <label className={formStyles.formLabel}>
                  Enrolled Students
                </label>
                {enrolledStudents.length > 0 ? (
                  <table className={formStyles.courseTable}>
                    <thead>
                      <tr>
                        <th>Student</th>
                        <th>Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      {enrolledStudents.map((enrollment) => (
                        <tr key={enrollment.StudentID}>
                          <td>{enrollment.studentName}</td>
                          <td>
                            <Button
                              onClickBtn={() =>
                                handleUnenroll(enrollment.StudentID)
                              }
                              size="small"
                            >
                              Unenroll
                            </Button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
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
      </EditContainer>
    </>
  );
}

export default EnrollmentForm;
