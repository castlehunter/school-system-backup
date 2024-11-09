import React, { useState, useEffect } from "react";
import ProgramTable from "./ProgramTable.js";
import TableContainer from "../../ui/Layout/TableContainer";
import { getProgramList } from "../../services/apiProgram.js";
import { useNavigate, useParams } from "react-router-dom";
import MainTitle from "../../ui/MainTitle/MainTitle.js";
function ProgramList() {
  const [programData, setProgramData] = useState([]);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [currPage, setCurrPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const navigate = useNavigate();
  const totalPages = Math.ceil(programData.length / rowsPerPage);

  useEffect(() => {
    async function fetchProgramData() {
      try {
        setIsLoading(true);
        setError(false);
        const data = await getProgramList();

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

  function handleAddBtn() {
    navigate("/programs/new-program");
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <>
      <MainTitle title="Course Category List" />
      <TableContainer
        rowsPerPage={rowsPerPage}
        totalPages={totalPages}
        currPage={currPage}
        onPageChange={handlePageChange}
        onRowsPerPageChange={handleRowsPerPageChange}
        onClickAddBtn={handleAddBtn}
      >
        <ProgramTable
          programData={programData}
          rowsPerPage={rowsPerPage}
          currPage={currPage}
          isLoading={isLoading}
        />
      </TableContainer>
    </>
  );
}

export default ProgramList;
