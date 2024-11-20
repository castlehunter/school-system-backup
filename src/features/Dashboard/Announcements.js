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

  // useEffect(() => {
  //   async function fetchData() {
  //     try {
  //       const data = await getAnnouncements();
  //       setAnnouncementData(data);
  //     } catch (error) {
  //       console.error("Failed to fetch announcement data:", error);
  //     }
  //   }

  //   fetchData();
  // }, []);

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
      >
        {isLoading ? (
          <Loader />
        ) : (
          <AnnouncementTable
            announcementData={announcementData}
            rowsPerPage={rowsPerPage}
            currPage={currPage}
          />
        )}
      </TableContainer>
    </>
  );
}

export default Announcements;
