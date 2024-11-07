// src/components/AnnouncementTable.js
import React from "react";
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

  const currData = announcementData.slice(
    (currPage - 1) * rowsPerPage,
    currPage * rowsPerPage
  );

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
          <th>User ID</th>
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
              <td>{announcement.Content}</td>
              <td>{new Date(announcement.created_at).toLocaleString()}</td>
              <td>{announcement.user_id}</td>
              <td>
                <Link
                  to={`/announcements/${announcement.id}`}
                  className={generalStyles.link}
                >
                  View
                </Link>
                <span> | </span>
                <Link
                  to={`/announcements/${announcement.id}/edit`}
                  className={generalStyles.link}
                >
                  Edit
                </Link>
              </td>
            </tr>
          ))
        )}
      </tbody>
    </table>
  );
}

export default AnnouncementTable;
