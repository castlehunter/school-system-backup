import EditContainer from "../../ui/Layout/EditContainer";
import formStyles from "./Form.module.css";
import avatar from "../../assets/user-avatar-account.jpg";
import { useState, useEffect } from "react";
import Button from "../Button/Button";
import { getProfileInfoByNo } from "../../services/apiUser";
import { UpdatePersonalInfo } from "../../services/apiUser";

function ProfileInfoForm({ userNo, showEditButton }) {
  const [inputData, setInputData] = useState({
    FirstName: "",
    LastName: "",
    PhoneNumber: "",
    Email: "",
    HomeAddress: "",
    DateOfBirth: "",
  });
  const [isEdit, setIsEdit] = useState(false);

  useEffect(() => {
    async function getMyAccount() {
      try {
        const {
          FirstName,
          LastName,
          PhoneNumber,
          Email,
          HomeAddress,
          DateOfBirth,
        } = await getProfileInfoByNo(userNo);

        setInputData({
          FirstName,
          LastName,
          PhoneNumber,
          Email,
          HomeAddress,
          DateOfBirth,
        });
      } catch (error) {
        console.log(error);
      }
    }
    getMyAccount();
  }, []);

  function handleChange(e) {
    const { name, value } = e.target;
    const updatedData = {
      ...inputData,
      [name]: value,
    };
    setInputData(updatedData);
  }

  function handleClickEdit(e) {
    e.preventDefault();
    setIsEdit((isEdit) => !isEdit);
  }

  function handleClickCancel() {
    setIsEdit((prev) => !prev);
  }

  async function handleClickSave() {
    try {
      const response = await UpdatePersonalInfo(userNo, inputData);
      setIsEdit(false);
      if (response) {
        alert("User information updated successfully!");

        console.log("User updated successfully!", response);
      } else {
        alert("Failed to update user information.");
        console.error("Failed to update user information.");
      }
    } catch (error) {
      console.error("Error saving user data:", error);
      alert("An error occurred while saving the user data.");
    }
  }

  return (
    <EditContainer
      title="Personal Information"
      isEdit={isEdit}
      onClickEdit={handleClickEdit}
      onClickSave={handleClickSave}
      onClickCancel={handleClickCancel}
      showEditButton={showEditButton}
    >
      <div className={formStyles.sectionLayout}>
        <div className={formStyles.avatar}>
          <img src={avatar} alt="user avatar" />
          <Button>Upload Picture</Button>
        </div>
        <form>
          <div className={formStyles.formRow}>
            {" "}
            <div className={formStyles.formItem}>
              <label htmlFor="userNo" className={formStyles.formLabel}>
                User No.
              </label>
              <input
                type="text"
                id="userNo"
                name="UserNo"
                className={formStyles.formInput}
                readOnly
                disabled
                value={userNo}
              />
            </div>
          </div>
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
    </EditContainer>
  );
}

export default ProfileInfoForm;
