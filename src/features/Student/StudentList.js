import React, { useState, useEffect } from "react";
import StudentTable from "./StudentTable";
import TableContainer from "../../ui/Layout/TableContainer";
import Loader from "../../ui/Loader";
import { useLoaderData, useNavigation } from "react-router-dom";
import { getStudents } from "../../services/apiStudent";
function StudentList() {
  const initialStudentData = useLoaderData() || [];
  const [studentData, setStudentData] = useState(initialStudentData);
  const navigation = useNavigation();
  const isLoading = navigation.state === "loading";
  const [currPage, setCurrPage] = useState(1);

  const [rowsPerPage, setRowsPerPage] = useState(10);
  
  // use hook to fetch data
  useEffect(() => {
    async function fetchData() {
    
      try {
        const data = await getStudents();
        setStudentData(data);
      } catch (error) {
        console.error("Failed to fetch student data:", error);
      }
    }

    fetchData();
  }, []);

  const totalPages = Math.ceil(studentData.length / rowsPerPage);

  function handlePageChange(page) {
    setCurrPage(page);
  }

  function handleRowsPerPageChange(event) {
    setRowsPerPage(Number(event.target.value));
    setCurrPage(1);
  }

  return (
    <TableContainer
      title="All Students"
      rowsPerPage={rowsPerPage}
      totalPages={totalPages}
      currPage={currPage}
      onPageChange={handlePageChange}
      onRowsPerPageChange={handleRowsPerPageChange}
    >
      {isLoading ? (
        <Loader />
      ) : (
        <StudentTable
          studentData={studentData}
          rowsPerPage={rowsPerPage}
          currPage={currPage}
        />
      )}
    </TableContainer>
  );
}

export default StudentList;
