import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { updateEnrollments } from "../../services/apiEnrollment.js";
import Button from "../../components/Button/Button.js";
import MainTitle from "../../ui/MainTitle/MainTitle.js";
import styles from "../../../src/components/Form/Form.module.css";
import EditContainer from "../../ui/Layout/EditContainer.js";

function UpdateEnrollmentStatus() {
  const location = useLocation();
  const navigate = useNavigate();
  const [enrollmentDate, setEnrollmentDate] = useState("");
  const [isFinished, setIsFinished] = useState(null);

  const handleUpdate = async (e) => {
    e.preventDefault();
  };

  const handleCancel = () => {
    navigate("/enrollments");
  };

  return (
    <>
      <MainTitle title="Update Enrollment Status" goBack={true} />
      <EditContainer>
        <div>
          <form onSubmit={handleUpdate}>
            <div className={styles.formRow}>
              <div className={styles.formItem}>
                <label> Is Finished </label>
                <input
                  type="checkbox"
                  checked={isFinished}
                  onChange={() =>
                    setIsFinished((prev) => (prev === null ? true : !prev))
                  } // Update to handle null state
                />
              </div>
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

export default UpdateEnrollmentStatus;
