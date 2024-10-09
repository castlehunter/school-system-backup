import React from "react";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import styles from "./Overview.module.css";
import generalStyles from "../../generalStyles.module.css";
import Container from "../../ui/Layout/Container";
import StatCard from "../../components/StatCard/StatCard";
import icons from "../../ui/Icons/icons";

function Overview() {
  const [loginRole, setLoginRole] = useState("");
  useEffect(() => {
    const role = localStorage.getItem("role");
    setLoginRole("Teacher");
  }, []);

  const renderStatCards = () => {
    if (loginRole === "Administrator" || loginRole === "Advisor") {
      return (
        <>
          <StatCard
            number="150"
            unit="Students"
            icon={icons.StudentIcon(styles.largeIcon)}
            bgcolor="bgcolor1"
          />
          <StatCard
            number="26"
            unit="Teachers"
            icon={icons.TeacherIcon(styles.largeIcon)}
            bgcolor="bgcolor2"
          />
          <StatCard
            number="30"
            unit="Courses"
            icon={icons.CourseIcon(styles.largeIcon)}
            bgcolor="bgcolor3"
          />
          <StatCard
            number="87"
            unit="Enrollments"
            icon={icons.EnrollmentIcon(styles.largeIcon)}
            bgcolor="bgcolor4"
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
        title="Welcome to the School Management System Dashboard!"
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
