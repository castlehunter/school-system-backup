import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import Button from "../../components/Button/Button";
import Loader from "../../ui/Loader";

function StudentConfirmed({ type }) {
  const [studentData, setStudentData] = useState(null);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);

  const { studentNo } = useParams();

  // useEffect(() => {
  //   if (!staffNo) {
  //     return;
  //   }

  //   async function fetchStaffData() {
  //     try {
  //       setError("");
  //       setIsLoading(true);
  //       const response = await fetch(
  //         `http://localhost:3900/api/staff/${staffNo}`
  //       );
  //       if (!response.ok) {
  //         throw new Error("Failed to fetch staff data");
  //       }
  //       const data = await response.json();

  //       const staffArray = data[0];

  //       const transformedData = {
  //         staffNo: staffArray[0],
  //         firstName: staffArray[1],
  //         lastName: staffArray[2],
  //         position: staffArray[3],
  //         sex: staffArray[4],
  //         dob: staffArray[5],
  //         salary: staffArray[6],
  //         branchNo: staffArray[7],
  //         telephone: staffArray[8],
  //         mobile: staffArray[9],
  //         email: staffArray[10],
  //       };
  //       setStudentData(transformedData);
  //     } catch (error) {
  //       setError(error.message);
  //     } finally {
  //       setIsLoading(false);
  //     }
  //   }

  //   fetchStaffData();
  // }, [staffNo]);

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (!studentData) {
    return <div>Loading...</div>;
  }

  return (
    <>
      {isLoading ? (
        <Loader />
      ) : (
        <>
          {type === "new" && <h1>Student Added</h1>}
          {type === "edit" && <h1>Student Updated</h1>}
          <div>
            <p>First Name: {studentData.firstName}</p>
            <p>Last Name: {studentData.lastName}</p>
            <p>Position: {studentData.position}</p>
            <p>Sex: {studentData.sex}</p>
            <p>DOB: {new Date(studentData.dob).toLocaleDateString()}</p>
            <p>Salary: {studentData.salary}</p>
            <p>Telephone: {studentData.telephone}</p>
            <p>Mobile: {studentData.mobile}</p>
            <p>Email: {studentData.email}</p>
          </div>
          <Button onClick={() => navigate("/dashboard/student/student-list")}>
            Go to Student List
          </Button>
        </>
      )}
    </>
  );
}

export default StudentConfirmed;
