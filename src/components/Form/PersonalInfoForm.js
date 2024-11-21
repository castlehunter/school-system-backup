import React, { useState, useEffect } from "react";
import EditContainer from "../../ui/Layout/EditContainer";
import formStyles from "./Form.module.css";
import avatar from "../../assets/User-avatar-default.jpg";
import Button from "../Button/Button";
import {
  getProfileInfoByNo,
  UpdatePersonalInfo,
  UploadProfileImage,
  uploadImageURL,
} from "../../services/apiUser";
import Loader from "../../ui/Loader";

function PersonalInfoForm({ userNo, hideUpload }) {
  const [personalInfoData, setPersonalInfoData] = useState({
    RoleName: "",
    FirstName: "",
    LastName: "",
    PhoneNumber: "",
    Email: "",
    HomeAddress: "",
    DateOfBirth: "",
    AvatarURL: "",
  });
  const [isEdit, setIsEdit] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [imageFile, setImageFile] = useState(null);

  useEffect(() => {
    const fetchProfileData = async () => {
      try {
        setIsLoading(true);
        const profileData = await getProfileInfoByNo(userNo);
        setPersonalInfoData({
          RoleName: profileData.Roles.RoleName || "",
          FirstName: profileData.FirstName || "",
          LastName: profileData.LastName || "",
          PhoneNumber: profileData.PhoneNumber || "",
          Email: profileData.Email || "",
          HomeAddress: profileData.HomeAddress || "",
          DateOfBirth: profileData.DateOfBirth || "",
          AvatarURL: profileData.AvatarURL || "",
        });
      } catch (error) {
        console.error("Error fetching profile info:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchProfileData();
  }, [userNo]);

  function handleChange(e) {
    const { name, value } = e.target;
    setPersonalInfoData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
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
      if(imageFile)
      {
        const imageres = await handleImageUpload();
      }
      const response = await UpdatePersonalInfo(userNo, personalInfoData);
      setIsEdit(false);
      if (response) {
        alert("User information updated successfully!");
      } else {
        alert("Failed to update user information.");
      }
    } catch (error) {
      console.error("Error saving user data:", error);
      alert("An error occurred while saving the user data.");
    }
  }

  const handleFileChange = (event) => {
    setImageFile(event.target.files[0]);
  };

  function generateManualUrl(imagePath)
  {
    const url = `https://llcccnztkkxlkzblokbt.supabase.co/storage/v1/object/public/ProfileImage/${imagePath}`;
    console.log(url);
    return url;
  }

  const handleImageUpload = async () => {
    if (imageFile) {
      const uploadData = await UploadProfileImage(imageFile);
      if (uploadData) {
        const manualUrl = await generateManualUrl(uploadData.path)
        const url = await uploadImageURL(userNo, manualUrl);
        if (url) {
          setPersonalInfoData((prevData) => ({
            ...prevData,
            AvatarURL: url,
          }));
          alert("Image uploaded successfully!");
          window.location.reload();
        } 
      } else {
        alert("Image upload failed.");
      }
    } else {
      alert("Please select an image to upload.");
    }
  };

  return (
    <EditContainer
      title="Personal Information"
      editButtonText="Edit"
      isEdit={isEdit}
      onClickEdit={handleClickEdit}
      onClickSave={handleClickSave}
      onClickCancel={handleClickCancel}
    >
      {isLoading ? (
        <Loader />
      ) : (
        <div className={formStyles.sectionLayout}>
          <div className={formStyles.avatar}>
            <img src={personalInfoData.AvatarURL || avatar} alt="user avatar" />
            {!hideUpload && (
              <div className={formStyles.upload}>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleFileChange}
                  className={formStyles.uploadInput}
                />
                <Button onClickBtn={handleImageUpload}>Upload Picture</Button>
              </div>
            )}
          </div>
          <form>
            <div className={formStyles.formRow}>
              <div className={formStyles.formItem}>
                <label htmlFor="role" className={formStyles.formLabel}>
                  Role
                </label>
                <input
                  type="text"
                  id="role"
                  name="RoleName"
                  className={formStyles.formInput}
                  readOnly
                  disabled
                  value={personalInfoData.RoleName}
                />
              </div>
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
      )}
    </EditContainer>
  );
}

export default PersonalInfoForm;
