// src/components/AnnouncementList.js
import React, { useState, useEffect } from "react";
import AnnouncementTable from "./AnnouncementTable";
import TableContainer from "../../ui/Layout/TableContainer";
import MainTitle from "../../ui/MainTitle/MainTitle";
import { useLoaderData, useNavigation } from "react-router-dom";
import { getAnnouncements } from "../../services/apiAnnouncements";
import Loader from "../../ui/Loader";

function AnnouncementList() {
  const initialAnnouncementData = useLoaderData() || [];
  const [announcementData, setAnnouncementData] = useState(
    initialAnnouncementData
  );
  const navigation = useNavigation();
  const isLoading = navigation.state === "loading";
  const [currPage, setCurrPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  useEffect(() => {
    async function fetchData() {
      try {
        const data = await getAnnouncements();
        setAnnouncementData(data);
      } catch (error) {
        console.error("Failed to fetch announcement data:", error);
      }
    }

    fetchData();
  }, []);

  const totalPages = Math.ceil(announcementData.length / rowsPerPage);

  function handlePageChange(page) {
    setCurrPage(page);
  }

  function handleRowsPerPageChange(event) {
    setRowsPerPage(Number(event.target.value));
    setCurrPage(1);
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

export default AnnouncementList;
