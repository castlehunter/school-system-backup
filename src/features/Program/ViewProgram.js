import React, { useState, useEffect } from "react";
import ProgramTable from "./ProgramTable.js";
import TableContainer from "../../ui/Layout/TableContainer";
import { getProgram } from "../../services/apiProgram.js";

function ProgramList({ programId }) {
    
  const [programData, setProgramData] = useState([]);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [currPage, setCurrPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const totalPages = Math.ceil(programData.length / rowsPerPage);

  useEffect(() => {
    async function fetchProgramData() {
      try {
        const data = await getProgram({ id: programId });

        setProgramData(data);
      } catch (error) {
        console.error("Error fetching data:", error);
        setError(error.message);
      } finally {
        setIsLoading(false);
      }
    }

    fetchProgramData();
  }, [programId]);
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
    <TableContainer>
      <ProgramTable
        data={programData}
        currPage={currPage}
        rowsPerPage={rowsPerPage}
        totalPages={totalPages}
        onPageChange={handlePageChange}
        onRowsPerPageChange={handleRowsPerPageChange}
      />
    </TableContainer>
  );
}

export default ProgramList;
