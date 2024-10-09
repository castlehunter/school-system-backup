import React, { useState, useEffect } from "react";
import { updateStudent } from "../../services/apiStudent";
import styles from "./Form.module.css";

function StudentDetailForm({ studentData, onCancel }) {
  const [inputData, setInputData] = useState({
    Role: "",
    UserName: "",
    FirstName: "",
    LastName: "",
    DateOfBirth: "",
    Email: "",
    PhoneNumber: "",
    HomeAddress: "",
  });
  const [isEdit, setIsEdit] = useState(false);

  useEffect(() => {
    if (studentData) {
      setInputData({
        Role: studentData.Role || "",
        UserName: studentData.UserName || "",
        FirstName: studentData.FirstName || "",
        LastName: studentData.LastName || "",
        DateOfBirth: studentData.DateOfBirth || "",
        Email: studentData.Email || "",
        PhoneNumber: studentData.PhoneNumber || "",
        HomeAddress: studentData.HomeAddress || "",
      });
    }
  }, [studentData]);

  function handleChange(e) {
    const { name, value } = e.target;
    setInputData((prev) => ({
      ...prev,
      [name]: value,
    }));
  }

  async function handleClickSave() {
    try {
      const response = await updateStudent(studentData.StudentNo, inputData);
      setIsEdit(false);
      if (response) {
        alert("Student information updated successfully!");
      } else {
        alert("Failed to update student information.");
      }
    } catch (error) {
      console.error("Error saving student data:", error);
      alert("An error occurred while saving the student data.");
    }
  }

  function handleClickEdit() {
    setIsEdit(true);
  }

  function handleClickCancel() {
    setIsEdit(false);
    onCancel();
  }

  return (
    <div className={styles.formContainer}>
      <form>
        <div>
          <label>Role:</label>
          <input
            type="text"
            name="Role"
            value={inputData.Role}
            onChange={handleChange}
            disabled={!isEdit}
          />
        </div>
        <div>
          <label>User Name:</label>
          <input
            type="text"
            name="UserName"
            value={inputData.UserName}
            onChange={handleChange}
            disabled={!isEdit}
          />
        </div>
        <div>
          <label>First Name:</label>
          <input
            type="text"
            name="FirstName"
            value={inputData.FirstName}
            onChange={handleChange}
            disabled={!isEdit}
          />
        </div>
        <div>
          <label>Last Name:</label>
          <input
            type="text"
            name="LastName"
            value={inputData.LastName}
            onChange={handleChange}
            disabled={!isEdit}
          />
        </div>
        <div>
          <label>Date of Birth:</label>
          <input
            type="date"
            name="DateOfBirth"
            value={inputData.DateOfBirth}
            onChange={handleChange}
            disabled={!isEdit}
          />
        </div>
        <div>
          <label>Email:</label>
          <input
            type="email"
            name="Email"
            value={inputData.Email}
            onChange={handleChange}
            disabled={!isEdit}
          />
        </div>
        <div>
          <label>Phone Number:</label>
          <input
            type="text"
            name="PhoneNumber"
            value={inputData.PhoneNumber}
            onChange={handleChange}
            disabled={!isEdit}
          />
        </div>
        <div>
          <label>Home Address:</label>
          <input
            type="text"
            name="HomeAddress"
            value={inputData.HomeAddress}
            onChange={handleChange}
            disabled={!isEdit}
          />
        </div>
        {isEdit ? (
          <>
            <button type="button" onClick={handleClickSave}>
              Save
            </button>
            <button type="button" onClick={handleClickCancel}>
              Cancel
            </button>
          </>
        ) : (
          <button type="button" onClick={handleClickEdit}>
            Edit
          </button>
        )}
      </form>
    </div>
  );
}

export default StudentDetailForm;