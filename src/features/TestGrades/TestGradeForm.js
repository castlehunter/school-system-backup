import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getTestGradeByID, updateTestGrade } from "../../services/apiTestGrade.js";
import Loader from "../../ui/Loader";

function UpdateGradeForm() {
  const { gradeID } = useParams();
  const [grade, setGrade] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchGrade() {
      try {
        setIsLoading(true);
        setError(null);
        const data = await getTestGradeByID(gradeID);
        setGrade(data);
      } catch (error) {
        console.error("Error fetching grade:", error);
        setError(error.message);
      } finally {
        setIsLoading(false);
      }
    }
    fetchGrade();
  }, [gradeID]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setGrade((prevGrade) => ({ ...prevGrade, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await updateTestGrade(gradeID, grade);
      navigate("/test-grades"); // Redirect to the grades list page after updating
    } catch (error) {
      console.error("Failed to update grade:", error);
      setError(error.message);
    }
  };

  if (isLoading) return <Loader />;
  if (error) return <div>Error: {error}</div>;

  return (
    <form onSubmit={handleSubmit}>
      <h1>Update Grade</h1>
      <label>
        Quiz 1:
        <input type="number" name="Quizz1" value={grade.Quizz1} onChange={handleChange} />
      </label>
      <label>
        Quiz 2:
        <input type="number" name="Quizz2" value={grade.Quizz2} onChange={handleChange} />
      </label>
      <label>
        Quiz 3:
        <input type="number" name="Quizz3" value={grade.Quizz3} onChange={handleChange} />
      </label>
      <label>
        Quiz 4:
        <input type="number" name="Quizz4" value={grade.Quizz4} onChange={handleChange} />
      </label>
      <label>
        Quiz 5:
        <input type="number" name="Quizz5" value={grade.Quizz5} onChange={handleChange} />
      </label>
      <label>
        Midterm:
        <input type="number" name="Midterm" value={grade.Midterm} onChange={handleChange} />
      </label>
      <label>
        Final:
        <input type="number" name="Final" value={grade.Final} onChange={handleChange} />
      </label>
      <label>
        Average Grade:
        <input type="number" name="AverageGrade" value={grade.AverageGrade} onChange={handleChange} />
      </label>
      <label>
        Passed:
        <select name="isPassed" value={grade.isPassed} onChange={handleChange}>
          <option value={true}>Yes</option>
          <option value={false}>No</option>
        </select>
      </label>
      <button type="submit">Update Grade</button>
    </form>
  );
}

export default UpdateGradeForm;
