import { useParams } from "react-router-dom";
import React, { useEffect, useState } from "react";
import { getStudentByStudentNo } from "../../services/apiStudent";
import StudentDetailForm from "../../components/Form/StudentDetailForm";

function StudentDetail() {
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

export default StudentDetail;
// import { useParams } from "react-router-dom";
// import React, { useEffect, useState } from "react";
// import { getStudentByStudentNo } from "../../services/apiStudent";
// import StudentDetailForm from "../../components/Form/StudentDetailForm";

// function StudentDetail() {
//   const { userNo } = useParams();
//   const [studentData, setStudentData] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);

//   useEffect(() => {
//     async function fetchData() {
//       if (!userNo) {
//         setError("Invalid user number");
//         setLoading(false);
//         return;
//       }

//       try {
//         const data = await getStudentByStudentNo(userNo);
//         if (data) {
//           setStudentData(data);
//         } else {
//           setError("No data found");
//         }
//       } catch (error) {
//         console.error("Failed to fetch student data:", error);
//         setError(error.message);
//       } finally {
//         setLoading(false);
//       }
//     }

//     fetchData();
//   }, [userNo]);

//   if (loading) {
//     return <div>Loading...</div>;
//   }

//   if (error) {
//     return <div>Error: {error}</div>;
//   }

//   if (!studentData || !studentData.Users) {
//     return <div>No student data available</div>;
//   }

//   return (
//     <div>
//       <h1>Student Details</h1>
//       <p>Name: {studentData.Users.FirstName}</p>
//       <StudentDetailForm studentData={studentData} onCancel={() => setStudentData(studentData)} />
//     </div>
//   );
// }

// export default StudentDetail;