import { useLoaderData, useNavigate, useParams } from "react-router-dom";
import React, { useEffect, useState } from "react";
import styles from "./Profile.module.css";
import formStyles from "../../components/Form/Form.module.css";
import Loader from "../../ui/Loader";
import EditContainer from "../../ui/Layout/EditContainer";
import ProfileForm from "../../components/Form/ProfileForm";
import OtherForm from "../../components/Form/OtherForm";
import CourseTable from "../Course/CourseTable";
function Profile({ type }) {
  const data = useLoaderData();
  console.log(data); //print the object
  // const [basicInfo, setBasicInfo] = useState({
  //   ID: "",
  //   firstName: "",
  //   lastName: "",
  //   dob: "",
  //   telephone: "",
  //   email: "",
  //   address: "",
  // });
  // const [course, setCourse] = useState([]);
  const [error, setError] = useState(null);
  const [isEditBasic, setIsEditBasic] = useState(false);
  const [isEditProgram, setIsEditProgram] = useState(false);
  const [isEditCourse, setIsEditCourse] = useState(false);
  const [isEditAdditional, setIsEditAdditional] = useState(false);

  const { ID: urlID } = useParams();
  const navigate = useNavigate();

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
    setIsEditBasic(false);
  }

  function handleCancelCourse() {
    setIsEditCourse(false);
  }

  function handleCancelAdditional() {
    setIsEditAdditional(false);
  }

  return (
    <div className={styles.ProfileLayout}>
      <div className={styles.basicInfo}>
        <EditContainer
          title="Basic Information"
          isEdit={isEditBasic}
          onClickEdit={handleEditBasic}
          // onClickConfirm={handleSubmitBasic}
          onClickCancel={handleCancelEditBasic}
        >
          <div className={styles.detail}>
            <img
              src="/img/profile/profile.jpg"
              alt="img"
              className={styles.profileImg}
            />
            <form className={styles.form} onSubmit={handleSubmitBasic}>
              <ProfileForm
                type={type}
                formData={data}
                handleChange={handleChange}
                isEdit={isEditBasic}
                formWidth={formStyles.formFull}
              />
            </form>
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
          <div>
            <CourseTable />
          </div>
        </EditContainer>
      </div>

      {/* <EditContainer
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
      </EditContainer> */}
    </div>
  );
}

export default Profile;
