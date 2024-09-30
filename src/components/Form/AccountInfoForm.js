import Container from "../../ui/Layout/Container";
import formStyles from "./Form.module.css";
import avatar from "../../assets/user-avatar-account.jpg";
import { getUserById } from "../../services/apiUser";
import { useState, useEffect } from "react";
import Button from "../Button/Button";

function AccountInfoForm({ accountInfo, isEdit }) {
  const [inputData, setInputData] = useState({});

  useEffect(() => {
    setInputData(accountInfo);
  }, [accountInfo]);

  function handleInputChange(e) {
    const { name, value } = e.target;
    const updatedAccount = {
      ...inputData,
      [name]: value,
    };
    setInputData(updatedAccount);
  }

  return (
    <div>
      <form>
        {/* Role, Admin Privilege */}
        <div className={formStyles.formRow}>
          <div className={formStyles.formItem}>
            <label htmlFor="role-name" className={formStyles.formLabel}>
              Role
            </label>
            <input
              type="text"
              id="role-name"
              className={formStyles.formInput}
              disabled={!isEdit}
              value={inputData.RoleName}
            />
          </div>{" "}
          <div className={formStyles.formItem}>
            <label htmlFor="admin-privilege" className={formStyles.formLabel}>
              Admin Privilege
            </label>
            <select value={inputData.IsAdmin} className={formStyles.formInput}>
              <option value="Yes">Yes</option>
              <option value="No">No</option>
            </select>
          </div>
        </div>

        {/* CreateAt, LockAccount */}
        <div className={formStyles.formRow}>
          <div className={formStyles.formItem}>
            <label htmlFor="created-at" className={formStyles.formLabel}>
              Account Created At
            </label>
            <input
              type="text"
              id="created-at"
              className={formStyles.formInput}
              disabled={!isEdit}
              value={inputData.CreatedAt}
            />
          </div>
          <div className={formStyles.formItem}>
            <label htmlFor="last-login-date" className={formStyles.formLabel}>
              Last Login Date/Time
            </label>
            <input
              type="text"
              id="last-login-date"
              className={formStyles.formInput}
              disabled={!isEdit}
              value={inputData.LastLoginDate}
            />
          </div>{" "}
        </div>

        <div className={formStyles.formRow}>
          <div className={formStyles.formItem}>
            <label htmlFor="lock-account" className={formStyles.formLabel}>
              Account Status(this field show lock or not)
            </label>
            <select value={inputData.IsAdmin} className={formStyles.formInput}>
              <option value="Active">Active</option>
              <option value="Locked">Locked</option>
            </select>
          </div>
          <div className={formStyles.formItem}>
            <label
              htmlFor="failed-password-attempts"
              className={formStyles.formLabel}
            >
              Failed Password Attempts
            </label>
            <input
              type="text"
              id="failed-password-attempts"
              className={formStyles.formInput}
              disabled="true"
              value={inputData.FailedPasswordAttempts}
            />
          </div>
        </div>
      </form>
    </div>
  );
}

export default AccountInfoForm;
