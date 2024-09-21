import React from "react";
import generalStyles from "../../generalStyles.module.css";
import styles from "./TableContainer.module.css";

function FormLayout({ children, title }) {
  return (
    <div>
      <div className={styles.tableHeader}>
        <div className={generalStyles.primaryHeading}>{title}</div>
      </div>
      <div>{children}</div>
    </div>
  );
}

export default FormLayout;
