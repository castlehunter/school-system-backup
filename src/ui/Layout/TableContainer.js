import React from "react";
import generalStyles from "../../generalStyles.module.css";
import styles from "./TableContainer.module.css";
import Pagination from "../../components/Pagination/Pagination";

function TableContainer({
  children,
  title,
  rowsPerPage,
  totalPages, // New prop for total pages
  currPage, // New prop for current page
  onPageChange, // New prop for handling page changes
  onRowsPerPageChange,
}) {
  return (
    <div className={generalStyles.container}>
      <div className={generalStyles.containerHeader}>
        <div className={generalStyles.primaryHeading}>
          {title} {/* You can add filter/search functionalities here */}
        </div>
        <div className={styles.entriesPerPage}>
          <span>Showing</span>
          <select value={rowsPerPage} onChange={onRowsPerPageChange}>
            <option value={5}>5</option>
            <option value={10}>10</option>
            <option value={15}>15</option>
            <option value={20}>20</option>
            <option value={25}>25</option>
            <option value={30}>30</option>
          </select>
          <span>per page</span>
        </div>
      </div>
      <div>{children}</div>

      {/* Add Pagination at the bottom */}
      <Pagination
        totalPages={totalPages}
        currPage={currPage}
        onPageChange={onPageChange}
      />
    </div>
  );
}

export default TableContainer;
