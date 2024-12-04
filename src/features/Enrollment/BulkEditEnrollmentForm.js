import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { updateEnrollments } from "../../services/apiEnrollment";
import Button from "../../components/Button/Button";
import MainTitle from "../../ui/MainTitle/MainTitle.js";
import styles from "../../../src/components/Form/Form.module.css";
import EditContainer from "../../ui/Layout/EditContainer.js";

function BulkEditEnrollmentForm() {
  const location = useLocation();
  const navigate = useNavigate();
  const selectedIds = location.state?.selectedIds || []; // Handle cases where state is null
  const [enrollmentDate, setEnrollmentDate] = useState("");
  const [isFinished, setIsFinished] = useState(null); // null to indicate "Keep"

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      const updates = {};
      if (enrollmentDate) {
        updates.EnrollmentDate = enrollmentDate;
      }
      if (isFinished !== null) {
        updates.isFinished = isFinished;
      }
      if (Object.keys(updates).length) {
        await updateEnrollments(
          selectedIds,
          updates.isFinished,
          updates.EnrollmentDate
        );
        alert("Enrollments updated successfully!");
      } else {
        alert("No changes to update.");
      }
      navigate("/enrollments");
    } catch (error) {
      console.error("Error updating enrollments:", error);
      alert("Failed to update enrollments.");
    }
  };

  const handleCancel = () => {
    navigate("/enrollments");
  };

  if (!selectedIds.length) {
    return <div>No enrollments selected for bulk editing.</div>;
  }

  return (
    <>
      <MainTitle title="Bulk Edit Enrollments" goBack={true} />
      <EditContainer>
        <div>
          <p>(Keep unchanged to maintain current state)</p>
          <form onSubmit={handleUpdate}>
            <div>
              <label>
                Enrollment Date:
                <input
                  type="date"
                  value={enrollmentDate}
                  onChange={(e) => setEnrollmentDate(e.target.value)}
                  placeholder="Keep"
                  className="Form_formInput__xdpGx"
                />
              </label>
            </div>
            <div>
              <label>
                <input
                  type="checkbox"
                  checked={isFinished}
                  onChange={() =>
                    setIsFinished((prev) => (prev === null ? true : !prev))
                  } // Update to handle null state
                />
                Is Finished
              </label>
            </div>
            <div className={styles.buttons}>
              <Button size="large" type="submit">
                Update
              </Button>
              <Button size="large" type="button" onClick={handleCancel}>
                Cancel
              </Button>
            </div>
          </form>
        </div>
      </EditContainer>
    </>
  );
}

export default BulkEditEnrollmentForm;
