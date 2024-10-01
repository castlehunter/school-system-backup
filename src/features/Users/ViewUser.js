import { useNavigate, useParams } from "react-router-dom";
import React, { useEffect, useState } from "react";
import styles from "../Profile.module.css";
import EditContainer from "../../ui/Layout/EditContainer";
import Container from "../../ui/Layout/Container";
import ProfileInfoForm from "../../components/Form/ProfileInfoForm";
import SecurityInfoForm from "../../components/Form/SecurityInfoForm";
import AccountInfoForm from "../../components/Form/AccountInfoForm";
import { getRoleNameByNo } from "../../services/apiUser";

function ViewUser() {
  const { userNo } = useParams();
  const [roleName, setRoleName] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function getRoleName() {
      try {
        setIsLoading(true);
        setError("");
        const res = await getRoleNameByNo(userNo);
        setRoleName(res);
      } catch (error) {
        setError(error);
      }
    }
    getRoleName();
  }, []);

  return (
    <div className={styles.profileLayout}>
      <div className={styles.mainColumn}>
        <ProfileInfoForm userNo={userNo} />

        {roleName === "Teacher" || roleName === "Student" ? (
          <EditContainer title="Course Information">
            <div className={styles.detail}></div>
          </EditContainer>
        ) : (
          <EditContainer title="Other">d</EditContainer>
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
        <Container title="Some charts here" headingType="secondaryHeading">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
          minim veniam, quis nostrud exercitation ullamco laboris nisi ut
          aliquip ex ea commodo consequat. Duis aute irure dolor in
          reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
          pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
          culpa qui officia deserunt mollit anim id est laborum.
        </Container>{" "}
        <Container title="Remarks" headingType="secondaryHeading">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
        </Container>{" "}
        <Container title="Communication" headingType="secondaryHeading">
          123 Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
          minim veniam, quis nostrud exercitation ullamco laboris nisi ut
        </Container>{" "}
        <Container title="Communication" headingType="secondaryHeading">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
          minim veniam, quis nostrud exercitation ullamco laboris nisi ut
          aliquip ex ea commodo consequat. Duis aute irure dolor in
          reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
          pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
          culpa qui officia deserunt mollit anim id est laborum.
        </Container>
      </div>
    </div>
  );
}

export default ViewUser;
