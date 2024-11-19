import React, { useEffect, useState } from "react";
import generalStyles from "../../generalStyles.module.css";
import styles from "../../components/Table.module.css";
import { Link } from "react-router-dom";
import Loader from "../../ui/Loader";
import useCheckbox from "../../hooks/useCheckbox";
import { addUserNoToReadBy } from "../../services/apiAnnouncements";
import { useUnreadCount } from "../../contexts/UnreadContext";
import { getUnreadAnnouncementsCount } from "../../services/apiAnnouncements";

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

  const { unreadCount, setUnreadCount } = useUnreadCount();
  const [role, setRole] = useState("");

  const currData = announcementData.slice(
    (currPage - 1) * rowsPerPage,
    currPage * rowsPerPage
  );

  useEffect(() => {
    const storedRole = localStorage.getItem("role");
    setRole(storedRole);
  }, []);

  async function handleClickAnnouncement(announcementId) {
    const userNo = localStorage.getItem("UserNo");
    if (!userNo) {
      console.error("User No is not available.");
      return;
    }

    try {
      const success = await addUserNoToReadBy(announcementId, userNo);
      if (success) {
        const count = await getUnreadAnnouncementsCount(userNo);
        setUnreadCount(count);
      }
    } catch (error) {
      console.error("Failed to mark as read:", error);
    }
  }

  return (
    <table className={styles.table}>
      <thead>
        <tr>
          <th>
            <input
              type="checkbox"
              checked={isAllSelected}
              onChange={() =>
                handleSelectAll(currData.map((announcement) => announcement.Id))
              }
              className={styles.checkbox}
            />
          </th>
          <th>S/N</th>
          <th>Status</th>
          <th>Title</th>
          <th>Content</th>
          <th>Created At</th>
          <th>Publisher</th>
          <th>Action</th>
        </tr>
      </thead>
      <tbody>
        {isLoading ? (
          <Loader />
        ) : (
          currData.map((announcement, index) => (
            <tr key={announcement.Id} className={styles.tr}>
              <td>
                <input
                  type="checkbox"
                  checked={selectedCheckboxes.includes(announcement.Id)}
                  onChange={() => handleCheckboxes(announcement.Id)}
                  className={styles.checkbox}
                />
              </td>
              <td>{index + 1 + (currPage - 1) * rowsPerPage}</td>
              <td>
                <span
                  className={
                    announcement.isUnread
                      ? styles.unreadBadge
                      : styles.readBadge
                  }
                >
                  {announcement.isUnread ? "Unread" : "Read"}
                </span>
              </td>
              <td>{announcement.Title}</td>
              <td>
                {announcement.Content.length > 100
                  ? `${announcement.Content.substring(0, 100)} ...`
                  : announcement.Content}
              </td>
              <td>{new Date(announcement.CreatedAt).toLocaleString()}</td>
              <td>
                {announcement.Users
                  ? `${announcement.Users.FirstName} ${announcement.Users.LastName}`
                  : "Unknown Publisher"}
              </td>
              <td>
                {role === "Admin" || role === "Advisor" ? (
                  <Link
                    to={`/dashboard/announcements/${announcement.Id}`}
                    className={generalStyles.link}
                    onClick={() => handleClickAnnouncement(announcement.Id)}
                  >
                    View/Edit
                  </Link>
                ) : (
                  <span
                    className={generalStyles.link}
                    onClick={() => handleClickAnnouncement(announcement.Id)}
                  >
                    View
                  </span>
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
