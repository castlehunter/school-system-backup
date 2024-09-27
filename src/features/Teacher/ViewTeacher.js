import { useNavigate, useParams } from "react-router-dom";
import React, { useEffect, useState } from "react";
import styles from "../Profile.module.css";
import formStyles from "../../components/Form/Form.module.css";
import EditContainer from "../../ui/Layout/EditContainer";
import ProfileForm from "../../components/Form/ProfileForm";
import Container from "../../ui/Layout/Container";
import { getTeacherById } from "../../services/apiTeacher";

function ViewTeacher() {
  const { teacherId } = useParams();
  const navigate = useNavigate();
  const [data, setData] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [isEditBasic, setIsEditBasic] = useState(false);
  const [isEditProgram, setIsEditProgram] = useState(false);
  const [isEditCourse, setIsEditCourse] = useState(false);
  const [isEditAdditional, setIsEditAdditional] = useState(false);

  useEffect(() => {
    async function fetchData() {
      try {
        setIsLoading(true);
        setError("");
        const teacherData = await getTeacherById(teacherId);
        setData(teacherData);
      } catch (err) {
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    }
    fetchData();
  }, [teacherId]);

  function handleChange(e) {
    //   const { name, value } = e.target;
    //   setBasicInfo((prevInfo) => ({
    //     ...prevInfo,
    //     [name]: value,
    //   }));
    // }
    // function isValidPhoneNumber(number) {
    //   return /^[0-9]+$/.test(number);
    // }
    // function isValidEmail(email) {
    //   return /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(email);
    // }
    // async function handleSubmitBasic(e) {
    //   e.preventDefault();
    //   const { telephone, mobile, email } = basicInfo;
    //   if (!telephone || !email) {
    //     alert("Fields cannot be blank!");
    //     return;
    //   }
    //   if (!isValidPhoneNumber(telephone) || !isValidPhoneNumber(mobile)) {
    //     alert("Telephone and mobile must contain only numbers");
    //     return;
    //   }
    //   if (!isValidEmail(email)) {
    //     alert("Email should be in the format of xxx@xxx.xxx");
    //     return;
    //   }
    //   try {
    //     const response = await fetch(
    //       `http://localhost:3900/api/student/${basicInfo.urlID}`,
    //       {
    //         method: "PUT",
    //         headers: { "Content-Type": "application/json" },
    //         body: JSON.stringify(basicInfo),
    //       }
    //     );
    //     if (!response.ok) {
    //       throw new Error("Failed to update student");
    //     }
    //     setIsEditBasic(false);
    //     navigate(`/dashboard/staff/edit-confirmed/${basicInfo.studentNo}`);
    //   } catch (error) {
    //     setError(error.message);
    //   }
  }

  async function handleSubmitBasic(e) {}
  async function handleSubmitCourse(e) {}

  async function handleSubmitAdditional(e) {}

  function handleEditBasic() {
    setIsEditBasic((prev) => !prev);
  }

  function handleEditCourse() {
    setIsEditCourse((prev) => !prev);
  }

  function handleEditAdditional() {
    setIsEditAdditional((prev) => !prev);
  }

  function handleCancelEditBasic() {
    setIsEditBasic((prev) => !prev);
  }

  function handleCancelCourse() {
    setIsEditCourse(false);
  }

  function handleCancelAdditional() {
    setIsEditAdditional(false);
  }

  return (
    <div className={styles.profileLayout}>
      <div className={styles.mainColumn}>
        <div>
          <EditContainer
            title="Basic Information"
            isEdit={isEditBasic}
            onClickEdit={handleEditBasic}
            // onClickConfirm={handleSubmitBasic}
            onClickCancel={handleCancelEditBasic}
          >
            <div className={styles.basicInfoDetail}>
              <img
                src="/img/profile/profile.jpg"
                alt="img"
                className={styles.profileImg}
              />
              <ProfileForm
                type="Teacher"
                formData={data}
                isEdit={isEditBasic}
                onFormSubmit={handleSubmitBasic}
              />
            </div>
          </EditContainer>
        </div>
        <div className={styles.course}>
          <EditContainer
            title="Courses Enrolled"
            isEdit={isEditProgram}
            onClickEdit={isEditCourse ? handleSubmitCourse : handleEditCourse}
            onClickCancel={handleCancelCourse}
          >
            <div>{/* <CourseTable /> */}</div>
          </EditContainer>
        </div>

        <EditContainer
          title="Additional Information"
          isEdit={isEditAdditional}
          onClickEdit={
            isEditAdditional ? handleSubmitAdditional : handleEditAdditional
          }
          onClickCancel={handleCancelAdditional}
        >
          <div className={styles.detail}>
            <form
              className={styles.form}
              onSubmit={handleSubmitAdditional}
            ></form>
          </div>
        </EditContainer>
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
          eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
          minim veniam, quis nostrud exercitation ullamco laboris nisi ut
          aliquip ex ea commodo consequat. Duis aute irure dolor in
          reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
          pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
          culpa qui officia deserunt mollit anim id est laborum.
        </Container>{" "}
        <Container title="Communication" headingType="secondaryHeading">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
          minim veniam, quis nostrud exercitation ullamco laboris nisi ut
          aliquip ex ea commodo consequat. Duis aute irure dolor in
          reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
          pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
          culpa qui officia deserunt mollit anim id est laborum.
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
