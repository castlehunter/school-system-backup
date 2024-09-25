import React from "react";
import generalStyles from "../../generalStyles.module.css";
import styles from "../../components/Table.module.css";
import { Link } from "react-router-dom";

function CourseTable({ data, rowsPerPage, currPage, isLoading }) {
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
        {currData.map((student, index) => (
          <tr key={student.studentNo} className={styles.tr}>
            <td>{index + 1 + (currPage - 1) * rowsPerPage}</td>
            <td>{student.CourseCode}</td>
            <td>{student.CourseName}</td>
            <td>{student.Time}</td>
            <td>{student.Description}</td>
            <td>
              <Link
                to={`/course/${student.studentNo}`}
                className={generalStyles.link}
              >
                view
              </Link>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export default CourseTable;
