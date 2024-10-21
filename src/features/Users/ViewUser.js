import { useNavigate, useParams } from "react-router-dom";
import React, { useEffect, useState } from "react";
import styles from "../Profile.module.css";
import EditContainer from "../../ui/Layout/EditContainer";
import PersonalInfoForm from "../../components/Form/PersonalInfoForm";
import SecurityInfoForm from "../../components/Form/SecurityInfoForm";
import AccountInfoForm from "../../components/Form/AccountInfoForm";
import { getRoleNameByNo } from "../../services/apiUser";
import { getProfileInfoByNo } from "../../services/apiUser";
import MainTitle from "../../ui/MainTitle/MainTitle";
function ViewUser() {
  const { userNo } = useParams();
  const [profileData, setProfileData] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  // useEffect(() => {
  //   async function getRoleName() {
  //     try {
  //       setIsLoading(true);
  //       setError("");
  //       const res = await getRoleNameByNo(userNo);
  //       setRoleName(res);
  //     } catch (error) {
  //       setError(error);
  //     }
  //   }
  //   getRoleName();
  // }, []);

  return (
    <>
      <MainTitle title="User Detail" />
      <div className={styles.profileLayout}>
        <div className={styles.mainColumn}>
          <PersonalInfoForm userNo={userNo} />

          {(profileData?.Roles?.RoleName === "Teacher" ||
            profileData?.Roles?.RoleName === "Student") && (
            <EditContainer title="Course Information">
              <div className={styles.detail}>
                This part displays only when role === teacher || role ===
                student
              </div>
            </EditContainer>
          )}
          <EditContainer title="Additional Information">
            <div className={styles.detail}></div>
          </EditContainer>
          <EditContainer title="Additional Information">
            <div className={styles.detail}></div>
          </EditContainer>
        </div>
        <div className={styles.secondaryColumn}>
          <SecurityInfoForm userNo={userNo} />
          <AccountInfoForm userNo={userNo} />
          <EditContainer title="Some charts here">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
            ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
            aliquip ex ea commodo consequat. Duis aute irure dolor in
            reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
            pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
            culpa qui officia deserunt mollit anim id est laborum.
          </EditContainer>{" "}
          <EditContainer title="Remarks">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          </EditContainer>{" "}
          <EditContainer title="Communication">
            123 Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
            ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
          </EditContainer>{" "}
          <EditContainer title="Communication">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
            ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
            aliquip ex ea commodo consequat. Duis aute irure dolor in
            reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
            pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
            culpa qui officia deserunt mollit anim id est laborum.
          </EditContainer>
        </div>
      </div>
    </>
  );
}

export default ViewUser;
