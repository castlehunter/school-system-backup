import React, { useState } from "react";
import generalStyles from "../../generalStyles.module.css";
import styles from "../../components/Table.module.css";
import { Link } from "react-router-dom";
import useCheckbox from "../../hooks/useCheckbox";

function formatDate(dateString) {
  const date = new Date(dateString);
  return date.toLocaleDateString();
}

function UserTable({ data, currPage, rowsPerPage }) {
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

  const formatDate = (dateString) => {
    const options = { year: "numeric", month: "long", day: "numeric" };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  return (
    <table className={styles.table}>
      <thead>
        <tr>
          <th>
            <input
              type="checkbox"
              checked={isAllSelected}
              onChange={() =>
                handleSelectAll(currData.map((element) => element.UserNo))
              }
            />
          </th>
          <th>S/N</th>
          <th>User No.</th>
          <th>Role</th>
          <th>User Name</th>
          <th>First Name</th>
          <th>Last Name</th>
          <th>Date of Birth</th>
          <th>Email</th>
          <th>Phone Number</th>
          <th>Address</th>
          <th>Created At</th>
          <th>Action</th>
        </tr>
      </thead>

      <tbody>
        {currData.map((user, index) => (
          <tr key={user.UserNo} className={styles.tr}>
            <td>
              <input
                type="checkbox"
                checked={selectedCheckboxes.includes(user.UserNo)}
                onChange={() => handleCheckboxes(user.UserNo)}
              />
            </td>
            <td>{index + 1 + (currPage - 1) * rowsPerPage}</td>
            <td>{user.UserNo}</td>
            <td>
              <p className={`${styles.role} ${styles[user.Roles?.RoleName]}`}>
                {user.Roles?.RoleName}
              </p>
            </td>
            <td>{user.UserName}</td>
            <td>{user.FirstName}</td>
            <td>{user.LastName}</td>
            <td>{formatDate(user.DateOfBirth)}</td>
            <td>{user.Email}</td>
            <td>{user.PhoneNumber}</td>
            <td>{user.HomeAddress}</td>
            <td>{formatDate(user.CreatedAt)}</td>
            <td>
              <Link to={`/users/${user.UserNo}`} className={generalStyles.link}>
                view
              </Link>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export default UserTable;
