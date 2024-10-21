import { useNavigate, useParams } from "react-router-dom";
import { getProgramById } from "../../services/apiProgram.js";
import React, { useState, useEffect } from "react";

import ProgramForm from "../../components/Form/ProgramForm.js";

function ViewProgram() {
  const { programId } = useParams();
  const [programData, setProgramData] = useState({});
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchData() {
      try {
        setIsLoading(true);
        setError("");
        const data = await getProgramById(programId);
        setProgramData(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    }
    fetchData();
  }, [programId]);

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

      <ProgramForm data={programData} />
    </div>
  );
}

export default ViewProgram;
