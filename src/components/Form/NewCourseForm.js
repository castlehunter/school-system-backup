import React, { useState, useEffect } from "react";
import Button from "../Button/Button.js";
import Container from "../../ui/Layout/Container.js";
import styles from "./Form.module.css";
function NewCourseForm({ type, formData, isEdit, onFormSubmit }) {
  const [inputData, setInputData] = useState({
    CourseID: "",
    CourseName: "",
    Description: "",
    TeacherName: "",
    Program: "",
  });

  function handleChange() {}

  return (
    <Container title="New Course" headingType="primaryHeading">
      <form className={styles.form} onSubmit={onFormSubmit}>
        <div className={styles.formRow}>
          <div className={styles.formItem}>
            <label htmlFor="CourseID" className={styles.formLabel}>
              Course ID
            </label>
            <input
              type="text"
              name="CourseID"
              value={inputData.CourseID}
              onChange={handleChange}
              className={styles.formInput}
              disabled={true}
            />
          </div>
        </div>
        <div className={styles.formRow}>
          <div className={styles.formItem}>
            <label htmlFor="CourseName" className={styles.formLabel}>
              Course Name
            </label>
            <input
              type="text"
              name="CourseName"
              value={inputData.CourseName}
              onChange={handleChange}
              className={styles.formInput}
            />
          </div>
        </div>
        <div className={styles.formRow}>
          <div className={styles.formItem}>
            <label htmlFor="Description" className={styles.formLabel}>
              Description
            </label>
            <input
              type="text"
              name="Description"
              value={inputData.Description}
              onChange={handleChange}
              className={styles.formInput}
            />
          </div>
        </div>
        <div className={styles.formRow}>
          <div className={styles.formItem}>
            <label htmlFor="TeacherName" className={styles.formLabel}>
              Last Name
            </label>
            <input
              type="text"
              name="TeacherName"
              value={inputData.TeacherName}
              onChange={handleChange}
              className={styles.formInput}
            />
          </div>
        </div>
        <div className={styles.formRow}>
          <div className={styles.formItem}>
            <label htmlFor="Program" className={styles.formLabel}>
              Program
            </label>
            <input
              type="text"
              name="Program"
              value={inputData.Program}
              onChange={handleChange}
              className={isEdit ? styles.formInput : styles.formInput}
            />
          </div>
        </div>
      </form>
    </Container>
  );
}

export default NewCourseForm;
