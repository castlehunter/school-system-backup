import React, { useState, useEffect } from "react";
import Button from "../Button/Button.js";
import styles from "./Form.module.css";

function ProfileForm({ type, formData, isEdit, onFormSubmit }) {
  const [inputData, setInputData] = useState({
    Role: "",
    UserName: "",
    FirstName: "",
    LastName: "",
    DateOfBirth: "",
    PhoneNumber: "",
    HomeAddress: "",
  });

  useEffect(() => {
    if (formData && formData.Users) {
      setInputData({
        Role: formData.Users.Roles.RoleName || "",
        UserName: formData.Users.UserName || "",
        FirstName: formData.Users.FirstName || "",
        LastName: formData.Users.LastName || "",
        DateOfBirth: formData.Users.DateOfBirth || "",
        PhoneNumber: formData.Users.PhoneNumber || "",
        HomeAddress: formData.Users.HomeAddress || "",
      });
    }
  }, [formData]);

  // Debug
  // console.log("Form Data is", formData);
  function handleChange(e) {
    const { name, value } = e.target;
    setInputData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  }

  return (
    <form className={styles.form} onSubmit={onFormSubmit}>
      <div className={styles.formRow}>
        <div className={styles.formItem}>
          <label htmlFor="Role" className={styles.formLabel}>
            Role
          </label>
          <input
            type="text"
            name="Role"
            value={inputData.Role}
            onChange={handleChange}
            className={styles.formText}
            disabled={true}
          />
        </div>
        <div className={styles.formItem}>
          <label htmlFor="UserName" className={styles.formLabel}>
            User Name
          </label>
          <input
            type="text"
            name="UserName"
            value={inputData.UserName}
            onChange={handleChange}
            className={styles.formText}
            disabled={true}
          />
        </div>
      </div>

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
            className={styles.formText}
            disabled
          />
        </div>
        <div className={styles.formItem}>
          <label htmlFor="LastName" className={styles.formLabel}>
            Last Name
          </label>
          <input
            type="text"
            name="LastName"
            value={inputData.LastName}
            onChange={handleChange}
            className={styles.formText}
            disabled
          />
        </div>
      </div>

      <div className={styles.formRow}>
        <div className={styles.formItem}>
          <label htmlFor="DateOfBirth" className={styles.formLabel}>
            DateOfBirth
          </label>
          <input
            type="text"
            name="DateOfBirth"
            value={inputData.DateOfBirth}
            onChange={handleChange}
            className={isEdit ? styles.formInput : styles.formText}
            disabled={!isEdit}
          />
        </div>
        <div className={styles.formItem}>
          <label htmlFor="PhoneNumber" className={styles.formLabel}>
            Phone Number
          </label>
          <input
            type="text"
            name="PhoneNumber"
            value={inputData.PhoneNumber}
            onChange={handleChange}
            className={isEdit ? styles.formInput : styles.formText}
            disabled={!isEdit}
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
            value={inputData.HomeAddress}
            onChange={handleChange}
            className={isEdit ? styles.formInput : styles.formText}
            disabled={!isEdit}
          />
        </div>
      </div>
    </form>
  );
}

export default ProfileForm;
