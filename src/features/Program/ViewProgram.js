import { useNavigate, useParams } from "react-router-dom";
import React, { useState, useEffect } from "react";
import ProgramTable from "./ProgramTable.js";
import TableContainer from "../../ui/Layout/TableContainer";
import { getProgramById } from "../../services/apiProgram.js";

function ViewProgram() {
  const { programId } = useParams();
  const [data, setData] = useState({});
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [currPage, setCurrPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  useEffect(() => {
    async function fetchData() {
      try {
        setIsLoading(true);
        setError("");
        const teacherData = await getProgramById(programId);
        setData(teacherData);
      } catch (err) {
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    }
    fetchData();
  }, [programId]);

  function handleRowsPerPageChange(event) {
    setRowsPerPage(Number(event.target.value));
    setCurrPage(1); // Reset to first page when rows per page changes
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div>
      <h1>{data.ProgramName}</h1>
      <p>Program Code: {data.ProgramCode}</p>
      <p>Program Number: {data.ProgramNo}</p>
    </div>
  
  );
}

export default ViewProgram;
