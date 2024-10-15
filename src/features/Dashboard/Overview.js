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
          <EditContainer title="secondary column" showEditButton={false}>
            "The silver umbrellas floated gently through the ocean breeze, while
            the mountains whispered secrets to the birds wearing mismatched
            socks. In the distance, a train made entirely of marshmallows glided
            on a rainbow track, leaving behind a trail of laughing bubbles.
            Meanwhile, the clocktower chimed at the wrong time, prompting a
            parade of giant rubber ducks to march through the sunflower forest.
            Every tree was made of candy canes, and the wind carried the faint
            sound of a piano playing underwater, as jellybeans fell from the sky
            like soft rain.
          </EditContainer>
        </div>
      </div>
    </>
  );
}

export default Overview;
