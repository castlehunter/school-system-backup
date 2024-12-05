import React, { useState } from "react";
import generalStyles from "../../generalStyles.module.css";
import styles from "../../components/Table.module.css";
import { Link, useNavigate } from "react-router-dom";
import Loader from "../../ui/Loader";
import Button from "../../components/Button/Button";

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
  const [editableRow, setEditableRow] = useState(null);

  const [status, setStatus] = useState(
    enrollmentData.reduce(
      (acc, enrollment) => ({
        ...acc,
        [enrollment.EnrollmentID]: enrollment.isFinished,
      }),
      {}
    )
  );

  const currData = enrollmentData.slice(
    (currPage - 1) * rowsPerPage,
    currPage * rowsPerPage
  );
  const navigate = useNavigate();

  function handleUpdateStatus(rowId) {
    setEditableRow(rowId);
  }

  function handleToggleStatus(id) {
    setStatus((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  }

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
              <td>
                {" "}
                {new Date(enrollment.EnrollmentDate).toLocaleDateString()}
              </td>
              {/* <td>{enrollment.isFinished ? "Yes" : "No"}</td> */}
              <td>
                <div className={`${styles.toggleSwitch} ${styles.editable}`}>
                  <label className={styles.toggleSwitch}>
                    <input
                      type="checkbox"
                      checked={status[enrollment.EnrollmentID]}
                      onChange={() =>
                        handleToggleStatus(enrollment.EnrollmentID)
                      }
                    />
                    <span className={styles.slider}></span>
                  </label>
                </div>
              </td>
              <td>
                <Button
                  onClickBtn={() => handleUpdateStatus(enrollment.EnrollmentID)}
                >
                  Update Status
                </Button>
              </td>
            </tr>
          ))
        )}
      </tbody>
    </table>
  );
}

export default EnrollmentTable;
