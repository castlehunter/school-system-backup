import React from "react";
import generalStyles from "../../generalStyles.module.css";
import styles from "../../components/Table.module.css";
import { Link } from "react-router-dom";
import Loader from "../../ui/Loader";
import { useNavigate } from "react-router-dom";

function StudentTable({ studentData, rowsPerPage, currPage, isLoading }) {
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
            <tr key={student.StudentID} className={styles.tr}>
              <td>{index + 1 + (currPage - 1) * rowsPerPage}</td>
              <td>{student.StudentID}</td>
              <td>{`${student.Users.FirstName} ${student.Users.LastName}`}</td>
              <td>{student.StartDate}</td>
              <td>{student.Active ? "Yes" : "No"}</td>
              <td>{student.Programs.ProgramName}</td>
              <td>
                <Link
                  onClick={() => handleViewClick(student.StudentID)}
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