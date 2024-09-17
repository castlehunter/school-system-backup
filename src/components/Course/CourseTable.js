import React from "react";
import styles from "../Table.module.css";
import { Link } from "react-router-dom";
import Loader from "../Loader";

function CourseTable({ courseData, rowsPerPage, currPage, isLoading }) {
  // const currData = courseData.slice(
  //   (currPage - 1) * rowsPerPage,
  //   currPage * rowsPerPage
  // );
  // return (
  //   <section className={styles.staffTableContainer}>
  //     <header className={styles.tableHeader}>
  //       <h2 className={styles.tableTitle}>All Courses</h2>
  //       <div className={styles.entriesPerPage}>
  //         <span>Showing</span>
  //         <span className={styles.entriesNumber}>{rowsPerPage}</span>
  //         <span>per page</span>
  //       </div>
  //     </header>
  //     <table className={styles.staffTable}>
  //       <thead>
  //         <tr>
  //           <th>S/N</th>
  //           <th>Branch No.</th>
  //           <th>Street</th>
  //           <th>City</th>
  //           <th>Postcode</th>
  //         </tr>
  //       </thead>
  //       {isLoading ? (
  //         <Loader />
  //       ) : (
  //         <tbody>
  //           {currData.map((branch, index) => (
  //             <tr key={branch.branchNo}>
  //               <td>{index + 1 + (currPage - 1) * rowsPerPage}</td>
  //               <td>{branch.branchNo}</td>
  //               <td>{branch.street}</td>
  //               <td>{branch.city}</td>
  //               <td>{branch.postcode}</td>
  //               <td>{branch.sex}</td>
  //               <td>
  //                 <Link
  //                   to={`/dashboard/branch/branch-edit/${branch.branchNo}`}
  //                   className={styles.editButton}
  //                 >
  //                   Edit
  //                 </Link>
  //               </td>
  //             </tr>
  //           ))}
  //         </tbody>
  //       )}
  //     </table>
  //   </section>
  // );
  return <div>CourseTable</div>;
}

export default CourseTable;
