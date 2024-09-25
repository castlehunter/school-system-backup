import React from "react";
import TableContainer from "../../ui/Layout/TableContainer";
import { useLoaderData } from "react-router-dom";
import { useState } from "react";
import TeacherTable from "./TeacherTable";

function TeacherList() {
  const teachersData = useLoaderData() || [];
  const [currPage, setCurrPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const totalPages = Math.ceil(teachersData.length / rowsPerPage);

  if (!teachersData || teachersData.length === 0) {
    return <p>No teachers found.</p>;
  }

  function handlePageChange(page) {
    setCurrPage(page);
  }

  function handleRowsPerPageChange(event) {
    setRowsPerPage(Number(event.target.value));
    setCurrPage(1);
  }

  return (
    <TableContainer
      title="All Teachers"
      rowsPerPage={rowsPerPage}
      totalPages={totalPages}
      currPage={currPage}
      onPageChange={handlePageChange}
      onRowsPerPageChange={handleRowsPerPageChange}
    >
      <TeacherTable
        data={teachersData}
        rowsPerPage={rowsPerPage}
        currPage={currPage}
      />
    </TableContainer>
  );
}

export default TeacherList;
