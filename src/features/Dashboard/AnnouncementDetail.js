import { useNavigate, useParams } from "react-router-dom";
import React, { useEffect, useState } from "react";
import {
  getAnnouncementById,
  updateAnnouncement,
} from "../../services/apiAnnouncements";
import Loader from "../../ui/Loader";
import EditContainer from "../../ui/Layout/EditContainer";
import ModalContainer from "../../ui/Layout/ModalContainer";
import Button from "../../components/Button/Button";
import styles from "../../components/Form/Form.module.css";
import MainTitle from "../../ui/MainTitle/MainTitle";

function AnnouncementDetail() {
  const { id } = useParams();
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const navigate = useNavigate();

  // State to store input values for the edit form
  const [inputData, setInputData] = useState({
    Title: "",
    Content: "",
  });

  // Fetch data based on the ID
  useEffect(() => {
    async function fetchData() {
      try {
        setIsLoading(true);
        const data = await getAnnouncementById(id);
        console.log("Fetched announcement data:", data);
        setData(data);
        // Set initial values for input fields if the data is available
        if (data) {
          setInputData({
            Title: data.Title,
            Content: data.Content,
          });
        }
      } catch (error) {
        console.error("Failed to fetch announcement data:", error);
      } finally {
        setIsLoading(false);
      }
    }
    fetchData();
  }, [id]);

  const role = localStorage.getItem("role");

  // Handle editing toggle
  function handleEdit() {
    setIsEdit(true); // Open the modal for editing
  }

  // Handle cancel
  function handleCancel() {
    setIsEdit(false); // Close the modal
  }

  // Handle input change
  function handleChange(event) {
    const { name, value } = event.target;
    setInputData((prev) => ({
      ...prev,
      [name]: value,
    }));
  }

  async function handleUpdate(event) {
    event.preventDefault();
    try {
      const updatedAnnouncement = {
        Id: id,
        Title: inputData.Title,
        Content: inputData.Content,
        CreatedAt: data.CreatedAt,
        UserID: data.UserID,
      };
      const response = await updateAnnouncement(updatedAnnouncement);
      if (response) {
        setData(response); // Update the announcement data after successful update
        setIsEdit(false); // Close the modal after update
      }
    } catch (error) {
      console.error("Failed to update announcement:", error);
    }
  }

  return (
    <div>
      <MainTitle
        prevPath={() => navigate("/dashboard/announcements")}
        title={`Announcement at ${new Date(
          data?.CreatedAt
        ).toDateString()}, ${new Date(data?.CreatedAt).toLocaleTimeString()}`}
      />
      <EditContainer
        title={data?.Title}
        editButtonText={role === "Admin" || role === "Advisor" ? "Edit" : false}
        onClickEdit={handleEdit}
        onClickCancel={handleCancel}
      >
        {isLoading ? (
          <Loader />
        ) : (
          <>
            <pre>{data?.Content}</pre>
            {/* <div>{new Date(data?.CreatedAt).toLocaleString()}</div> */}
          </>
        )}
      </EditContainer>

      {isEdit && (
        <ModalContainer onClose={handleCancel}>
          <form onSubmit={handleUpdate} className={styles.form}>
            <div className={styles.formRow}>
              <div className={styles.formItem}>
                <label htmlFor="Title" className={styles.formLabel}>
                  Title
                </label>
                <input
                  type="text"
                  name="Title"
                  value={inputData.Title}
                  onChange={handleChange}
                  className={styles.formInput}
                />
              </div>
            </div>

            <div className={styles.formRow}>
              <div className={styles.formItem}>
                <label htmlFor="Content" className={styles.formLabel}>
                  Content
                </label>
                <textarea
                  name="Content"
                  value={inputData.Content}
                  rows={20}
                  style={{ height: "auto" }}
                  onChange={handleChange}
                  className={styles.formInput}
                />
              </div>
            </div>

            <div className={styles.bottomButtons}>
              <Button type="submit">Update</Button>
              <Button type="button" onClickBtn={handleCancel}>
                Cancel
              </Button>
            </div>
          </form>
        </ModalContainer>
      )}
    </div>
  );
}

export default AnnouncementDetail;
