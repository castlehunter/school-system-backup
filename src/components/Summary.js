import React from "react";
import { Link } from "react-router-dom";
import styles from "./Summary.module.css";
import generalStyles from "../generalStyles.module.css";
import ContainerLayout from "./Layout/Container";

function Summary() {
  return (
    <ContainerLayout title="Welcome to the School Management System Dashboard!">
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
    </ContainerLayout>
  );
}

export default Summary;
