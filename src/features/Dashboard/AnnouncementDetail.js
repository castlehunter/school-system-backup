import { useParams } from "react-router-dom";
import React, { useEffect, useState } from "react";
import { getStudentByStudentNo } from "../../services/apiStudent";
import StudentDetailForm from "../../components/Form/StudentDetailForm";

function AnnoucementDetail() {
  const { userNo } = useParams();
  const [studentData, setStudentData] = useState(null);

  useEffect(() => {
    async function fetchData() {
      try {
        const data = await getStudentByStudentNo(userNo);
        setStudentData(data);
      } catch (error) {
        console.error("Failed to fetch student data:", error);
      }
    }

    fetchData();
  }, [userNo]);

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

export default AnnoucementDetail;
