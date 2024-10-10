import React from "react";
import generalStyles from "../../generalStyles.module.css";
import styles from "../../components/Table.module.css";
import { Link } from "react-router-dom";

function formatDate(dateString) {
  const date = new Date(dateString);
  return date.toLocaleDateString();
}

function TeacherTable({ data, rowsPerPage, currPage }) {
  const currData = data.slice(
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
          <th>Date of Birth</th>
          <th>Email</th>
          <th>Phone Number</th>
          <th>Address</th>
          <th>Action</th>
        </tr>
      </thead>

      <tbody>
        {currData.map((Teacher, index) => (
          <tr key={Teacher.TeacherNo} className={styles.tr}>
            <td>{index + 1 + (currPage - 1) * rowsPerPage}</td>
            <td>{Teacher.Users.UserNo}</td>
            <td>{Teacher.Users.FirstName}</td>
            <td>{Teacher.Users.LastName}</td>
            <td>{formatDate(Teacher.Users.DateOfBirth)}</td>
            <td>{Teacher.Users.Email}</td>
            <td>{Teacher.Users.PhoneNumber}</td>
            <td>{Teacher.Users.HomeAddress}</td>
            <td>
              <Link
                to={`/teachers/${Teacher.Users.UserNo}`}
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

export default TeacherTable;
