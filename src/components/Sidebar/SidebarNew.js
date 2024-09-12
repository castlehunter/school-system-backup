import { useState } from "react";
import { Link } from "react-router-dom";
import styles from "./SidebarNew.module.css";
import logo from "../../assets/logo.png";

function SidebarNew() {
  const PlusIcon = (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 448 512"
      style={{ width: "1.6rem", height: "1.6rem", fill: "#fff" }}
    >
      <path d="M256 80c0-17.7-14.3-32-32-32s-32 14.3-32 32v144H48c-17.7 0-32 14.3-32 32s14.3 32 32 32h144v144c0 17.7 14.3 32 32 32s32-14.3 32-32V288h144c17.7 0 32-14.3 32-32s-14.3-32-32-32H256V80z" />
    </svg>
  );

  const MinusIcon = (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 448 512"
      style={{ width: "1.6rem", height: "1.6rem", fill: "#fff" }}
    >
      <path d="M432 256c0 17.7-14.3 32-32 32L48 288c-17.7 0-32-14.3-32-32s14.3-32 32-32l352 0c17.7 0 32 14.3 32 32z" />
    </svg>
  );

  const CircleIcon = (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      style={{
        width: "1.2rem",
        height: "1.2rem",
        stroke: "#fff",
        strokeWidth: "2",
        fill: "none",
        marginRight: "10px",
      }}
    >
      <circle cx="12" cy="12" r="10" />
    </svg>
  );
  const DashboardIcon = (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      style={{
        width: "1.2rem",
        height: "1.2rem",
        fill: "#fff",
        marginRight: "10px",
      }}
    >
      <path d="M3 13h8V3H3v10zm10 8h8V3h-8v18zm-10 0h8v-6H3v6z" />
    </svg>
  );

  const StudentIcon = (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      style={{
        width: "1.2rem",
        height: "1.2rem",
        fill: "#fff",
        marginRight: "10px",
      }}
    >
      <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />
    </svg>
  );

  const CourseIcon = (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      style={{
        width: "1.2rem",
        height: "1.2rem",
        fill: "#fff",
        marginRight: "10px",
      }}
    >
      <path d="M21 3H3c-1.1 0-2 .9-2 2v14a2 2 0 002 2h18a2 2 0 002-2V5a2 2 0 00-2-2zM3 19V5h18v14H3zm4-6h2v2H7v-2zm-4 0h2v2H3v-2zm16 0h2v2h-2v-2zm-8 0h2v2h-2v-2zm4 0h2v2h-2v-2zm-8-4h2v2H7V9zm-4 0h2v2H3V9zm16 0h2v2h-2V9zm-8 0h2v2h-2V9zm4 0h2v2h-2V9z" />
    </svg>
  );

  const TeacherIcon = (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      style={{
        width: "1.2rem",
        height: "1.2rem",
        fill: "#fff",
        marginRight: "10px",
      }}
    >
      <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />
    </svg>
  );

  const EnrollmentIcon = (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      style={{
        width: "1.2rem",
        height: "1.2rem",
        fill: "#fff",
        marginRight: "10px",
      }}
    >
      <path d="M12 2C6.49 2 2 6.49 2 12s4.49 10 10 10 10-4.49 10-10S17.51 2 12 2zm-1 17.93C7.06 18.69 4 15.36 4 12c0-.47.05-.92.13-1.37L9 15v1c0 1.1.9 2 2 2v1.93zM12 4c1.83 0 3.54.67 4.88 1.76L5.76 16.88C4.67 15.54 4 13.83 4 12c0-4.42 3.58-8 8-8zm1 12h-1v-4h1v4zm0-6h-1V7h1v3z" />
    </svg>
  );

  const [openMenus, setOpenMenus] = useState({
    dashboard: true,
    student: true,
    course: true,
    teacher: true,
    enrollment: true,
  });

  function toggleMenu(menuName) {
    setOpenMenus((prevState) => ({
      ...prevState,
      [menuName]: !prevState[menuName],
    }));
  }

  return (
    <div className={styles.sidebar}>
      <Link to="/" className={styles.logoLink}>
        <div className={styles.logoContainer}>
          <img src={logo} alt="logo" className={styles.logoImage} />
          <span className={styles.logoText}>ABC College</span>
        </div>
      </Link>

      {/* Dashboard */}
      <div className={styles.menu}>
        <div className={styles.subMenu}>
          <div
            className={styles.subMenuTitle}
            onClick={() => toggleMenu("dashboard")}
          >
            <div>
              {DashboardIcon}
              <span>Dashboard</span>
            </div>
            {openMenus["dashboard"] ? <>{MinusIcon}</> : <>{PlusIcon}</>}
          </div>
          {openMenus["dashboard"] && (
            <div className={styles.menuContent}>
              <Link to="/dashboard/summary" className={styles.menuItem}>
                {CircleIcon}Overview
              </Link>
              <Link to="/dashboard/report" className={styles.menuItem}>
                {CircleIcon} Report
              </Link>
            </div>
          )}
        </div>

        {/* Student*/}
        <div className={styles.subMenu}>
          <div
            className={styles.subMenuTitle}
            onClick={() => toggleMenu("student")}
          >
            <div>
              {StudentIcon}
              <span>Students</span>
            </div>
            {openMenus["student"] ? <>{MinusIcon}</> : <>{PlusIcon}</>}
          </div>
          {openMenus["student"] && (
            <div className={styles.menuContent}>
              <Link to="/student/student-list" className={styles.menuItem}>
                {CircleIcon}Student List
              </Link>
              <Link to="/student/new-student" className={styles.menuItem}>
                {CircleIcon}New Student
              </Link>
            </div>
          )}
        </div>

        {/* Course */}
        <div className={styles.subMenu}>
          <div
            className={styles.subMenuTitle}
            onClick={() => toggleMenu("course")}
          >
            {" "}
            <div>
              {CourseIcon}
              <span>Courses</span>
            </div>
            {openMenus["course"] ? <>{MinusIcon}</> : <>{PlusIcon}</>}
          </div>
          {openMenus["course"] && (
            <div className={styles.menuContent}>
              <Link to="/course/course-list" className={styles.menuItem}>
                {CircleIcon} Course List
              </Link>
              <Link to="/course/new-course" className={styles.menuItem}>
                {CircleIcon} New Course
              </Link>
            </div>
          )}
        </div>

        {/* Teacher */}
        <div className={styles.subMenu}>
          <div
            className={styles.subMenuTitle}
            onClick={() => toggleMenu("teacher")}
          >
            <div>
              {TeacherIcon}
              <span>Teachers</span>
            </div>
            {openMenus["teacher"] ? <>{MinusIcon}</> : <>{PlusIcon}</>}
          </div>
          {openMenus["teacher"] && (
            <div className={styles.menuContent}>
              <Link to="/teacher/teacher-list" className={styles.menuItem}>
                {CircleIcon} Teacher List
              </Link>
              <Link to="/teacher/new-teacher" className={styles.menuItem}>
                {CircleIcon} New Teacher
              </Link>
            </div>
          )}
        </div>

        {/* Enrollment  */}
        <div className={styles.subMenu}>
          <div
            className={styles.subMenuTitle}
            onClick={() => toggleMenu("enrollment")}
          >
            <div>
              {EnrollmentIcon}
              <span>Enrollment</span>
            </div>
            {openMenus["enrollment"] ? <>{MinusIcon}</> : <>{PlusIcon}</>}
          </div>
          {openMenus["enrollment"] && (
            <div className={styles.menuContent}>
              <Link
                to="/enrollment/enrollment-list"
                className={styles.menuItem}
              >
                {CircleIcon}Enrollment List
              </Link>
              <Link to="/enrollment/new-enrollment" className={styles.menuItem}>
                {CircleIcon}New Enrollment
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default SidebarNew;
