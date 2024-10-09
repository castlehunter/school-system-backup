import React, { useState, useEffect } from "react";
import Button from "../Button/Button.js";
import Container from "../../ui/Layout/Container.js";
import styles from "./Form.module.css";
import { getTeachers} from "../../services/apiTeacher.js"; // Import API calls
import { getProgramList} from "../../services/apiProgram.js"; // Import API calls
import { useNavigate } from "react-router-dom";

function NewCourseForm({ type, formData, isEdit, onFormSubmit }) {
  const [inputData, setInputData] = useState({
    CourseID: "",
    CourseName: "",
    Description: "",
    TeacherName: "",
    Program: "",
  });

  const [teachers, setTeachers] = useState([]);
  const [programs, setPrograms] = useState([]);

  const navigate = useNavigate(); 

  useEffect(() => {
    async function fetchData() {
      try {
        const teacherData = await getTeachers();
        const programData = await getProgramList();
        setTeachers(teacherData);
        setPrograms(programData);
      } catch (error) {
        console.error("Failed to fetch data:", error);
      }
    }
    fetchData();
  }, []);

  function handleChange(e) {
    const { name, value } = e.target;
    setInputData((prev) => ({
      ...prev,
      [name]: value,
    }));
  }

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
            <textarea
              name="Description"
              value={inputData.Description}
              onChange={handleChange}
              className={styles.formInput}
              required
            />
          </div>
        </div>

        <div className={styles.formRow}>
          <div className={styles.formItem}>
            <label htmlFor="TeacherName" className={styles.formLabel}>
              Teacher
            </label>
            <select
              name="TeacherName"
              value={inputData.TeacherName}
              onChange={handleChange}
              className={styles.formInput}
              required
            >
              <option value="">Select a Teacher</option>
              {teachers.map((teacher) => (
                <option key={teacher.UserNo} value={teacher.UserNo}>
                  {teacher.Users.FirstName} {teacher.Users.LastName}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className={styles.formRow}>
          <div className={styles.formItem}>
            <label htmlFor="Program" className={styles.formLabel}>
              Program
            </label>
            <select
              name="Program"
              value={inputData.Program}
              onChange={handleChange}
              className={styles.formInput}
              required
            >
              <option value="">Select a Program</option>
              {programs.map((program) => (
                <option key={program.ProgramNo} value={program.ProgramNo}>
                  {program.ProgramName}
                </option>
              ))}
            </select>
          </div>
        </div>

        <Button type="submit">Submit</Button>
        <Button type="button" onClick={() => navigate("/course/course-list")}>
          Cancel
        </Button>
      </form>
    </Container>
  );
}

export default NewCourseForm;