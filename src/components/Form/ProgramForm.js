import React, { useState, useEffect } from "react";
import styles from "../../features/Profile.module.css";
import formStyles from "../Form/Form.module.css";
import EditContainer from "../../ui/Layout/EditContainer";
import Button from "../../components/Button/Button.js";
import { updateProgram } from "../../services/apiProgram.js";
import { addProgram } from "../../services/apiProgram.js";
import { useNavigate } from "react-router-dom";

const ProgramForm = ({ data, mode }) => {
  const navigate = useNavigate();
  const [isEdit, setIsEdit] = useState(false);
  const [error, setError] = useState("");
  const [inputData, setInputData] = useState({
    ProgramCode: "",
    ProgramName: "",
    ProgramDescription: "",
  });

  useEffect(() => {
    if (data) {
      setInputData({
        ProgramCode: data.ProgramCode || "",
        ProgramName: data.ProgramName || "",
        ProgramDescription: data.ProgramDescription || "",
      });
    }
  }, [data]);

  function handleClickEdit(e) {
    e.preventDefault();
    setIsEdit((isEdit) => !isEdit);
  }

  async function handleClickSave() {
    try {
      const response = await updateProgram(inputData);
      console.log("response", response);
      setIsEdit(false);
      if (response) {
        alert("User information updated successfully!");
        console.log("User updated successfully!", response);
      } else {
        alert("Failed to update user information.");
        console.error("Failed to update user information.");
      }
    } catch (error) {
      console.error("Error saving user data:", error);
      alert("An error occurred while saving data.");
    }
  }

  function handleClickCancel() {
    setIsEdit(false);
    setInputData({
      ProgramCode: data.ProgramCode || "",
      ProgramName: data.ProgramName || "",
      ProgramDescription: data.ProgramDescription || "",
    });
  }

  function handleUpdate(e) {
    const { name, value } = e.target;
    setInputData((prevInputData) => ({ ...prevInputData, [name]: value }));
  }

  const handleCreate = async () => {
    try {
      await addProgram(inputData);
      alert("Program added successfully");
      navigate("/programs/program-list");
    } catch (err) {
      setError(err.message);
      alert("Failed to add program: " + err.message);
    }
  };

  return (
    <EditContainer
      title={mode === "view" ? inputData.ProgramName : "Create a new program"}
      isEdit={isEdit}
      editBtnText={mode === "view" ? "Edit Program" : false}
      onClickEdit={handleClickEdit}
      onClickSave={handleClickSave}
      onClickCancel={handleClickCancel}
    >
      <div className={formStyles.formRow}>
        <div className={formStyles.formItem}>
          <label htmlFor="ProgramCode" className={formStyles.formLabel}>
            Program Code
          </label>
          <input
            type="text"
            id="ProgramCode"
            name="ProgramCode"
            className={formStyles.formInput}
            value={inputData.ProgramCode}
            onChange={handleUpdate}
            disabled={mode === "view"}
          />
        </div>

        <div className={formStyles.formItem}>
          <label htmlFor="ProgramName" className={formStyles.formLabel}>
            Program Name
          </label>
          <input
            type="text"
            id="ProgramName"
            name="ProgramName"
            className={formStyles.formInput}
            value={inputData.ProgramName}
            onChange={handleUpdate}
            disabled={mode === "view" && !isEdit}
          />
        </div>
      </div>

      <div className={formStyles.formRow}>
        <div className={formStyles.formItem}>
          <label htmlFor="ProgramDescription" className={formStyles.formLabel}>
            Program Description
          </label>
          <input
            type="text"
            id="ProgramDescription"
            name="ProgramDescription"
            className={formStyles.formInput}
            value={inputData.ProgramDescription}
            onChange={handleUpdate}
            disabled={mode === "view" && !isEdit}
          />
        </div>
      </div>
      {mode === "create" && (
        <div className={styles.buttonLayout}>
          <div className={styles.buttons}>
            <Button onClickBtn={handleCreate}>Create</Button>
            <Button onClickCancel={handleClickCancel}>Cancel</Button>
          </div>
        </div>
      )}
    </EditContainer>
  );
};

export default ProgramForm;
