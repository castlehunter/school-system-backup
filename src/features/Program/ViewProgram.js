import { useNavigate, useParams } from "react-router-dom";
import { getProgramByCode } from "../../services/apiProgram.js";
import React, { useState, useEffect } from "react";
import MainTitle from "../../ui/MainTitle/MainTitle.js";

import ProgramForm from "../../components/Form/ProgramForm.js";

function ViewProgram() {
  const { programCode } = useParams();
  const [programData, setProgramData] = useState({});
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchData() {
      try {
        setIsLoading(true);
        setError("");
        const data = await getProgramByCode(programCode);
        setProgramData(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    }
    fetchData();
  }, [programCode]);

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
      <MainTitle title="Course Category Detail" />
      <ProgramForm mode="view" data={programData} />
    </div>
  );
}

export default ViewProgram;
