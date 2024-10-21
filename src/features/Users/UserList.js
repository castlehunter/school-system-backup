import React from "react";
import TableContainer from "../../ui/Layout/TableContainer";
import { useLoaderData } from "react-router-dom";
import { useState } from "react";
import UserTable from "./UserTable";
import MainTitle from "../../ui/MainTitle/MainTitle";

function UserList() {
  const userData = useLoaderData() || [];
  const [currPage, setCurrPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const totalPages = Math.ceil(userData.length / rowsPerPage);

  if (!userData || userData.length === 0) {
    return <p>No users found.</p>;
  }

  function handlePageChange(page) {
    setCurrPage(page);
  }

  function handleRowsPerPageChange(event) {
    setRowsPerPage(Number(event.target.value));
    setCurrPage(1);
  }

  return (
    <>
      <MainTitle title="User List" />
      <TableContainer
        title="All Users"
        rowsPerPage={rowsPerPage}
        totalPages={totalPages}
        currPage={currPage}
        onPageChange={handlePageChange}
        onRowsPerPageChange={handleRowsPerPageChange}
      >
        <UserTable
          data={userData}
          rowsPerPage={rowsPerPage}
          currPage={currPage}
        />
      </TableContainer>
    </>
  );
}

export default UserList;
