import React, { useEffect, useState } from "react";
import styles from "./MyAccount.module.css";
import avatar from "../../assets/user-avatar-account.jpg";
import { getUserById } from "../../services/apiUser";
import UserInfoForm from "../../components/Form/UserInfoForm";
import AccountInfoForm from "../../components/Form/AccountInfoForm";
import SecurityInfoForm from "../../components/Form/SecurityInfoForm";
import EditContainer from "../../ui/Layout/EditContainer";
import Container from "../../ui/Layout/Container";
import { useNavigate } from "react-router-dom";
import { UpdateUserInfo } from "../../services/apiUser";
/*************************************************
 *
 * Page Design:
 * 1. Basic Information Section: all fields can be edited except "Employee Email"
 * 2. Account Security Section: only "Password" field can be changed/reset
 * 3. Roles and Activity Logs: view only, no editable fields.
 *
 * Tasks to be completed:
 * 1. Avatar:
 *    1) Supabase Users table lacks avatar data, currently using a local image
 *    2) Update and save the new avatar to database
 * 2. Replace hardcoded userId=4 with dynamic user ID
 * 3. Unable to fetch "Current Role" due to missing RolesAPI(get role name by RoleId)
 * 4. Implement the password reset feature
 * 5. Save Edited Basic Information to database
 *
 *************************************************/
function MyAccount() {
  const userId = 4; // a hardcode userId / userNo.= 4 for testing purposes
  const navigate = useNavigate();
  const [isEdit, setIsEdit] = useState(false);
  const [userInfo, setUserInfo] = useState({});
  const [accountInfo, setAccountInfo] = useState({});
  const [securityInfo, setSecurityInfo] = useState({});

  useEffect(() => {
    async function getMyAccount() {
      try {
        const res = await getUserById(userId);

        const {
          FirstName,
          LastName,
          Email,
          DateOfBirth,
          PhoneNumber,
          HomeAddress,
          UserName,
          PasswordHash,
          RoleName,
          IsLocked,
          FailedPasswordAttempt,
          LastLoginDate,
          CreatedAt,
          IsAdmin,
        } = res;

        const userInfo = {
          FirstName,
          LastName,
          Email,
          DateOfBirth,
          PhoneNumber,
          HomeAddress,
        };
        setUserInfo(userInfo);

        const securityInfo = {
          UserName,
          PasswordHash,
        };
        setSecurityInfo(securityInfo);

        const accountInfo = {
          RoleName,
          IsLocked,
          FailedPasswordAttempt,
          LastLoginDate,
          CreatedAt,
          IsAdmin,
        };
        setAccountInfo(accountInfo);
      } catch (err) {
        console.log(err);
      }
    }

    getMyAccount();
  }, []);

  function handleEditBtn(e) {
    e.preventDefault();
    setIsEdit((isEdit) => !isEdit);
  }
  async function handleSaveBtn() {
    try {
      // 记录更新前的 userInfo 数据
      console.log("Sending updated user data:", userInfo);

      // 调用 UpdateUserInfo API 并记录返回值
      const response = await UpdateUserInfo(4, userInfo);

      // 打印 API 的响应
      console.log("API Response:", response);

      // 检查响应并显示相应的消息
      if (response) {
        alert("User information updated successfully!");
        console.log("User updated successfully!");
      } else {
        alert("Failed to update user information.");
        console.error("Failed to update user information.");
      }
    } catch (error) {
      console.error("Error saving user data:", error);
      alert("An error occurred while saving the user data.");
    }
  }

  function handleCancelBtn() {
    setIsEdit((prev) => !prev);
  }
  function resetPassword() {
    navigate("/dashboard/reset-password");
  }

  function setUserInfoData(userInfo) {
    setUserInfo(userInfo);
  }

  return (
    <div className={styles.myAccountLayout}>
      {/* User Information */}
      <EditContainer
        title="User Information"
        isEdit={isEdit}
        onClickEdit={handleEditBtn}
        onClickSave={handleSaveBtn}
        onClickCancel={handleCancelBtn}
      >
        <UserInfoForm
          userInfo={userInfo}
          isEdit={isEdit}
          onInputChange={setUserInfoData}
        />
      </EditContainer>

      {/* Security Information*/}
      <EditContainer
        title="Security Information"
        editBtnText="Reset Password"
        onClickEdit={resetPassword}
      >
        <SecurityInfoForm securityInfo={securityInfo} />
      </EditContainer>

      {/* Account Information */}
      <Container
        title="Account Information(`~~~cannot be edited on this page)"
        headingType="secondaryHeading"
      >
        <AccountInfoForm accountInfo={accountInfo} />
      </Container>
    </div>
  );
}

export default MyAccount;
