import React, { useState, useEffect } from "react";
import ProgramTable from "./ProgramTable.js";
import TableContainer from "../../components/Layout/TableContainer";
import supabase from "../../config/supabaseClient.js";

function ProgramList() {
  const [programData, setProgramData] = useState([]);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [currPage, setCurrPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const totalPages = Math.ceil(programData.length / rowsPerPage);

  useEffect(() => {
    async function fetchProgramData() {
      try {
        let { data, error } = await supabase.from("Programs").select("*");

        if (error) throw error;

        setProgramData(data);
      } catch (error) {
        console.error("Error fetching data:", error);
        setError(error.message);
      } finally {
        setIsLoading(false);
      }
    }

    fetchProgramData();
  }, []);

  function handlePageChange(page) {
    setCurrPage(page);
  }

  function handleRowsPerPageChange(event) {
    setRowsPerPage(Number(event.target.value));
    setCurrPage(1); // Reset to first page when rows per page changes
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <TableContainer
      title="All Programs"
      rowsPerPage={rowsPerPage}
      totalPages={totalPages}
      currPage={currPage}
      onPageChange={handlePageChange}
      onRowsPerPageChange={handleRowsPerPageChange}
    >
      <ProgramTable
        programData={programData}
        rowsPerPage={rowsPerPage}
        currPage={currPage}
        isLoading={isLoading}
      />
    </TableContainer>
  );
}

export default ProgramList;
