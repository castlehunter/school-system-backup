import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { getStudents } from "../../services/apiStudent"; // API to fetch students
import { insertEnrollment } from "../../services/apiEnrollment"; // API to insert enrollment
import { getCourseDetail } from "../../services/apiCourse"; // API to fetch course details
import Button from "../../components/Button/Button"; // Your button component

function EnrollmentForm() {
  const { courseNo } = useParams(); // Get the courseNo from URL
  const [students, setStudents] = useState([]);
  const [selectedStudents, setSelectedStudents] = useState([]);
  const [course, setCourse] = useState(null);
  const [enrollmentDate, setEnrollmentDate] = useState(""); // State for enrollment date
  const [isFinished, setIsFinished] = useState(false); // State for isFinished

  // Fetch students when the component mounts
  useEffect(() => {
    const fetchStudents = async () => {
      try {
        const studentData = await getStudents();
        setStudents(studentData);
      } catch (error) {
        console.error("Error fetching students:", error);
      }
    };

    fetchStudents();
  }, []);

  // Fetch course details using courseNo
  useEffect(() => {
    const fetchCourseDetails = async () => {
      try {
        const courseData = await getCourseDetail({ params: { ID: courseNo } });
        setCourse(courseData);
      } catch (error) {
        console.error("Error fetching course details:", error);
      }
    };

    fetchCourseDetails();
  }, [courseNo]);

  // Handle checkbox change
  const handleCheckboxChange = (studentId) => {
    setSelectedStudents((prevSelected) => {
      if (prevSelected.includes(studentId)) {
        return prevSelected.filter((id) => id !== studentId); // Remove from selection
      } else {
        return [...prevSelected, studentId]; // Add to selection
      }
    });
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      for (const studentId of selectedStudents) {
        await insertEnrollment(studentId, course.CourseID, enrollmentDate, isFinished); // Include new fields in the API call
      }
      alert("Enrollment successful!");
      // Reset selections and fields if needed
      setSelectedStudents([]);
      setEnrollmentDate("");
      setIsFinished(false);
    } catch (error) {
      console.error("Failed to enroll students in courses:", error);
      alert("Failed to enroll students.");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      {course && <h2>Enroll Students in {course.CourseName}</h2>} {/* Display course name */}

      <div>
        <h3>Select Students:</h3>
        {students.map((student) => (
          <div key={student.StudentID}>
            <label>
              <input
                type="checkbox"
                value={student.StudentID}
                checked={selectedStudents.includes(student.StudentID)}
                onChange={() => handleCheckboxChange(student.StudentID)}
              />
              {student.Users.FirstName} {student.Users.LastName}
            </label>
          </div>
        ))}
      </div>

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
            onChange={() => setIsFinished((prev) => !prev)} // Toggle isFinished
          />
          Is Finished
        </label>
      </div>

      <Button type="submit">Enroll Selected Students</Button>
    </form>
  );
}

export default EnrollmentForm;
