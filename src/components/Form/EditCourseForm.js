import React, { useState } from "react";
import styles from "./Form.module.css";
import Button from "../Button/Button";

function EditCourseForm({ course, onSubmit, onCancel, teachers }) {
  const [courseName, setCourseName] = useState(course.CourseName);
  const [description, setDescription] = useState(course.Description);
  const [teacherID, setTeacherID] = useState(course.TeacherID);

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({ CourseName: courseName, Description: description, TeacherID: teacherID });
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
      
      {/* Non-editable ProgramID and ProgramName */}
      <div>
        <label>Program ID:</label>
        <input
          type="text"
          value={course.ProgramID}
          readOnly
        />
      </div>
      <div>
        <label>Program Name:</label>
        <input
          type="text"
          value={course.Programs.ProgramName}
          readOnly
        />
      </div>

      <div>
        <label>Teacher:</label>
        {teachers && teachers.length > 0 ? (
          <select value={teacherID} onChange={(e) => setTeacherID(e.target.value)} required>
            {teachers.map((teacher) => (
              <option key={teacher.TeacherID} value={teacher.TeacherID}>
                {teacher.Users.FirstName} {teacher.Users.LastName}
              </option>
            ))}
          </select>
        ) : (
          <p>No teachers found or loading...</p>
        )}
      </div>

      <Button type="submit">Update Course</Button>
      <button className="btn btn-secondary" type="button" onClick={onCancel}>
        Cancel
      </button>
    </form>
  );
}

export default EditCourseForm;
