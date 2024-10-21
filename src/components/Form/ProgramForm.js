import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import styles from "../../features/Profile.module.css";
import generalStyles from "../../generalStyles.module.css";
import formStyles from "../Form/Form.module.css";
import EditContainer from "../../ui/Layout/EditContainer";
import Button from "../../components/Button/Button.js";
import { updateProgram } from "../../services/apiProgram.js";

const ProgramForm = ({ data }) => {
  const [isEdit, setIsEdit] = useState(false);
  const [inputData, setInputData] = useState({
    ProgramCode: "",
    ProgramName: "",
    ProgramDescription: "",
  });

  console.log("Program Form", data);
  // Update inputData when data prop changes
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
    // Optionally reset form data when cancelling edit
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

  return (
    <EditContainer
      title={inputData.ProgramName}
      editBtnText="Edit Program"
      isEdit={isEdit}
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
            disabled
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
            disabled={!isEdit}
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
            disabled={!isEdit}
          />
        </div>
      </div>

      <br />
    </EditContainer>
  );
};

ProgramForm.propTypes = {
  data: PropTypes.shape({
    ProgramCode: PropTypes.string,
    ProgramName: PropTypes.string,
    ProgramDescription: PropTypes.string,
  }).isRequired,
};

export default ProgramForm;
