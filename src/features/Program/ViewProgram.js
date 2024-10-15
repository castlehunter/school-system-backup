import { useNavigate, useParams } from "react-router-dom";
import React, { useState, useEffect } from "react";
import { getProgramById } from "../../services/apiProgram.js";
import ProgramForm from "../../components/Form/ProgramForm.js";

function ViewProgram() {
  const { programId } = useParams();
  const [data, setData] = useState({});
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [currPage, setCurrPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const navigate = useNavigate();

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
  const handleBack = async () => {
    try {
      navigate("/programs/program-list");
    } catch (err) {
      alert("Failed to go back " + err.message);
    }
  };
  return (
    <div>
      <h1>Program Management</h1>
      <ProgramForm mode="view" data={data} handleBack={handleBack} />
    </div>
  );
}

export default ViewProgram;
