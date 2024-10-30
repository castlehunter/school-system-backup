import React, { useState, useEffect } from "react";
import Button from "../Button/Button.js";
import styles from "./Form.module.css";
import { CreateMultipleUsers, CreateUser } from "../../services/apiUser.js";
import EditContainer from "../../ui/Layout/EditContainer.js";
import ModalBox from "../ModalBox/ModalBox.js";
import * as XLSX from "xlsx";

const initialInputData = {
    UserName: "",
    PasswordHash: "",
    FirstName: "",
    LastName: "",
    DateOfBirth: "",
    PhoneNumber: "",
    HomeAddress: "",
    IsAdmin: Boolean,
    RoleName: "",
    SecurityQuestion:"",
    SecurityAnswer: "",
};

function ProfileForm({ type, formData, isEdit, onFormSubmit }) {
  const [inputData, setInputData] = useState( initialInputData/*{
    UserName: "",
    PasswordHash: "",
    FirstName: "",
    LastName: "",
    DateOfBirth: "",
    PhoneNumber: "",
    HomeAddress: "",
    IsAdmin: Boolean,
    RoleName: "",
    SecurityQuestion:"",
    SecurityAnswer: "",
  }*/);

  const [excelData, setExcelData] = useState([]);

  useEffect(() => {
    if (formData && formData.Users) {
      setInputData({
        UserName: formData.Users.UserName || "",
        PasswordHash: formData.Users.PasswordHash || "",
        FirstName: formData.Users.FirstName || "",
        LastName: formData.Users.LastName || "",
        DateOfBirth: formData.Users.DateOfBirth || "",
        PhoneNumber: formData.Users.PhoneNumber || "",
        HomeAddress: formData.Users.HomeAddress || "",
        IsAdmin: formData.Users.IsAdmin || false,
        RoleName: formData.Users.RoleName || "",
        SecurityQuestion: formData.Users.SecurityQuestion || "",
        SecurityAnswer: formData.Users.SecurityAnswer || "",
      });
    }
  }, [formData]);

  // implement modal functionality
  const [isModalOpen, setIsModalOpen] = useState(false);

  function handleOpenModal() {
    setIsModalOpen(true);
  }

  function handleCloseModal() {
    setIsModalOpen(false);
  }

  // Debug
  // console.log("Form Data is", formData);

  function handleChange(e) {
    const { name, value } = e.target;
    setInputData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  }

  function handleFileUpload(e) {
    const file = e.target.files[0];
    if (!file) {
      console.error("No file selected");
      return;
    }
  
    //console.log("File selected:", file); // Debug: Check the selected file
  
    var reader = new FileReader();
    reader.onload = (event) => {
      const arrayBuffer = event.target.result;
      const workbook = XLSX.read(arrayBuffer, { type: "array", cellDates: true });
  
      const sheetName = workbook.SheetNames[0];
      const sheet = workbook.Sheets[sheetName];
  
      const rawData = XLSX.utils.sheet_to_json(sheet, { header: 1 });

      if (rawData.length < 2) {
        console.error("No data rows found in Excel file.");
        return;
      }
  
      const headers = rawData[0];
      const dataRows = rawData.slice(1);
  
      // Map each row to an object using the headers
      const formattedData = dataRows.map((row) => {
        const rowObj = {};
        headers.forEach((header, index) => {
          rowObj[header] = row[index];
        });
        return rowObj;
      });
      setExcelData(formattedData);
    };
  
    reader.onerror = () => {
      console.error("Failed to read file");
    };

    reader.readAsArrayBuffer(file);

  }

  function insertDataExcel(e) {
    e.preventDefault();

    console.log(excelData);
    CreateMultipleUsers(excelData)
      .then((response) => {
        if(response == true)
          handleOpenModal();
      })
      .catch((error) => {
        console.error("Error inserting data:", error);
      })
  }

  function handleSubmit(e) {
    e.preventDefault();

    const newUser = {
      Username: inputData.UserName,
      password: inputData.PasswordHash,
      RoleName: inputData.RoleName,
      email: inputData.Email,
      CreateAt: new Date().toISOString(),
      isAdmin: inputData.IsAdmin,
      address: inputData.HomeAddress,
      dob: inputData.DateOfBirth,
      phone: inputData.PhoneNumber,
      firstName: inputData.FirstName,
      lastName: inputData.LastName,
      SecurityQuestion: inputData.SecurityQuestion,
      SecurityAnswer: inputData.SecurityAnswer,
    };
    console.log(newUser);
    // Call CreateUser from apiUser.js
    CreateUser(newUser)
      .then((response) => {
        if(response == true)
          handleOpenModal();
      })
      .catch((error) => {
        console.error("Error creating user:", error);
      });
  }
  //
  return (
    <EditContainer>
      <form onSubmit={handleSubmit} className={styles.form}>
        <div className={styles.formRow}>
          <div className={styles.formItem}>
            <label htmlFor="FirstName" className={styles.formLabel}>
              FirstName
            </label>
            <input
              type="text"
              name="FirstName"
              value={inputData.FirstName}
              onChange={handleChange}
              className={styles.formInput}
              disabled={isModalOpen}
            />
          </div>
          <div className={styles.formItem}>
            <label htmlFor="LastName" className={styles.formLabel}>
              Last Name
            </label>
            <input
              type="text"
              name="LastName"
              className={styles.formInput}
              value={inputData.LastName}
              onChange={handleChange}
              disabled={isModalOpen}
            />
          </div>
        </div>

        <div className={styles.formRow}>
          <div className={styles.formItem}>
            <label htmlFor="DateOfBirth" className={styles.formLabel}>
              DateOfBirth
            </label>
            <input
              type="date"
              name="DateOfBirth"
              className={styles.formInput}
              value={inputData.DateOfBirth}
              onChange={handleChange}
              disabled={isModalOpen}
            />
          </div>
          <div className={styles.formItem}>
            <label htmlFor="PhoneNumber" className={styles.formLabel}>
              Phone Number
            </label>
            <input
              type="text"
              name="PhoneNumber"
              className={styles.formInput}
              value={inputData.PhoneNumber}
              onChange={handleChange}
              disabled={isModalOpen}
            />
          </div>
        </div>

        <div className={styles.formRow}>
          <div className={styles.formItem}>
            <label htmlFor="HomeAddress" className={styles.formLabel}>
              Home Address
            </label>
            <input
              type="text"
              name="HomeAddress"
              className={styles.formInput}
              value={inputData.HomeAddress}
              onChange={handleChange}
              disabled={isModalOpen}
            />
          </div>
        </div>

        <div className={styles.formItem}>
          <label htmlFor="Email" className={styles.formLabel}>
            Email
          </label>
          <input
            type="email"
            name="Email"
            className={styles.formInput}
            value={inputData.Email}
            onChange={handleChange}
            disabled={isModalOpen}
          />
        </div>

        <div>
          <div className={styles.formRow}>
            <div className={styles.formItem}>
              <label htmlFor="UserName" className={styles.formLabel}>
                Username
              </label>
              <input
                type="text"
                id="username"
                name="UserName"
                className={styles.formInput}
                value={inputData.UserName}
                onChange={handleChange}
                disabled={isModalOpen}
              />
            </div>
            <div className={styles.formItem}>
              <label htmlFor="PasswordHash" className={styles.formLabel}>
                Password
              </label>
              <input
                type="password"
                id="password"
                name="PasswordHash"
                className={styles.formInput}
                value={inputData.PasswordHash}
                onChange={handleChange}
                disabled={isModalOpen}
              />
            </div>
          </div>
        </div>
        <div className={styles.formRow}>
          <div className={styles.formItem}>
            <label htmlFor="SecurityQuestion" className={styles.formLabel}>
              Security Question
            </label>
            <input
              type="text"
              name="SecurityQuestion"
              value={inputData.SecurityQuestion}
              onChange={handleChange}
              className={styles.formInput}
              disabled={isModalOpen}
            />
          </div>
          </div>
          <div className={styles.formRow}>
          <div className={styles.formItem}>
            <label htmlFor="SecurityAnswer" className={styles.formLabel}>
              Security Answer
            </label>
            <input
              type="text"
              name="SecurityAnswer"
              value={inputData.SecurityAnswer}
              onChange={handleChange}
              className={styles.formInput}
              disabled={isModalOpen}
            />
          </div>
          </div>
        <div className={styles.formRow}>
          <div className={styles.formItem}>
            <label htmlFor="RoleName" className={styles.formLabel}>
              Role
            </label>
            <select
              value={inputData.RoleName}
              className={styles.formInput}
              name="RoleName"
              onChange={handleChange}
              disabled={isModalOpen}
            >
              <option>Select a role</option>
              <option value={"Admin"}>Admin</option>
              <option value={"Advisor"}>Advisor</option>
              <option value={"Student"}>Student</option>
              <option value={"Teacher"}>Teacher</option>
            </select>
          </div>{" "}
          <div className={styles.formItem}>
            <label htmlFor="isAdmin" className={styles.formLabel}>
              Is Admin
            </label>
            <select
              value={inputData.IsAdmin}
              className={styles.formInput}
              name="IsAdmin"
              onChange={handleChange}
              disabled={isModalOpen}
            >
              <option>Select an option</option>
              <option value={true}>Yes</option>
              <option value={false}>No</option>
            </select>
          </div>
        </div>
        
        <div className={styles.buttonLayout}>
          <div className={styles.buttons}>
            <Button onClickBtn={handleSubmit}>Create</Button>
            <Button onClickBtn={() => setInputData(initialInputData)}>Cancel</Button>
          </div>
        </div>
      </form>

      <div>
          <h1>Insert Data from Excel to Supabase</h1>

          {/* File input for Excel upload */}
          <input type="file" accept=".xlsx, .xls" onChange={handleFileUpload} />

          <Button onClickBtn={insertDataExcel}>
             Insert data
          </Button>
        </div>

      {isModalOpen && (
        <div className={styles.modal}>
          <ModalBox handleCloseModal={handleCloseModal} />
        </div>
      )}
    </EditContainer>
  );
}

export default ProfileForm;
