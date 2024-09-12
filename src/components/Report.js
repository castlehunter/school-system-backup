import React from "react";
import { Link } from "react-router-dom";
import styles from "./Summary.module.css";

function Report() {
  return (
    <div className={styles.welcomeContainer}>
      <h1 className={styles.heading}>
        Welcome to the School Management System Dashboard!
      </h1>
      <p>
        This is your central hub for managing students, teachers, and classes.
        Navigate through the menu to access various features and tools to
        streamline school operations.
      </p>

      <div className={styles.navigationLinks}>
        <h2 className={styles.subHeading}>Quick Links</h2>
        <ul>
          <li>
            <Link to="/dashboard/staff/staff-list">View Staff List</Link>
          </li>
          <li>
            <Link to="/dashboard/branch/branch-list">View Branch List</Link>
          </li>
          <li>
            <Link to="/dashboard/client/client-list">View Client List</Link>
          </li>
        </ul>
      </div>

      <div className={styles.announcements}>
        <h2 className={styles.subHeading}>Announcements</h2>
        <p>No new announcements at this time.</p>
      </div>

      <div className={styles.userInfo}>
        <h2 className={styles.subHeading}>User Information</h2>
        <p>Logged in as: John Doe</p>
      </div>
    </div>
  );
}

export default Report;
