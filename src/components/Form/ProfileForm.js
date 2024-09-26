import React, { useState, useEffect } from "react";
import Button from "../Button/Button.js";
import styles from "./Form.module.css";

function ProfileForm({
  type,
  formData,
  isEdit,
  handleChange,
  onFormSubmit,
  onCancel,
}) {
  const [inputData, setInputData] = useState({
    FirstName: "",
    LastName: "",
    DateOfBirth: "",
    PhoneNumber: "",
    HomeAddress: "",
  });

  useEffect(() => {
    if (formData && formData.Users) {
      setInputData({
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

  return (
    <form className={styles.form} onSubmit={onFormSubmit}>
      <div className={styles.formItem}>
        <label htmlFor="No" className={styles.formLabel}>
          {type} No
        </label>
        <input
          type="text"
          name="No"
          value={formData[`${type}No`]}
          onChange={handleChange}
          className={styles.formText}
          disabled={true}
        />
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
            className={isEdit ? styles.formInput : styles.formText}
            disabled={!isEdit}
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
            className={isEdit ? styles.formInput : styles.formText}
            disabled={!isEdit}
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

      <div className={styles.formActions}>
        <Button classType="submit">Add</Button>
        <Button classType="cancel" onClick={onCancel}>
          Cancel
        </Button>
      </div>
    </form>
  );
}

export default ProfileForm;
