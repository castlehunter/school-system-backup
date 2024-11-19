import { useNavigate, useParams } from "react-router-dom";
import React, { useEffect, useState } from "react";
import { getStudentByUserNo } from "../../services/apiStudent";
import StudentDetailForm from "../../components/Form/StudentDetailForm";
import MainTitle from "../../ui/MainTitle/MainTitle";
import Loader from "../../ui/Loader";

function StudentDetail() {
  const { userNo } = useParams();
  const [studentData, setStudentData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchData() {
      try {
        setIsLoading(true);
        const data = await getStudentByUserNo(userNo);
        setStudentData(data);
      } catch (error) {
        console.error("Failed to fetch student data:", error);
      } finally {
        setIsLoading(false);
      }
    }
    fetchData();
  }, [userNo]);

  return (
    <>
      <MainTitle
        title={
          isLoading
            ? `Student Detail`
            : `Student Detail: ${studentData?.Users?.FirstName} ${studentData?.Users?.LastName}`
        }
        goBack={true}
      />
      <div>
        {isLoading ? (
          <Loader />
        ) : (
          <StudentDetailForm
            studentData={studentData}
            onCancel={() => setStudentData(studentData)}
          />
        )}
      </div>
    </>
  );
}

export default StudentDetail;
