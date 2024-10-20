import React from "react";
import generalStyles from "../../generalStyles.module.css";
import styles from "../../components/Table.module.css";
import useCheckbox from "../../hooks/useCheckbox";

function TestGradeTable({ testGradeData }) {
  const {
    isAllSelected,
    handleSelectAll,
    selectedCheckboxes,
    handleCheckboxes,
  } = useCheckbox();

  const currData = testGradeData; // Assuming pagination is not required

  return (
    <table className={styles.table}>
      <thead>
        <tr>
          <th>
            <input
              type="checkbox"
              checked={isAllSelected}
              onChange={() =>
                handleSelectAll(currData.map((element) => element.StudentID))
              }
              className={styles.checkbox}
            />
          </th>
          <th>Course Name</th>
          <th>Quiz 1</th>
          <th>Quiz 2</th>
          <th>Quiz 3</th>
          <th>Quiz 4</th>
          <th>Quiz 5</th>
          <th>Midterm</th>
          <th>Final</th>
          <th>Average Grade</th>
          <th>Passed</th>
        </tr>
      </thead>
      <tbody>
        {currData.map((grade, index) => (
          <tr key={index} className={styles.tr}>
            <td>
              <input
                type="checkbox"
                checked={selectedCheckboxes.includes(grade.StudentID)}
                onChange={() => handleCheckboxes(grade.StudentID)}
                className={styles.checkbox}
              />
            </td>
            <td>{grade.Courses.CourseName}</td>
            <td>{grade.Quizz1}</td>
            <td>{grade.Quizz2}</td>
            <td>{grade.Quizz3}</td>
            <td>{grade.Quizz4}</td>
            <td>{grade.Quizz5}</td>
            <td>{grade.Midterm}</td>
            <td>{grade.Final}</td>
            <td>{grade.AverageGrade}</td>
            <td>{grade.isPassed ? "Yes" : "No"}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export default TestGradeTable;
