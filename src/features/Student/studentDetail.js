import { useParams } from "react-router-dom";
import React, { useEffect, useState } from "react";
import { getStudentByStudentNo } from "../../services/apiStudent";
import StudentDetailForm from "../../components/Form/StudentDetailForm";

function StudentDetail() {
  const { studentID } = useParams();
  const [studentData, setStudentData] = useState(null);

  useEffect(() => {
    async function fetchData() {
      try {
        const data = await getStudentByStudentNo(studentID);
        setStudentData(data);
      } catch (error) {
        console.error("Failed to fetch student data:", error);
      }
    }

    fetchData();
  }, [studentID]);

  return (
    <div>
      {studentData ? (
        <StudentDetailForm
          studentData={studentData}
          onCancel={() => setStudentData(studentData)}
        />
      ) : (
        <div>Loading...</div>
      )}
    </div>
  );
}

export default StudentDetail;