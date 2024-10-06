import React from "react";
import generalStyles from "../../generalStyles.module.css";
import styles from "../../components/Table.module.css";
import { Link } from "react-router-dom";
import Loader from "../../ui/Loader";

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
          <th>User No.</th>
          <th>First Name</th>
          <th>Last Name</th>
          <th>Dob</th>
          <th>Email</th>
          <th>Telephone</th>
          <th>Mobile</th>
          <th>Address</th>
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
              {/* <td>
                {Array.isArray(student.program) ? (
                  student.program.map((prog, i) => (
                    <div key={i}>{prog.name}</div>
                  ))
                ) : (
                  <div>{student.program.name}</div>
                )}
              </td>
              <td>{student.sex}</td> */}
              <td>{formatDate(student.dob)}</td>
              <td>{student.email}</td>
              <td>{student.telephone}</td>
              <td>{student.mobile}</td>
              <td>{student.address}</td>
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
