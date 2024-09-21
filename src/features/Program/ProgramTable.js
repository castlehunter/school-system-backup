import React from "react";
import generalStyles from "../../generalStyles.module.css";
import styles from "../Table.module.css";
import { Link } from "react-router-dom";
import Loader from "../Loader";

function formatDate(dateString) {
  const date = new Date(dateString);
  return date.toLocaleDateString();
}

function ProgramTable({ programData, rowsPerPage, currPage, isLoading }) {
  const currData = programData.slice(
    (currPage - 1) * rowsPerPage,
    currPage * rowsPerPage
  );

  return (
    <table className={styles.table}>
      <thead>
        <tr>
          <th>S/N</th>
          <th>Program Code</th>
          <th>Program Name</th>
          <th>Action</th>
        </tr>
      </thead>

      {isLoading ? (
        <Loader />
      ) : (
        <tbody>
          {currData.map((program, index) => (
            <tr key={program.ProgramID} className={styles.tr}>
              <td>{index + 1 + (currPage - 1) * rowsPerPage}</td>
              <td>{program.ProgramCode}</td>
              <td>{program.ProgramName}</td>
              <td>
                <Link
                  to={`/program/${program.programCode}`}
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

export default ProgramTable;
