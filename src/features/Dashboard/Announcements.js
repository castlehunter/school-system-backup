// src/components/AnnouncementList.js
import React, { useState, useEffect } from "react";
import AnnouncementTable from "./AnnouncementTable";
import TableContainer from "../../ui/Layout/TableContainer";
import MainTitle from "../../ui/MainTitle/MainTitle";
import { useLoaderData, useNavigation } from "react-router-dom";
import { getAnnouncements } from "../../services/apiAnnouncements";
import Loader from "../../ui/Loader";
import { useNavigate } from "react-router-dom";
import Button from "../../components/Button/Button";
import useCheckbox from "../../hooks/useCheckbox";
import { deleteAnnouncements } from "../../services/apiAnnouncements";

function Announcements() {
  const initialAnnouncementData = useLoaderData() || [];
  const [announcementData, setAnnouncementData] = useState(
    initialAnnouncementData
  );
  const navigation = useNavigation();
  const isLoading = navigation.state === "loading";
  const [currPage, setCurrPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      const userNo = localStorage.getItem("loginUserNo");
      const data = await getAnnouncements(userNo);
      setAnnouncementData(data);
    };

    fetchData();
  }, []);

  const {
    selectedCheckboxes,
    handleCheckboxes,
    isAllSelected,
    handleSelectAll,
  } = useCheckbox();

  const totalPages = Math.ceil(announcementData.length / rowsPerPage);

  function handlePageChange(page) {
    setCurrPage(page);
  }

  function handleRowsPerPageChange(event) {
    setRowsPerPage(Number(event.target.value));
    setCurrPage(1);
  }

  function handleAddBtn() {
    navigate("/dashboard/announcements/new-announcement");
  }

  function handleBulkDelete() {
    const selectedIds = selectedCheckboxes;

    if (selectedIds.length === 0) {
      alert("Please select at least one announcement to delete.");
      return;
    }

    const confirmDelete = window.confirm(
      "Are you sure you want to delete the selected announcements?"
    );

    if (confirmDelete) {
      deleteAnnouncements(selectedIds)
        .then(() => {
          setAnnouncementData((prevData) =>
            prevData.filter(
              (announcement) => !selectedIds.includes(announcement.Id)
            )
          );
          alert("Selected announcements deleted successfully.");
        })
        .catch((error) => {
          console.error("Failed to delete announcements:", error);
          alert("Failed to delete selected announcements.");
        });
    }
  }

  return (
    <>
      <MainTitle title="Announcements" />
      <TableContainer
        rowsPerPage={rowsPerPage}
        totalPages={totalPages}
        currPage={currPage}
        onPageChange={handlePageChange}
        onRowsPerPageChange={handleRowsPerPageChange}
        onClickAddBtn={handleAddBtn}
        onClickBulkDeleteBtn={handleBulkDelete}
      >
        {isLoading ? (
          <Loader />
        ) : (
          <AnnouncementTable
            announcementData={announcementData}
            rowsPerPage={rowsPerPage}
            currPage={currPage}
            isAllSelected={isAllSelected}
            handleSelectAll={handleSelectAll}
            selectedCheckboxes={selectedCheckboxes}
            handleCheckboxes={handleCheckboxes}
          />
        )}
      </TableContainer>
    </>
  );
}

export default Announcements;
