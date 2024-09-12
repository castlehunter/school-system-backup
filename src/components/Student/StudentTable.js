import React from "react";
import generalStyles from "../../generalStyles.module.css";
import styles from "../Table.module.css";
import { Link } from "react-router-dom";
import Loader from "../Loader";

function formatDate(dateString) {
  const date = new Date(dateString);
  return date.toLocaleDateString();
}

function StudentTable({ studentData, rowsPerPage, currPage, isLoading }) {
  const currData = studentData.slice(
    (currPage - 1) * rowsPerPage,
    currPage * rowsPerPage
  );

  return (
    <table className={styles.table}>
      <thead>
        <tr>
          <th>S/N</th>
          <th>Student No.</th>
          <th>First Name</th>
          <th>Last Name</th>
          <th>Program</th> {/* Added Program column */}
          <th>Sex</th>
          <th>Dob</th>
          <th>Email</th> {/* Added Telephone column */}
          <th>Telephone</th> {/* Added Mobile column */}
          <th>Mobile</th>
          <th>Address</th> {/* Added Address column */}
          <th>Action</th>
        </tr>
      </thead>

      {isLoading ? (
        <Loader />
      ) : (
        <tbody>
          {currData.map((student, index) => (
            <tr key={student.studentNo} className={styles.tr}>
              <td>{index + 1 + (currPage - 1) * rowsPerPage}</td>
              <td>{student.studentNo}</td>
              <td>{student.fname}</td>
              <td>{student.lname}</td>
              <td>{student.program}</td>
              <td>{student.sex}</td>
              <td>{formatDate(student.dob)}</td>
              <td>{student.email}</td>
              <td>{student.telephone}</td> {/* Added Telephone data */}
              <td>{student.mobile}</td> {/* Added Mobile data */}
              <td>{student.address}</td> {/* Added Address data */}
              <td>
                <Link
                  to={`/student/${student.studentNo}`}
                  className={generalStyles.link}
                >
                  view
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      )}
    </table>
  );
}

export default StudentTable;
