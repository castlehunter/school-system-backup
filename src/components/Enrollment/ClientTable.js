import React from "react";
import styles from "../Table.module.css";
import { Link } from "react-router-dom";
import Loader from "../Loader";

function ClientTable({ clientData, rowsPerPage, currPage, isLoading }) {
  const currData = clientData.slice(
    (currPage - 1) * rowsPerPage,
    currPage * rowsPerPage
  );

  return (
    <section className={styles.staffTableContainer}>
      <header className={styles.tableHeader}>
        <h2 className={styles.tableTitle}>All Client</h2>
        <div className={styles.entriesPerPage}>
          <span>Showing</span>
          <span className={styles.entriesNumber}>{rowsPerPage}</span>
          <span>per page</span>
        </div>
      </header>

      <table className={styles.staffTable}>
        <thead>
          <tr>
            <th>S/N</th>
            <th>Client No.</th>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Telephone</th>
            <th>Street</th>
            <th>City</th>
            <th>Email</th>
            <th>Pref Type</th>
            <th>Max Rent</th>
          </tr>
        </thead>
        {isLoading ? (
          <Loader />
        ) : (
          <tbody>
            {currData.map((client, index) => (
              <tr key={client.clientNo}>
                <td>{index + 1 + (currPage - 1) * rowsPerPage}</td>
                <td>{client.clientNo}</td>
                <td>{client.fname}</td>
                <td>{client.lname}</td>
                <td>{client.telno}</td>
                <td>{client.street}</td>
                <td>{client.city}</td>
                <td>{client.email}</td>
                <td>{client.preftype}</td>
                <td>{client.maxrent}</td>
                <td>
                  <Link
                    to={`/dashboard/client/client-edit/${client.clientNo}`}
                    className={styles.editButton}
                  >
                    Edit
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        )}
      </table>
    </section>
  );
}

export default ClientTable;
