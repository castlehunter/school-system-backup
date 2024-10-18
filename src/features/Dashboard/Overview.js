import React from "react";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import styles from "./Overview.module.css";
import generalStyles from "../../generalStyles.module.css";
import StatCard from "../../components/StatCard/StatCard";
import icons from "../../ui/Icons/icons";
import { getStudents } from "../../services/apiStudent";
import { getTeachers } from "../../services/apiTeacher";
import { getCourses } from "../../services/apiCourse";
import { getEnrollments } from "../../services/apiEnrollment";
import EditContainer from "../../ui/Layout/EditContainer";

function Overview() {
  const [loginRole, setLoginRole] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [studentCount, setStudentCount] = useState(0);
  const [teacherCount, setTeacherCount] = useState(0);
  const [courseCount, setCourseCount] = useState(0);
  const [enrollmentCount, setEnrollmentCount] = useState(0);

  useEffect(() => {
    const storedRole = localStorage.getItem("role");
    const storedFirstName = localStorage.getItem("firstName");
    const storedLastName = localStorage.getItem("lastName");
    setLoginRole(storedRole);
    setFirstName(storedFirstName);
    setLastName(storedLastName);
  }, []);

  useEffect(() => {
    async function fetchCounts() {
      try {
        const [students, teachers, courses, enrollments] = await Promise.all([
          getStudents(),
          getTeachers(),
          getCourses(),
          getEnrollments(),
        ]);

        setStudentCount(students.length);
        setTeacherCount(teachers.length);
        setCourseCount(courses.length);
        setEnrollmentCount(enrollments.length);
      } catch (error) {
        console.error("Error fetching data", error);
      }
    }

    fetchCounts();
  }, []);

  // Render Stat Cards
  function renderStatCards() {
    if (loginRole === "Admin" || loginRole === "Advisor") {
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
            number={enrollmentCount}
            unit="Enrollments"
            icon={icons.EnrollmentIcon(styles.largeIcon)}
            bgcolor="bgcolor4"
            link="/enrollments"
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
  }

  function renderQuickLinks() {
    if (loginRole === "Admin") {
      return (
        <ul>
          <li>
            <Link to="/users/new-user" className={generalStyles.link}>
              Add New User
            </Link>
          </li>
        </ul>
      );
    } else if (loginRole === "Advisor") {
      return (
        <ul>
          <li>
            <Link to="/courses/new-course" className={generalStyles.link}>
              Add New Course
            </Link>
          </li>
        </ul>
      );
    } else if (loginRole === "Teacher" || loginRole === "Student") {
      return (
        <ul>
          <li>
            <Link to="/my-courses" className={generalStyles.link}>
              My Courses
            </Link>
          </li>
        </ul>
      );
    }
  }

  return (
    <>
      <h1>Overview</h1>{" "}
      <div className={styles.statcards}>{renderStatCards()}</div>
      <div className={styles.overviewLayout}>
        <div className={styles.mainColumn}>
          <EditContainer title="Announcement" showEditButton={false}>
            Navigate through the menu to explore features and tools that
            simplify and enhance your tasks within the school system. Add more
            textsAdd more textsAdd more textsAdd more textsAdd more texts
            <br></br>Add more texts
            <br></br>Add more texts<br></br>Add more texts<br></br>Add more
            texts
            <br></br>Add more texts<br></br>Add more texts<br></br>Add more
            texts
            <br></br>Add more texts
          </EditContainer>
          <EditContainer title="Quick Links" showEditButton={false}>
            {renderQuickLinks()}
          </EditContainer>
          <EditContainer title="Logged in as" showEditButton={false}>
            {firstName} {lastName}
          </EditContainer>
        </div>

        <div className={styles.secondaryColumn}>
          <EditContainer title="Main Office Contact" showEditButton={false}>
            <p>
              For inquiries related to enrolled students, including class
              adjustments, withdrawals, and general support:
            </p>
            <br />
            <p>Address: 123 Learning Avenue, Education City, XYZ 45678 </p>
            <p>Phone: (123) 456-7890 </p>
            <p>Email: info@abc-learn.edu</p>
            <p>Website: www.abc-learn.edu</p>
            <br />
            <p> General Office Hours</p>
            Monday to Friday: 8:00 AM - 4:00 PM <br />
            Saturday & Sunday: Closed
          </EditContainer>
          <EditContainer
            title="Admission Office Contact"
            showEditButton={false}
          >
            <p>
              For all admissions-related inquiries, including application and
              enrollment procedures:
            </p>
            <p>Phone: (123) 456-7890 </p>
            <p>Email: admissions@abc-learn.edu</p>
          </EditContainer>
          <EditContainer
            title="Technical Support / IT Helpdesk"
            showEditButton={false}
          >
            <p>
              For issues related to school system or technical difficulties:
            </p>
            <p>Phone: (416) 666-0000 </p>
            <p>Email: tech@abc-learn.edu</p>
            <p>Website: www.abc-learn.edu</p>
            <br />
          </EditContainer>
        </div>
      </div>
    </>
  );
}

export default Overview;
