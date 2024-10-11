import React from "react";
import generalStyles from "../../generalStyles.module.css";
import styles from "../../components/Table.module.css";
import { Link } from "react-router-dom";
import Loader from "../../ui/Loader";

function ProgramTable({ programData, rowsPerPage, currPage, isLoading }) {
  const currData = programData.slice(
    (currPage - 1) * rowsPerPage,
    currPage * rowsPerPage
  );
  console.log("currData " + JSON.stringify(currData));
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
      <tbody>
        {isLoading ? (
          <Loader />
        ) : (
          currData.map((program, index) => (
            <tr key={program.ProgramNo} className={styles.tr}>
              <td>{index + 1 + (currPage - 1) * rowsPerPage}</td>
              <td>{program.ProgramCode}</td>
              <td>{program.ProgramName}</td>
              <td>
                <Link
                  to={`/programs/${program.ProgramNo}`}
                  className={generalStyles.link}
                >
                  View
                </Link>
              </td>
            </tr>
          ))
        )}
      </tbody>
    </table>
  );
}

export default ProgramTable;
