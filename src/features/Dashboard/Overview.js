import React from "react";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import styles from "./Overview.module.css";
import generalStyles from "../../generalStyles.module.css";
import Container from "../../ui/Layout/Container";
import StatCard from "../../components/StatCard/StatCard";
import icons from "../../ui/Icons/icons";
import { getStudents } from "../../services/apiStudent";
import { getTeachers } from "../../services/apiTeacher";
import { getCourses } from "../../services/apiCourse";

function Overview() {
  const [loginRole, setLoginRole] = useState("");
  const [studentCount, setStudentCount] = useState(0);
  const [teacherCount, setTeacherCount] = useState(0);
  const [courseCount, setCourseCount] = useState(0);
  const [EnrollmentCount, setEnrollmentCount] = useState(0);

  useEffect(() => {
    const role = localStorage.getItem("role");
    setLoginRole("Administrator");
  }, []);

  useEffect(() => {
    async function fetchCounts() {
      try {
        const [students, teachers, courses, enrollments] = await Promise.all([
          getStudents(),
          getTeachers(),
          getCourses(),
          // getEnrollments(),
        ]);

        setStudentCount(students.length);
        setTeacherCount(teachers.length);
        setCourseCount(courses.length);
        // setEnrollmentCount(enrollments.length);
      } catch (error) {
        console.error("Error fetching data", error);
      }
    }

    fetchCounts();
  }, []);

  const renderStatCards = () => {
    if (loginRole === "Administrator" || loginRole === "Advisor") {
      return (
        <>
          <StatCard
            number={studentCount}
            unit="Students"
            icon={icons.StudentIcon(styles.largeIcon)}
            bgcolor="bgcolor1"
            link="/students"
          />
          <StatCard
            number={teacherCount}
            unit="Teachers"
            icon={icons.TeacherIcon(styles.largeIcon)}
            bgcolor="bgcolor2"
            link="/teachers"
          />
          <StatCard
            number={courseCount}
            unit="Courses"
            icon={icons.CourseIcon(styles.largeIcon)}
            bgcolor="bgcolor3"
            link="/courses"
          />
          <StatCard
            number="87"
            unit="Enrollments"
            icon={icons.EnrollmentIcon(styles.largeIcon)}
            bgcolor="bgcolor4"
            link="enrollments"
          />
        </>
      );
    } else if (loginRole === "Teacher") {
      return (
        <>
          <StatCard
            number="2"
            unit="My Courses"
            icon={icons.StudentIcon(styles.largeIcon)}
            bgcolor="bgcolor1"
          />
          <StatCard
            number="17"
            unit="My Students"
            icon={icons.TeacherIcon(styles.largeIcon)}
            bgcolor="bgcolor2"
          />
        </>
      );
    }
  };

  return (
    <>
      <div className={styles.statcards}>{renderStatCards()}</div>
      <Container
        title="Display different contents for different roles"
        headingType="primaryHeading"
      >
        <p>
          This is your central hub for managing students, teachers, and classes.
          Navigate through the menu to access various features and tools to
          streamline school operations.
        </p>

        <div className={styles.navigationLinks}>
          <h2 className={generalStyles.secondaryHeading}>Quick Links</h2>
          <ul>
            <li>
              <Link to="/student/student-list" className={generalStyles.link}>
                View Student List
              </Link>
            </li>
            <li>
              <Link to="/course/course-list" className={generalStyles.link}>
                View Course List
              </Link>
            </li>
            <li>
              <Link to="/teacher/teacher-list" className={generalStyles.link}>
                View Teacher List
              </Link>
            </li>
          </ul>
        </div>

        <div className={styles.announcements}>
          <h2 className={generalStyles.secondaryHeading}>Announcements</h2>
          <p>No new announcements at this time.</p>
        </div>

        <div className={styles.userInfo}>
          <h2 className={generalStyles.secondaryHeading}>User Information</h2>
          <p>Logged in as: John Doe</p>
        </div>
      </Container>
    </>
  );
}

export default Overview;
