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
  const [searchQuery, setSearchQuery] = useState("");

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

  function handleSearch(query) {
    setSearchQuery(query);
    if (query === "") {
      // If query is empty, reset the teacherData to initialTeachersData
      setTeacherData(initialTeachersData);
    } else {
      // Filter teacher data based on search query
      const filteredData = teacherData.filter((teacher) => {
        return (
          teacher.Users.FirstName.toLowerCase().includes(query.toLowerCase()) ||
          teacher.Users.Email.toLowerCase().includes(query.toLowerCase()) ||
          teacher.Users.PhoneNumber.toLowerCase().includes(
            query.toLowerCase()
          ) ||
          teacher.Users.LastName.toLowerCase().includes(query.toLowerCase())
        );
      });
      setTeacherData(filteredData);
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
        onSearch={handleSearch}
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
