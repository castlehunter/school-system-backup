import React, { useEffect, useState } from "react";
import styles from "./NewUser.module.css";
import avatar from "../../assets/user-avatar-account.jpg";
import { getUserById } from "../../services/apiUser";
import UserInfoForm from "../../components/Form/UserInfoForm";
import AccountInfoForm from "../../components/Form/AccountInfoForm";
import SecurityInfoForm from "../../components/Form/SecurityInfoForm";
import Container from "../../ui/Layout/Container";

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
function NewUser() {
  const [isEdit, setIsEdit] = useState(false);

  const [userInfo, setUserInfo] = useState({});

  const [accountInfo, setAccountInfo] = useState({});
  const [securityInfo, setSecurityInfo] = useState({});

  useEffect(() => {}, []);

  function handleChangePicBtn(e) {
    e.preventDefault();
  }

  function handleEditBtn(e) {
    e.preventDefault();
    setIsEdit((prev) => !prev);
  }

  function handleSaveBtn(e) {
    e.preventDefault();
    setIsEdit((prev) => !prev);
  }

  function handleEditForm(e) {}

  function handleResetPw(e) {
    e.preventDefault();
  }

  return (
    <div className={styles.newUserLayout}>
      <Container title="Security Information">
        <SecurityInfoForm securityInfo={securityInfo} isEdit={true} />
      </Container>

      <Container title="User Information">
        <UserInfoForm userInfo={userInfo} isEdit={true} />
      </Container>

      <Container title="Account Information">
        <AccountInfoForm accountInfo={accountInfo} isEdit={true} />
      </Container>
    </div>
  );
}

export default NewUser;
