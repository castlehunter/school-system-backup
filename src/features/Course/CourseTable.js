import React from "react";
import generalStyles from "../../generalStyles.module.css";
import styles from "../../components/Table.module.css";
import { Link } from "react-router-dom";

function CourseTable({ data, rowsPerPage, currPage }) {
  const currData = data.slice(
    (currPage - 1) * rowsPerPage,
    currPage * rowsPerPage
  );

  return (
    <table className={styles.table}>
      <thead>
        <tr>
          <th>S/N</th>
          <th>Course Code</th>
          <th>Course Name</th>
          <th>Time</th>
          <th>Description</th>
          <th>Action</th>
        </tr>
      </thead>
      <tbody>
        {currData.map((course, index) => (
          <tr key={course.CourseID} className={styles.tr}>
            <td>{index + 1 + (currPage - 1) * rowsPerPage}</td>
            <td>{course.CourseNo}</td>
            <td>{course.CourseName}</td>
            <td>{course.Time}</td>
            <td>{course.Description}</td>
            <td>
              <Link
                to={`/courses/${course.CourseID}`}
                className={generalStyles.link}
              >
                View
              </Link>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export default CourseTable;
