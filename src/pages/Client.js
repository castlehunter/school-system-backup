import React from "react";
import { Outlet } from "react-router-dom";
import styles from "./Page.module.css";

function Client() {
  return (
    <main className={styles.staff}>
      <div className={styles.mainContent}>
        <Outlet />
      </div>
    </main>
  );
}

export default Client;
