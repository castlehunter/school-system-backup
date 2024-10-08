import React, { useState } from "react";
import styles from "./Form.module.css";

function EditCourseForm({ course, onSubmit, onCancel }) {  // Add onCancel prop
  const [courseName, setCourseName] = useState(course.CourseName);
  const [description, setDescription] = useState(course.Description);
  const [programID, setProgramID] = useState(course.ProgramID); 

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({ CourseName: courseName, Description: description, ProgramID: programID });
  };

  return (
    <form onSubmit={handleSubmit} className={styles.editForm}>
      <div>
        <label>Course Name:</label>
        <input
          type="text"
          value={courseName}
          onChange={(e) => setCourseName(e.target.value)}
          required
        />
      </div>
      <div>
        <label>Description:</label>
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
        />
      </div>
      <div>
        <label>Program ID:</label>
        <input
          type="text"
          value={programID}
          onChange={(e) => setProgramID(e.target.value)}
          required
        />
      </div>
      <button type="submit">Update Course</button>
      {/* Add onClick handler for the Cancel button */}
      <button type="button" onClick={onCancel}>Cancel</button> 
    </form>
  );
}

export default EditCourseForm;
