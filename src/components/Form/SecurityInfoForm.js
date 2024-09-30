import formStyles from "./Form.module.css";
import { useState, useEffect } from "react";

function SecurityInfoForm({ securityInfo, isEdit }) {
  const [inputData, setInputData] = useState({});

  useEffect(() => {
    setInputData(securityInfo);
  }, [securityInfo]);

  function handleInputChange(e) {
    const { name, value } = e.target;
    const updatedInputData = {
      ...inputData,
      [name]: value,
    };
    setInputData(updatedInputData);
  }

  return (
    <form>
      {/* UserName, Password */}
      <div className={formStyles.formRow}>
        <div className={formStyles.formItem}>
          <label htmlFor="username" className={formStyles.formLabel}>
            Username
          </label>
          <input
            type="text"
            id="username"
            className={formStyles.formInput}
            disabled={!isEdit}
            value={inputData.UserName}
            onChange={handleInputChange}
          />
        </div>
        <div className={formStyles.formItem}>
          <label htmlFor="password" className={formStyles.formLabel}>
            Password
          </label>
          <input
            type="password"
            id="password"
            className={formStyles.formInput}
            value={inputData.PasswordHash}
            onChange={handleInputChange}
            disabled={!isEdit}
          />
        </div>
      </div>
    </form>
  );
}

export default SecurityInfoForm;
