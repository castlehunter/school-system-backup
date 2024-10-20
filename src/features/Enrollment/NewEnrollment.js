import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getEnrollmentDetails, updateEnrollment } from "../../services/apiEnrollment";
import Button from "../../components/Button/Button";

function EnrollmentForm() {
  const { EnrollmentID } = useParams();
  const navigate = useNavigate();
  const [enrollment, setEnrollment] = useState(null);
  const [enrollmentDate, setEnrollmentDate] = useState("");
  const [isFinished, setIsFinished] = useState(false);

  useEffect(() => {
    const fetchEnrollment = async () => {
      try {
        const data = await getEnrollmentDetails(EnrollmentID);
        setEnrollment(data);
        setEnrollmentDate(data.EnrollmentDate);
        setIsFinished(data.isFinished);
      } catch (error) {
        console.error("Error fetching enrollment details:", error);
      }
    };
    fetchEnrollment();
  }, [EnrollmentID]);

  const handleUpdate = async (e) => {
    console.log('handleupdate');
    e.preventDefault();
    try {
      await updateEnrollment(EnrollmentID, enrollmentDate, isFinished);
      alert("Enrollment updated successfully!");
      navigate("/enrollments/enrollment-list");
    } catch (error) {
      console.error("Error updating enrollment:", error);
      alert("Failed to update enrollment.");
    }
  };

  const handleCancel = () => {
    console.log('handleCancel');
    navigate("/enrollments/enrollment-list");
  };

  if (!enrollment) return <div>Loading...</div>;

  return (
    <div>
      <h1>Student Name : {`${enrollment.Students.Users.FirstName} ${enrollment.Students.Users.LastName}`}</h1>
      <h2>Course Name : {`${enrollment.Courses.CourseName}`}</h2>
      <form onSubmit={handleUpdate}>
        <div>
          <label>
            Enrollment Date:
            <input
              type="date"
              value={enrollmentDate}
              onChange={(e) => setEnrollmentDate(e.target.value)}
              required
            />
          </label>
        </div>
        <div>
          <label>
            <input
              type="checkbox"
              checked={isFinished}
              onChange={() => setIsFinished((prev) => !prev)}
            />
            Is Finished
          </label>
        </div>
        <Button type="submit">Update</Button>
        <Button type="button" onClick={handleCancel}>Cancel</Button>
      </form>
    </div>
  );
}

export default EnrollmentForm;
