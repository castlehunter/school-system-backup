import EditContainer from "../../ui/Layout/EditContainer";
import formStyles from "./Form.module.css";
import avatar from "../../assets/user-avatar-account.jpg";
import { useState, useEffect } from "react";
import Button from "../Button/Button";
import { getProfileInfoByNo } from "../../services/apiUser";
import { UpdatePersonalInfo } from "../../services/apiUser";

function PersonalInfoForm({ userNo }) {
  const [personalInfoData, setPersonalInfoData] = useState({
    RoleName: "",
    FirstName: "",
    LastName: "",
    PhoneNumber: "",
    Email: "",
    HomeAddress: "",
    DateOfBirth: "",
  });
  const [isEdit, setIsEdit] = useState(false);

  useEffect(() => {
    const fetchProfileData = async () => {
      try {
        const profileData = await getProfileInfoByNo(userNo);

        setPersonalInfoData({
          RoleName: profileData.Roles.RoleName || "",
          FirstName: profileData.FirstName || "",
          LastName: profileData.LastName || "",
          PhoneNumber: profileData.PhoneNumber || "",
          Email: profileData.Email || "",
          HomeAddress: profileData.HomeAddress || "",
          DateOfBirth: profileData.DateOfBirth || "",
        });
      } catch (error) {
        console.error("Error fetching profile info:", error);
      }
    };

    fetchProfileData();
  }, [userNo]);

  function handleChange(e) {
    const { name, value } = e.target;
    const updatedData = {
      ...personalInfoData,
      [name]: value,
    };
    setPersonalInfoData(updatedData);
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
      const response = await UpdatePersonalInfo(userNo, personalInfoData);
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
      editButtonText="Edit"
      isEdit={isEdit}
      onClickEdit={handleClickEdit}
      onClickSave={handleClickSave}
      onClickCancel={handleClickCancel}
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
              <label htmlFor="role" className={formStyles.formLabel}>
                Role
              </label>
              <input
                type="text"
                id="role"
                name="role"
                className={formStyles.formInput}
                readOnly
                disabled
                value={personalInfoData.RoleName}
              />
            </div>
          </div>
          {/* <div className={formStyles.formRow}>
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
          </div> */}
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
                value={personalInfoData.FirstName}
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
                value={personalInfoData.LastName}
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
                value={personalInfoData.PhoneNumber}
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
                value={personalInfoData.Email}
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
              value={personalInfoData.DateOfBirth}
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
              value={personalInfoData.HomeAddress}
              onChange={handleChange}
            />
          </div>
        </form>
      </div>
    </EditContainer>
  );
}

export default PersonalInfoForm;
