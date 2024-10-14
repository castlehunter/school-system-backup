import React from "react";
import generalStyles from "../../generalStyles.module.css";
import styles from "../../components/Table.module.css";
import { Link } from "react-router-dom";
import useCheckbox from "../../hooks/useCheckbox";

function CourseTable({ data, rowsPerPage, currPage }) {
  const {
    isAllSelected,
    handleSelectAll,
    selectedCheckboxes,
    handleCheckboxes,
  } = useCheckbox();

  const currData = data.slice(
    (currPage - 1) * rowsPerPage,
    currPage * rowsPerPage
  );

  return (
    <table className={styles.table}>
      <thead>
        <tr>
          <th>
            <input
              type="checkbox"
              checked={isAllSelected}
              onChange={() =>
                handleSelectAll(currData.map((element) => element.CourseID))
              }
              className={styles.checkbox}
            />
          </th>
          <th>S/N</th>
          <th>Course Code</th>
          <th>Course Name</th>
          <th>Start Date</th>
          <th>End Date</th>
          <th>Time</th>
          <th>Description</th>
          <th>Action</th>
        </tr>
      </thead>
      <tbody>
        {currData.map((course, index) => (
          <tr key={course.CourseID} className={styles.tr}>
            <td>
              <input
                type="checkbox"
                checked={selectedCheckboxes.includes(course.CourseID)}
                onChange={() => handleCheckboxes(course.CourseID)}
                className={styles.checkbox}
              />
            </td>
            <td>{index + 1 + (currPage - 1) * rowsPerPage}</td>
            <td>{course.CourseNo}</td>
            <td>{course.CourseName}</td>
            <td>{course.StartDate}</td>
            <td>{course.EndDate}</td>
            <td>{course.Time}</td>
            <td>{course.Description}</td>
            <td>
              <Link
                to={`/courses/${course.CourseNo}`}
                className={generalStyles.link}
              >
                View
              </Link>

              <Link
                to={`/courses/newEnrollment/${course.CourseNo}`}
                className={generalStyles.link}
                style={{ marginLeft: '10px' }}
              >
                Enroll
              </Link>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export default CourseTable;
