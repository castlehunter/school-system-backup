import React from "react";
import TableContainer from "../../ui/Layout/TableContainer";
import { useLoaderData } from "react-router-dom";
import { useState } from "react";
import TeacherTable from "./TeacherTable";
import MainTitle from "../../ui/MainTitle/MainTitle";
import { getTeachers, sortTeachersBy } from "../../services/apiTeacher";

function TeacherList() {
  const initialTeachersData = useLoaderData() || [];
  const [teacherData, setTeacherData] = useState(initialTeachersData);
  const [currPage, setCurrPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const totalPages = Math.ceil(initialTeachersData.length / rowsPerPage);

  if (!initialTeachersData || initialTeachersData.length === 0) {
    return <p>No teachers found.</p>;
  }

  function handlePageChange(page) {
    setCurrPage(page);
  }

  function handleRowsPerPageChange(event) {
    setRowsPerPage(Number(event.target.value));
    setCurrPage(1);
  }

  async function handleSort(fieldName) {
    try {
      const sortedData = await sortTeachersBy(fieldName);
      setTeacherData(sortedData);
    } catch (error) {
      console.error("Error sorting user table:", error);
    }
  }

  return (
    <>
      <MainTitle title="Teacher List" />
      <TableContainer
        rowsPerPage={rowsPerPage}
        totalPages={totalPages}
        currPage={currPage}
        onPageChange={handlePageChange}
        onRowsPerPageChange={handleRowsPerPageChange}
        onClickSort={handleSort}
        sortOptions={[
          "User No",
          "First Name",
          "Last Name",
          "Date Of Birth",
          "Created At",
        ]}
      >
        <TeacherTable
          data={teacherData}
          rowsPerPage={rowsPerPage}
          currPage={currPage}
        />
      </TableContainer>
    </>
  );
}

export default TeacherList;
