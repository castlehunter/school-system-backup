import React from "react";
import generalStyles from "../../generalStyles.module.css";
import styles from "../../components/Table.module.css";
import { Link } from "react-router-dom";
import Loader from "../../ui/Loader";

function EnrollmentTable({
  enrollmentData,
  rowsPerPage,
  currPage,
  isLoading,
  isAllSelected,
  handleSelectAll,
  selectedCheckboxes,
  handleCheckboxes,
}) {
  const currData = enrollmentData.slice(
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
                handleSelectAll(currData.map((element) => element.EnrollmentID))
              }
              className={styles.checkbox}
            />
          </th>
          <th>S/N</th>
          <th>Student First Name</th>
          <th>Student Last Name</th>
          <th>Course Name</th>
          <th>Enrollment Date</th>
          <th>Is Finished</th>
          <th>Action</th>
        </tr>
      </thead>
      <tbody>
        {isLoading ? (
          <Loader />
        ) : (
          currData.map((enrollment, index) => (
            <tr key={enrollment.EnrollmentID} className={styles.tr}>
              <td>
                <input
                  type="checkbox"
                  checked={selectedCheckboxes.includes(enrollment.EnrollmentID)}
                  onChange={() => handleCheckboxes(enrollment.EnrollmentID)}
                  className={styles.checkbox}
                />
              </td>
              <td>{index + 1 + (currPage - 1) * rowsPerPage}</td>
              <td>{enrollment.Students.Users.FirstName}</td>
              <td>{enrollment.Students.Users.LastName}</td>
              <td>{enrollment.Courses.CourseName}</td>
              <td>{new Date(enrollment.EnrollmentDate).toLocaleDateString()}</td>
              <td>{enrollment.isFinished ? "Yes" : "No"}</td>
              <td>
                <Link
                  to={`/enrollments/edit/${enrollment.EnrollmentID}`}
                  className={generalStyles.link}
                  style={{ paddingRight: 15 + "px" }}
                >
                  Update Status
                </Link>
              </td>
            </tr>
          ))
        )}
      </tbody>
    </table>
  );
}

export default EnrollmentTable;
