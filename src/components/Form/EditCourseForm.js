import React, { useState } from "react";
//import styles from "./EditCourseForm.module.css"; // Import styles
import styles from "./Form.module.css";

function EditCourseForm({ course, onSubmit }) {
  const [courseName, setCourseName] = useState(course.CourseName);
  const [description, setDescription] = useState(course.Description);
  const [programID, setProgramID] = useState(course.ProgramID); // Assuming ProgramID exists

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({ CourseName: courseName, Description: description, ProgramID: programID }); // Prepare data for submission
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
    </form>
  );
}

export default EditCourseForm;
