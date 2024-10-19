import { useNavigate, useParams } from "react-router-dom";
import React, { useEffect, useState } from "react";
import styles from "../Profile.module.css";
import EditContainer from "../../ui/Layout/EditContainer";
import ProfileInfoForm from "../../components/Form/ProfileInfoForm";
import { getProfileInfoByNo } from "../../services/apiUser";

function ViewTeacher() {
  const { userNo } = useParams();
  const [profileData, setProfileData] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchData() {
      try {
        setIsLoading(true);
        setError("");
        const teacherData = await getProfileInfoByNo(userNo);
        setProfileData(teacherData);
      } catch (err) {
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    }
    fetchData();
  }, [userNo]);

  return (
    <>
      <h1>
        {profileData.FirstName} {profileData.LastName}
      </h1>
      <div className={styles.profileLayout}>
        <div className={styles.mainColumn}>
          <ProfileInfoForm data={profileData} />
          <EditContainer title="Additional Information"></EditContainer>
        </div>
        <div className={styles.secondaryColumn}>
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

export default ViewTeacher;
