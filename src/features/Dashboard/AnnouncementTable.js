// src/components/AnnouncementTable.js
import React, { useEffect, useState } from "react";
import generalStyles from "../../generalStyles.module.css";
import styles from "../../components/Table.module.css";
import { Link } from "react-router-dom";
import Loader from "../../ui/Loader";
import useCheckbox from "../../hooks/useCheckbox";

function AnnouncementTable({
  announcementData,
  rowsPerPage,
  currPage,
  isLoading,
}) {
  const {
    selectedCheckboxes,
    handleCheckboxes,
    isAllSelected,
    handleSelectAll,
  } = useCheckbox();

  const [role, setRole] = useState("");
  const currData = announcementData.slice(
    (currPage - 1) * rowsPerPage,
    currPage * rowsPerPage
  );

  useEffect(() => {
    const storedRole = localStorage.getItem("role");
    setRole(storedRole);
  }, []);
  return (
    <table className={styles.table}>
      <thead>
        <tr>
          <th>
            <input
              type="checkbox"
              checked={isAllSelected}
              onChange={() =>
                handleSelectAll(currData.map((announcement) => announcement.id))
              }
              className={styles.checkbox}
            />
          </th>
          <th>S/N</th>
          <th>Title</th>
          <th>Content</th>
          <th>Created At</th>
          <th>Action</th>
        </tr>
      </thead>
      <tbody>
        {isLoading ? (
          <Loader />
        ) : (
          currData.map((announcement, index) => (
            <tr key={announcement.id} className={styles.tr}>
              <td>
                <input
                  type="checkbox"
                  checked={selectedCheckboxes.includes(announcement.id)}
                  onChange={() => handleCheckboxes(announcement.id)}
                  className={styles.checkbox}
                />
              </td>

              <td>{index + 1 + (currPage - 1) * rowsPerPage}</td>
              <td>{announcement.Title}</td>
              <td>
                {announcement.Content.length > 100
                  ? `${announcement.Content.substring(0, 100)} ...`
                  : announcement.Content}
              </td>
              <td>{new Date(announcement.CreatedAt).toLocaleString()}</td>
              <td>
                <Link
                  to={`/announcements/${announcement.id}`}
                  className={generalStyles.link}
                >
                  View
                </Link>
                {role === "Admin" && (
                  <>
                    <span> | </span>

                    <Link
                      to={`/announcements/${announcement.id}/edit`}
                      className={generalStyles.link}
                    >
                      Edit
                    </Link>
                  </>
                )}
              </td>
            </tr>
          ))
        )}
      </tbody>
    </table>
  );
}

export default AnnouncementTable;
