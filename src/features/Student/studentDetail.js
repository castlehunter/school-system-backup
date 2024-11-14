import { useNavigate, useParams } from "react-router-dom";
import React, { useEffect, useState } from "react";
import { getStudentByStudentNo } from "../../services/apiStudent";
import StudentDetailForm from "../../components/Form/StudentDetailForm";
import MainTitle from "../../ui/MainTitle/MainTitle";

function StudentDetail() {
  const { userNo } = useParams();
  const [studentData, setStudentData] = useState(null);
  const navigate = useNavigate();

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
    <>
      <MainTitle
        title={`Student Detail: ${studentData?.Users?.FirstName} ${studentData?.Users?.LastName}`}
        prevPath={() => navigate("/students/student-list")}
      />
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
    </>
  );
}

export default StudentDetail;
