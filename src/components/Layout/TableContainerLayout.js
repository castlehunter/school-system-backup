import React from "react";
import generalStyles from "../../generalStyles.module.css";
import styles from "./TableContainerLayout.module.css";
import Pagination from "../Pagination/Pagination";
import Button from "../Button/Button";

function TableContainerLayout({
  children,
  title,
  rowsPerPage,
  totalPages,
  currPage,
  onPageChange,
  onRowsPerPageChange,
}) {
  return (
    <div className={generalStyles.container}>
      <div className={generalStyles.containerHeader}>
        <div className={generalStyles.primaryHeading}>{title}</div>
        {/* <div className={styles.addnew}>
          <Button>Add Student</Button>
        </div> */}
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
      <Pagination
        totalPages={totalPages}
        currPage={currPage}
        onPageChange={onPageChange}
      />
    </div>
  );
}

export default TableContainerLayout;
