import React from "react";
import { Outlet } from "react-router-dom";
import styles from "./Page.module.css";
import Breadcrumb from "../components/Breadcrumb/Breadcrumb";
import Layout from "../components/Layout/Layout";

function Dashboard() {
  return (
    <Layout breadcrumb={<Breadcrumb />}>
      <div className={styles.mainSection}>
        <Outlet />
      </div>
    </Layout>
  );
}

export default Dashboard;
