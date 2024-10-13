import React, { useState, useEffect } from "react";
import EnrollmentTable from "./EnrollmentTable.js";
import TableContainer from "../../ui/Layout/TableContainer";
import { getEnrollmentList } from "../../services/apiEnrollment.js";
import { useNavigate } from "react-router-dom";

function EnrollmentList() {
  const [enrollmentData, setEnrollmentData] = useState([]);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [currPage, setCurrPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const navigate = useNavigate();

  const totalPages = Math.ceil(enrollmentData.length / rowsPerPage);

  useEffect(() => {
    async function fetchEnrollmentData() {
      try {
        setIsLoading(true);
        setError(null);
        const data = await getEnrollmentList();
        setEnrollmentData(data);
      } catch (error) {
        console.error("Error fetching data:", error);
        setError(error.message);
      } finally {
        setIsLoading(false);
      }
    }
    fetchEnrollmentData();
  }, []);

  function handlePageChange(page) {
    setCurrPage(page);
  }

  function handleRowsPerPageChange(event) {
    setRowsPerPage(Number(event.target.value));
    setCurrPage(1); // Reset to first page when rows per page changes
  }

  function handleAddBtn() {
    navigate("/enrollments/new-enrollment");
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <TableContainer
      title="All Enrollments"
      rowsPerPage={rowsPerPage}
      totalPages={totalPages}
      currPage={currPage}
      onPageChange={handlePageChange}
      onRowsPerPageChange={handleRowsPerPageChange}
      onClickBtn={handleAddBtn}
      showAddBtn
    >
      <EnrollmentTable
        enrollmentData={enrollmentData}
        rowsPerPage={rowsPerPage}
        currPage={currPage}
        isLoading={isLoading}
      />
    </TableContainer>
  );
}

export default EnrollmentList;