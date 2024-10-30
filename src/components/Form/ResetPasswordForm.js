import React, { useState } from "react";
import formStyles from "../Form/Form.module.css";
import generalStyles from "../../generalStyles.module.css";
import EditContainer from "../../ui/Layout/EditContainer";
import Button from "../../components/Button/Button.js";
import icons from "../../ui/Icons/icons.js";
import { updatePassword } from "../../services/apiUser.js";
import { useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";

function ResetPasswordForm({ data }) {
  const navigate = useNavigate();
  const location = useLocation();
  const { username } = location.state;

  const [error, setError] = useState("");
  const [inputData, setInputData] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  async function handleClickReset() {
    if (inputData.newPassword !== inputData.confirmPassword) {
      alert("New password and confirm password do not match.");
      return;
    }
    try {
      const response = await updatePassword(
        username,
        inputData.currentPassword,
        inputData.newPassword
      );

      console.log("response", response);
      if (response && response.error) {
        alert("Failed to update password.");
        console.error("Failed to update password:", response.error);
      } else {
        alert("Password updated successfully!");
        console.log("Password updated successfully!", response);
      }
    } catch (error) {
      console.error("Error saving password data:", error);
      alert("An error occurred while saving data.");
    }
  }

  function handleClickCancel() {
    navigate(-1);
  }

  function handleUpdate(e) {
    const { name, value } = e.target;
    setInputData((prevInputData) => ({ ...prevInputData, [name]: value }));
  }

  return (
    <EditContainer>
      <div className={formStyles.form}>
        <div className={formStyles.formRow}>
          <div className={formStyles.formItem}>
            <label htmlFor="userName" className={formStyles.formLabel}>
              User Name
            </label>
            <div className={formStyles.passwordContainer}>
              <input
                type="text"
                id="userName"
                name="username"
                className={formStyles.formInput}
                value={username}
                disabled
              />
            </div>
          </div>
        </div>

        <div className={formStyles.formRow}>
          <div className={formStyles.formItem}>
            <label htmlFor="currentPassword" className={formStyles.formLabel}>
              Current Password
            </label>
            <div className={formStyles.passwordContainer}>
              <input
                type={showCurrentPassword ? "text" : "password"}
                id="currentPassword"
                name="currentPassword"
                className={formStyles.formInput}
                value={inputData.currentPassword}
                autoComplete="off"
                onChange={handleUpdate}
              />
              <span
                className={formStyles.eyeIcon}
                onClick={() => setShowCurrentPassword((prev) => !prev)}
              >
                {showCurrentPassword ? icons.EyeOff : icons.EyeOpen}
              </span>
            </div>
          </div>
        </div>
        <div className={formStyles.formRow}>
          <div className={formStyles.formItem}>
            <label htmlFor="newPassword" className={formStyles.formLabel}>
              New Password
            </label>
            <div className={formStyles.passwordContainer}>
              <input
                type={showNewPassword ? "text" : "password"}
                id="newPassword"
                name="newPassword"
                className={formStyles.formInput}
                value={inputData.newPassword}
                onChange={handleUpdate}
              />
              <span
                className={formStyles.eyeIcon}
                onClick={() => setShowNewPassword((prev) => !prev)}
              >
                {showNewPassword ? icons.EyeOff : icons.EyeOpen}
              </span>
            </div>
          </div>
        </div>
        <div className={formStyles.formRow}>
          <div className={formStyles.formItem}>
            <label htmlFor="confirmPassword" className={formStyles.formLabel}>
              Confirm Password
            </label>
            <div className={formStyles.passwordContainer}>
              <input
                type={showConfirmPassword ? "text" : "password"}
                id="confirmPassword"
                name="confirmPassword"
                className={formStyles.formInput}
                value={inputData.confirmPassword}
                onChange={handleUpdate}
              />
              <span
                className={formStyles.eyeIcon}
                onClick={() => setShowConfirmPassword((prev) => !prev)}
              >
                {showConfirmPassword ? icons.EyeOff : icons.EyeOpen}
              </span>
            </div>
          </div>
        </div>
        <div className={generalStyles.bottomButtons}>
          <Button onClickBtn={handleClickReset}>Reset Password</Button>
          <Button onClickBtn={handleClickCancel}>Cancel</Button>
        </div>
      </div>
    </EditContainer>
  );
}

export default ResetPasswordForm;
