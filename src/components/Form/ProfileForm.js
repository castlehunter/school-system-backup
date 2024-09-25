import React from "react";
import styles from "./Form.module.css";

// ProfileForm can be used on profiles for teachers/students
function ProfileForm({ type, formData = {}, handleChange, isEdit }) {
  const user = formData.Users || {};

  return (
    <div className={styles.formLayout}>
      {/* First Row: student/teacher No */}
      <div className={styles.formItem}>
        <label htmlFor="ID" className={styles.formLabel}>
          {type} No ~1. need a user-friendly ID. column, 2.this number is auto
          generated
        </label>
        <span className={styles.formText}>{`${
          formData[type + "ID"] || "N/A"
        }`}</span>
      </div>

      {/* Second Row: FirstName, LastName */}
      <div className={styles.formRow}>
        <div className={styles.formItem}>
          <label htmlFor="FirstName" className={styles.formLabel}>
            First Name
          </label>
          <InputField
            isEdit={isEdit}
            keyName="FirstName"
            value={user.FirstName || ""}
            onChange={handleChange}
          />
        </div>
        <div className={styles.formItem}>
          <label htmlFor="LastName" className={styles.formLabel}>
            Last Name
          </label>
          <InputField
            isEdit={isEdit}
            keyName="LastName"
            value={user.LastName || ""}
            onChange={handleChange}
          />
        </div>
      </div>

      {/* Third Row: dob, phoneNumber */}
      <div className={styles.formRow}>
        <div className={styles.formItem}>
          <label htmlFor="dob" className={styles.formLabel}>
            DOB
          </label>
          <InputField
            isEdit={isEdit}
            keyName="dob"
            value={user.DateOfBirth || ""}
            onChange={handleChange}
          />
        </div>
        <div className={styles.formItem}>
          <label htmlFor="phoneNumber" className={styles.formLabel}>
            Phone Number
          </label>
          <InputField
            isEdit={isEdit}
            keyName="phoneNumber"
            value={user.PhoneNumber || ""}
            onChange={handleChange}
          />
        </div>
      </div>

      {/* Fourth Row: address */}
      <div className={styles.formItem}>
        <label htmlFor="address" className={styles.formLabel}>
          Address
        </label>
        <InputField
          isEdit={isEdit}
          keyName="address"
          value={user.HomeAddress || ""}
          onChange={handleChange}
        />
      </div>
    </div>
  );
}

function InputField({ isEdit, keyName, value, onChange }) {
  return isEdit ? (
    <input
      type={keyName === "dob" ? "date" : "text"}
      name={keyName}
      value={value}
      onChange={onChange}
      className={styles.formInput}
    />
  ) : (
    <span className={styles.formText}>{value || "N/A"}</span>
  );
}

export default ProfileForm;
