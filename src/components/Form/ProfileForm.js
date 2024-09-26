import React, { useState } from "react";
import Button from "../Button/Button.js";
import styles from "./Form.module.css";

function ProfileForm({ type, isEdit, onFormSubmit, onCancel, No }) {
  const [formData, setFormData] = useState({
    FirstName: "",
    LastName: "",
    DateOfBirth: "",
    PhoneNumber: "",
    HomeAddress: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  return (
    <form className={styles.form} onSubmit={onFormSubmit}>
      <div className={styles.formItem}>
        <label htmlFor="ID" className={styles.formLabel}>
          {type} No
        </label>
        <span className={styles.formText}>{No}</span>
      </div>

      <div className={styles.formRow}>
        <div className={styles.formItem}>
          <label htmlFor="FirstName" className={styles.formLabel}>
            First Name
          </label>
          <input
            type="text"
            name="FirstName"
            value={formData.FirstName}
            onChange={handleChange}
            className={styles.formInput}
          />
        </div>
        <div className={styles.formItem}>
          <label htmlFor="LastName" className={styles.formLabel}>
            Last Name
          </label>
          <input
            type="text"
            name="LastName"
            value={formData.LastName}
            onChange={handleChange}
            className={styles.formInput}
          />
        </div>
      </div>

      <div className={styles.formRow}>
        <div className={styles.formItem}>
          <label htmlFor="dob" className={styles.formLabel}>
            DOB
          </label>
          <input
            type="date"
            name="DateOfBirth"
            value={formData.DateOfBirth}
            onChange={handleChange}
            className={styles.formInput}
          />
        </div>
        <div className={styles.formItem}>
          <label htmlFor="phoneNumber" className={styles.formLabel}>
            Phone Number
          </label>
          <input
            type="text"
            name="PhoneNumber"
            value={formData.PhoneNumber}
            onChange={handleChange}
            className={styles.formInput}
          />
        </div>
      </div>

      <div className={styles.formItem}>
        <label htmlFor="address" className={styles.formLabel}>
          Address
        </label>
        <input
          type="text"
          name="HomeAddress"
          value={formData.HomeAddress}
          onChange={handleChange}
          className={styles.formInput}
        />
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
