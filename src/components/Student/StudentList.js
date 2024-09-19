import React, { useState, useEffect } from "react";
import StudentTable from "./StudentTable";
import TableContainerLayout from "../../components/Layout/TableContainerLayout";

function StudentList() {
  const [studentData, setStudentData] = useState([]);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [currPage, setCurrPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const totalPages = Math.ceil(studentData.length / rowsPerPage);

  function handlePageChange(page) {
    setCurrPage(page);
  }

  function handleRowsPerPageChange(event) {
    setRowsPerPage(Number(event.target.value));
    setCurrPage(1);
  }

  useEffect(() => {
    async function fetchStudentData() {
      try {
        setIsLoading(true);
        setError(null);
        const response = await fetch("/data/students.json");

        if (!response.ok) {
          throw new Error("Failed to fetch student data");
        }
        const data = await response.json();

        // Update the transformedData to include program, courses, and registrationDate
        const transformedData = data.map((student) => ({
          studentNo: student.studentNo,
          fname: student.fname,
          lname: student.lname,
          program: student.program,
          sex: student.sex,
          dob: student.dob,
          telephone: student.telephone,
          mobile: student.mobile,
          email: student.email,
          address: student.address,
        }));

        setStudentData(transformedData);
      } catch (error) {
        console.error("Error fetching student data:", error);
        setError(error.message);
      } finally {
        setIsLoading(false);
      }
    }

    fetchStudentData();
  }, []);

  if (error) {
    return <div>Error: {error}</div>;
  }
  return (
    <TableContainerLayout
      title="All Students"
      rowsPerPage={rowsPerPage}
      totalPages={totalPages}
      currPage={currPage}
      onPageChange={handlePageChange}
      onRowsPerPageChange={handleRowsPerPageChange}
    >
      <StudentTable
        studentData={studentData}
        rowsPerPage={rowsPerPage}
        currPage={currPage}
        isLoading={isLoading}
      />
    </TableContainerLayout>
  );
}

export default StudentList;
