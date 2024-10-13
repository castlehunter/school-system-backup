import { useNavigate, useParams } from "react-router-dom";
import React, { useEffect, useState } from "react";
import styles from "../Profile.module.css";
import EditContainer from "../../ui/Layout/EditContainer";
import Container from "../../ui/Layout/Container";
import { getTeacherByNo } from "../../services/apiTeacher";
import ProfileInfoForm from "../../components/Form/ProfileInfoForm";

function ViewTeacher() {
  const { userNo } = useParams();
  const [data, setData] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchData() {
      try {
        setIsLoading(true);
        setError("");
        const teacherData = await getTeacherByNo(userNo);
        setData(teacherData);
      } catch (err) {
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    }
    fetchData();
  }, [userNo]);

  return (
    <div className={styles.profileLayout}>
      <div className={styles.mainColumn}>
        <ProfileInfoForm userNo={userNo} />
        <EditContainer title="Additional Information"></EditContainer>
      </div>
      <div className={styles.secondaryColumn}>
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

export default ViewTeacher;
