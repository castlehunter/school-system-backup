import React from "react";
import styles from "./Form.module.css";

function ProfileForm({ formData, handleChange, isEdit, formWidth }) {
  return (
    <div className={formWidth}>
      {Object.keys(formData)
        .filter((key) => key !== "program")
        .map((key) => (
          <div key={key} className={styles.formItem}>
            <label htmlFor={key} className={styles.formLabel}>
              {key.charAt(0).toUpperCase() + key.slice(1)}
            </label>
            {key === "sex" ? (
              isEdit ? (
                <select
                  name={key}
                  value={formData[key]}
                  onChange={handleChange}
                  className={styles.formSelect}
                  disabled={!isEdit}
                >
                  {["Female", "Male", "Non-binary", "Prefer not to say"].map(
                    (option) => (
                      <option key={option} value={option}>
                        {option}
                      </option>
                    )
                  )}
                </select>
              ) : (
                <span className={styles.formText}>{formData[key]}</span>
              )
            ) : key === "studentNo" ? (
              <span className={styles.formText}>{formData[key]}</span>
            ) : isEdit ? (
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
