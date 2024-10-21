import React from "react";
import generalStyles from "../../generalStyles.module.css";
import styles from "../../components/Table.module.css";
import { Link } from "react-router-dom";
import useCheckbox from "../../hooks/useCheckbox";

function formatDate(dateString) {
  const date = new Date(dateString);
  return date.toLocaleDateString();
}

function TeacherTable({ data, rowsPerPage, currPage }) {
  const {
    selectedCheckboxes,
    handleCheckboxes,
    isAllSelected,
    handleSelectAll,
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
                handleSelectAll(currData.map((element) => element.Users.UserNo))
              }
            />
          </th>
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
          <tr key={Teacher.Users.UserNo} className={styles.tr}>
            <td>
              <input
                type="checkbox"
                checked={selectedCheckboxes.includes(Teacher.Users.UserNo)}
                onChange={() => handleCheckboxes(Teacher.Users.UserNo)}
              />
            </td>
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
                View/Edit
              </Link>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export default TeacherTable;
