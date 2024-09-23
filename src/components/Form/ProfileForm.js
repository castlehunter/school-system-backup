import React from "react";
import styles from "./Form.module.css";

// ProfileForm can be used on profiles for teachers/students
function ProfileForm({ formData, handleChange, isEdit, formWidth }) {
  return (
    <div className={formWidth}>
      {Object.keys(formData)
        .filter((key) => key !== "program")
        .map((key) => (
          <div key={key} className={styles.formItem}>
            <label htmlFor={key} className={styles.formLabel}>
              {key.charAt(0).toUpperCase() + key.slice(1)}{" "}
            </label>

            {key === "sex" ? (
              <SexField
                isEdit={isEdit}
                value={formData[key]}
                onChange={handleChange}
              />
            ) : key === "studentNo" ? (
              <span className={styles.formText}>{formData[key]}</span>
            ) : (
              <InputField
                isEdit={isEdit}
                keyName={key}
                value={formData[key]}
                onChange={handleChange}
              />
            )}
          </div>
        ))}
    </div>
  );
}

function SexField({ isEdit, value, onChange }) {
  if (isEdit) {
    return (
      <select value={value} onChange={onChange} className={styles.formSelect}>
        {["Prefer not to say", "Female", "Male", "Non-binary"].map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
    );
  } else {
    return <span className={styles.formText}>{value}</span>;
  }
}

function InputField({ isEdit, keyName, value, onChange }) {
  if (isEdit) {
    return (
      <input
        type={keyName === "dob" ? "date" : "text"}
        name={keyName}
        value={value}
        onChange={onChange}
        className={styles.formInput}
        readOnly={!isEdit}
      />
    );
  } else {
    return <span className={styles.formText}>{value}</span>;
  }
}

export default ProfileForm;
