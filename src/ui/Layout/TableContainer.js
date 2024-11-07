import React from "react";
import generalStyles from "../../generalStyles.module.css";
import styles from "./TableContainer.module.css";
import Pagination from "../../components/Pagination/Pagination";
import Button from "../../components/Button/Button";
import Search from "../../components/Search/Search";
import SelectButton from "../../components/Button/SelectButton";

function TableContainer({
  children,
  title,
  rowsPerPage,
  totalPages,
  currPage,
  onPageChange,
  onRowsPerPageChange,
  onClickBtn,
  showAddBtn,
  showEditBtn,
  onClickEditBtn,
  itemsNums = [5, 10, 15, 20, 25, 30],
  options,
}) {
  const handleSelect = (selectedOption) => {
    console.log("Selected:", selectedOption);
  };
  return (
    <div className={generalStyles.container}>
      {title && (
        <div className={generalStyles.containerHeader}>
          <div className={generalStyles.containerHeading}>
            <span>{title}&nbsp;&nbsp;&nbsp;</span>
          </div>
        </div>
      )}
      <div className={styles.tableFeatures}>
        <div className={styles.tableFeaturesLeftBox}>
          {showAddBtn && <Button onClickBtn={onClickBtn}>Add</Button>}
          {showEditBtn && <Button onClickEditBtn={onClickEditBtn}>Edit</Button>}
          <div>
            <SelectButton
              options={options}
              onSelect={handleSelect}
              label="Sort By"
            />
          </div>
          <Search colorType="light" />
        </div>
        <div className={styles.entriesPerPage}>
          <span>Showing</span>
          <select value={rowsPerPage} onChange={onRowsPerPageChange}>
            {itemsNums.map((num, index) => (
              <option value={num} key={index}>
                {num}
              </option>
            ))}
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

export default TableContainer;
