import React from "react";
import { Outlet } from "react-router-dom";
import styles from "./Page.module.css";
import Layout from "../components/Layout/Layout";
import Breadcrumb from "../components/Breadcrumb/Breadcrumb";

function Course() {
  return (
    <Layout breadcrumb={<Breadcrumb />}>
      <div className={styles.mainSection}>
        <Outlet />
      </div>
    </Layout>
  );
}

export default Course;
