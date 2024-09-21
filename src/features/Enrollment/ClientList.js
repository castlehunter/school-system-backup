import React, { useState, useEffect } from "react";
import styles from "../StaffList.module.css";
import ClientTable from "./ClientTable";
import Pagination from "../Pagination";

function ClientList() {
  const [clientData, setClientData] = useState([]);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [currPage, setCurrPage] = useState(1);
  const rowsPerPage = 5;
  const totalPages = Math.ceil(clientData.length / rowsPerPage);

  function handlePageChange(page) {
    setCurrPage(page);
  }

  useEffect(() => {
    async function fetchClientData() {
      try {
        setIsLoading(true);
        setError("");
        const response = await fetch(
          "http://localhost:3900/api/client/client-list"
        );
        if (!response.ok) {
          throw new Error("Failed to fetch client list");
        }
        const data = await response.json();

        // Convert the array to an object with key-value
        const transformedData = data.map((client) => ({
          clientNo: client[0],
          fname: client[1],
          lname: client[2],
          telno: client[3],
          street: client[4],
          city: client[5],
          email: client[6],
          preftype: client[7],
          maxrent: client[8],
        }));

        setClientData(transformedData);
      } catch (error) {
        console.error("Error fetching client list:", error);
        setError(error.message);
      } finally {
        setIsLoading(false);
      }
    }

    fetchClientData();
  }, []);

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className={styles.staffListContainer}>
      {/* <Sidebar /> */}
      <main className={styles.mainContent}>
        {/* <Header title="Staff Main Menu" userName="Otor John" /> */}
        <section className={styles.contentWrapper}>
          {/* <SearchFilter totalStaff={250} /> */}
          <ClientTable
            isLoading={isLoading}
            clientData={clientData}
            rowsPerPage={rowsPerPage}
            currPage={currPage}
          />
          <Pagination
            totalPages={totalPages}
            currPage={currPage}
            onPageChange={handlePageChange}
          />
        </section>
      </main>
    </div>
  );
}

export default ClientList;
