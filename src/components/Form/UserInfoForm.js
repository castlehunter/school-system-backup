import EditContainer from "../../ui/Layout/EditContainer";
import formStyles from "./Form.module.css";
import avatar from "../../assets/user-avatar-account.jpg";
import { useState, useEffect } from "react";
import Button from "../Button/Button";

function UserInfoForm({ userInfo, isEdit, onInputChange }) {
  const [inputData, setInputData] = useState({});

  useEffect(() => {
    setInputData(userInfo);
  }, [userInfo]);

  function handleChange(e) {
    const { name, value } = e.target;
    const updatedData = {
      ...inputData,
      [name]: value,
    };
    setInputData(updatedData);
    onInputChange(updatedData);
  }

  return (
    <div className={formStyles.sectionLayout}>
      <div className={formStyles.avatar}>
        <img src={avatar} alt="user avatar" />
        <Button>Upload Picture</Button>
      </div>
      <form>
        <div className={formStyles.formRow}>
          <div className={formStyles.formItem}>
            <label htmlFor="firstName" className={formStyles.formLabel}>
              First Name
            </label>
            <input
              type="text"
              id="firstName"
              name="FirstName"
              className={formStyles.formInput}
              disabled={!isEdit}
              value={inputData.FirstName}
              onChange={handleChange}
            />
          </div>
          <div className={formStyles.formItem}>
            <label htmlFor="lastName" className={formStyles.formLabel}>
              Last Name
            </label>
            <input
              type="text"
              id="lastName"
              name="LastName"
              className={formStyles.formInput}
              disabled={!isEdit}
              value={inputData.LastName}
              onChange={handleChange}
            />
          </div>
        </div>
        <div className={formStyles.formRow}>
          <div className={formStyles.formItem}>
            <label htmlFor="phone" className={formStyles.formLabel}>
              Phone
            </label>
            <input
              type="phone"
              id="phone"
              name="PhoneNumber"
              className={formStyles.formInput}
              disabled={!isEdit}
              value={inputData.PhoneNumber}
              onChange={handleChange}
            />
          </div>
          <div className={formStyles.formItem}>
            <label htmlFor="email" className={formStyles.formLabel}>
              Email
            </label>
            <input
              type="email"
              id="email"
              name="Email"
              className={formStyles.formInput}
              disabled={!isEdit}
              value={inputData.Email}
              onChange={handleChange}
            />
          </div>
        </div>
        <div className={formStyles.formItem}>
          <label htmlFor="dob" className={formStyles.formLabel}>
            Date of Birth
          </label>
          <input
            type="date"
            id="dob"
            name="DateOfBirth"
            className={formStyles.formInput}
            disabled={!isEdit}
            value={inputData.DateOfBirth}
            onChange={handleChange}
          />
        </div>
        <div className={formStyles.formItem}>
          <label htmlFor="address" className={formStyles.formLabel}>
            Home Address
          </label>
          <input
            type="text"
            id="address"
            name="HomeAddress"
            className={formStyles.formInput}
            disabled={!isEdit}
            value={inputData.HomeAddress}
            onChange={handleChange}
          />
        </div>
      </form>
    </div>
  );
}

export default UserInfoForm;
