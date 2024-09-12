// ProfileForm.js
import React from "react";
import styles from "./Form.module.css";

function ProfileForm({ formData, handleChange, isEdit }) {
  return (
    <div>
      {Object.keys(formData).map((key) => (
        <div key={key} className={styles.formItem}>
          <label htmlFor={key} className={styles.formLabel}>
            {key.charAt(0).toUpperCase() + key.slice(1)}
          </label>
          {isEdit ? (
            <input
              type={key === "dob" ? "date" : "text"}
              name={key}
              value={formData[key]}
              onChange={handleChange}
              className={styles.formInput}
              readOnly={!isEdit}
            />
          ) : (
            <span className={styles.formText}>{formData[key]}</span>
          )}
        </div>
      ))}
    </div>
  );
}

export default ProfileForm;
