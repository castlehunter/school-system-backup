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
import MainTitle from "../../ui/MainTitle/MainTitle";
import { getTeacherCoursesByUserID } from "../../services/apiTeacher";
import { getStudentCoursesByUserID } from "../../services/apiStudent";
import { getSchoolInformation } from "../../services/apiSchool";
import ContactForm from "../../components/Form/ContactForm";

function Overview() {
  const [loginRole, setLoginRole] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [studentCount, setStudentCount] = useState(0);
  const [teacherCount, setTeacherCount] = useState(0);
  const [courseCount, setCourseCount] = useState(0);
  const [enrollmentCount, setEnrollmentCount] = useState(0);
  const [teacherCourses, setTeacherCourses] = useState([]);
  const [studentCourses, setStudentCourses] = useState([]);

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

  useEffect(() => {
    async function fetchTeacherCourses() {
      const storedUserID = localStorage.getItem("UserID");
      const storedRole = localStorage.getItem("role");
      if (storedRole === "Teacher") {
        const teachercourses = await getTeacherCoursesByUserID(storedUserID);
        setTeacherCourses(teachercourses);
      } else if (storedRole === "Student") {
        const studentcourses = await getStudentCoursesByUserID(storedUserID);
        setStudentCourses(studentcourses);
      }
    }
    fetchTeacherCourses();
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
            number={teacherCourses.length}
            unit="My Courses"
            icon={icons.StudentIcon(styles.largeIcon)}
            bgcolor="bgcolor1"
          />
        </>
      );
    } else {
      return (
        <StatCard
          number={studentCourses.length}
          unit="My Courses"
          icon={icons.StudentIcon(styles.largeIcon)}
          bgcolor="bgcolor1"
        />
      );
    }
  }

  // function renderQuickLinks() {
  //   if (loginRole === "Admin") {
  //     return (
  //       <ul>
  //         <li>
  //           <Link to="/users/new-user" className={generalStyles.link}>
  //             Add New User
  //           </Link>{" "}
  //           <li>
  //             <Link to="/courses/new-course" className={generalStyles.link}>
  //               Add New Course
  //             </Link>
  //           </li>
  //         </li>
  //       </ul>
  //     );
  //   } else if (loginRole === "Advisor") {
  //     return (
  //       <ul>
  //         <li>
  //           <Link to="/courses/new-course" className={generalStyles.link}>
  //             Add New Course
  //           </Link>
  //         </li>
  //       </ul>
  //     );
  //   } else if (loginRole === "Teacher" || loginRole === "Student") {
  //     return (
  //       <ul>
  //         <li>
  //           <Link to="/my-courses/my-courses" className={generalStyles.link}>
  //             My Courses
  //           </Link>
  //         </li>
  //         <li>
  //           <Link to="/my-calendar/my-calendar" className={generalStyles.link}>
  //             My Calendar
  //           </Link>
  //         </li>
  //       </ul>
  //     );
  //   }
  // }

  function handleEditMainContact() {}

  return (
    <>
      <MainTitle title="Overview" />
      <div className={styles.statcards}>{renderStatCards()}</div>
      <div className={styles.overviewLayout}>
        <div className={styles.mainColumn}>
          <EditContainer
            title="Announcement"
            editButtonText={loginRole === "Admin" ? "Edit" : false}
          >
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
          <EditContainer title="TBD">d</EditContainer>
        </div>

        <div className={styles.secondaryColumn}>
          <ContactForm />
        </div>
      </div>
    </>
  );
}

export default Overview;
