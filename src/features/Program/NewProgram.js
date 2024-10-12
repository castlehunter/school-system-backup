import { useNavigate } from "react-router-dom";
import React, { useState } from "react";
import ProgramForm from '../../components/Form/ProgramForm.js';
import { addProgram } from "../../services/apiProgram.js";

function NewProgram() {
  const [formData, setFormData] = useState({ ProgramName: '', ProgramCode: '' });
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleUpdate = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSave = async () => {
    try {
      await addProgram(formData);
      alert("Program added successfully");
      navigate("/programs/program-list");
    } catch (err) {
      setError(err.message);
      alert("Failed to add program: " + err.message);
    }
  };

  const handleBack = () => {
    navigate("/programs/program-list");
  };

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div>
      <h1>Program Management</h1>
      <ProgramForm
        mode="add"
        data={formData}
        handleUpdate={handleUpdate}
        handleSave={handleSave}
        handleBack={handleBack}
      />
    </div>
  );
}

export default NewProgram;
