import React from "react";
import generalStyles from "../../generalStyles.module.css";
import styles from "../../components/Table.module.css";
import { Link } from "react-router-dom";
import Loader from "../../ui/Loader";
import { useNavigate } from "react-router-dom";
import useCheckbox from "../../hooks/useCheckbox";

function StudentTable({ studentData, rowsPerPage, currPage, isLoading }) {
  const {
    selectedCheckboxes,
    handleCheckboxes,
    isAllSelected,
    handleSelectAll,
  } = useCheckbox();

  const currData = studentData.slice(
    (currPage - 1) * rowsPerPage,
    currPage * rowsPerPage
  );
  const navigate = useNavigate();

  function handleViewClick(StudentID) {
    navigate(`/students/${StudentID}`);
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
                handleSelectAll(currData.map((element) => element.Users.UserNo))
              }
              className={styles.checkbox}
            />
          </th>
          <th>S/N</th>
          <th>Student ID</th>
          <th>Student Name</th>
          <th>Start Date</th>
          <th>Active</th>
          <th>Program Name</th>
          <th>Action</th>
        </tr>
      </thead>
      <tbody>
        {isLoading ? (
          <Loader />
        ) : (
          currData.map((student, index) => (
            <tr key={student.Users.UserNo} className={styles.tr}>
              <td>
                <input
                  type="checkbox"
                  checked={selectedCheckboxes.includes(student.Users.UserNo)}
                  onChange={() => handleCheckboxes(student.Users.UserNo)}
                  className={styles.checkbox}
                />
              </td>

              <td>{index + 1 + (currPage - 1) * rowsPerPage}</td>
              <td>{student.StudentID}</td>
              <td>{`${student.Users.FirstName} ${student.Users.LastName}`}</td>
              <td>{student.StartDate}</td>
              <td>{student.Active ? "Yes" : "No"}</td>
              <td>{student.Programs.ProgramName}</td>
              <td>
                <Link
                  to={`/students/${student.Users.UserNo}`}
                  //onClick={() => handleViewClick(student.Users.UserNo)}
                  className={generalStyles.link}
                >
                  View Details
                </Link>
              </td>
            </tr>
          ))
        )}
      </tbody>
    </table>
  );
}

export default StudentTable;
