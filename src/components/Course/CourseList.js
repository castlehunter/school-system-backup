import React, { useState, useEffect } from "react";
import TableContainerLayout from "../Layout/TableContainerLayout";
import CourseTable from "./CourseTable";
function CourseList() {
  const [courseData, setCourseData] = useState([]);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [currPage, setCurrPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const totalPages = Math.ceil(courseData.length / rowsPerPage);

  function handlePageChange(page) {
    setCurrPage(page);
  }

  // useEffect(() => {
  //   async function fetchStaffData() {
  //     try {
  //       setIsLoading(true);
  //       setError("");
  //       const response = await fetch(
  //         "http://localhost:3900/api/branch/branch-list"
  //       );
  //       if (!response.ok) {
  //         throw new Error("Failed to fetch branch list");
  //       }
  //       const data = await response.json();

  //       const transformedData = data.map((branch) => ({
  //         branchNo: branch[0],
  //         street: branch[1],
  //         city: branch[2],
  //         postcode: branch[3],
  //       }));

  //       setBranchData(transformedData);
  //     } catch (error) {
  //       console.error("Error fetching staff list:", error);
  //       setError(error.message);
  //     } finally {
  //       setIsLoading(false);
  //     }
  //   }

  //   fetchStaffData();
  // }, []);

  if (error) {
    return <div>Error: {error}</div>;
  }
  function handleRowsPerPageChange(event) {
    setRowsPerPage(Number(event.target.value));
    setCurrPage(1);
  }

  return (
    <TableContainerLayout
      title="All Students"
      rowsPerPage={rowsPerPage}
      totalPages={totalPages}
      currPage={currPage}
      onPageChange={handlePageChange}
      onRowsPerPageChange={handleRowsPerPageChange}
    >
      <CourseTable
        studentData={courseData}
        rowsPerPage={rowsPerPage}
        currPage={currPage}
        isLoading={isLoading}
      />
    </TableContainerLayout>
  );
}

export default CourseList;
