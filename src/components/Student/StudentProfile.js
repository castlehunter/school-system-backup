import { useNavigate, useParams } from "react-router-dom";
import React, { useEffect, useState } from "react";
import styles from "./StudentProfile.module.css";
import formStyles from "../Form/Form.module.css";
import Loader from "../Loader";
import EditContainerLayout from "../Layout/EditContainerLayout";
import ProfileForm from "../Form/ProfileForm";

function StudentProfile() {
  const [studentInfo, setStudentInfo] = useState({
    studentNo: "",
    firstName: "",
    lastName: "",
    program: [],
    dob: "",
    sex: "",
    telephone: "",
    mobile: "",
    email: "",
    address: "",
  });
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isEditBasic, setIsEditBasic] = useState(false);
  const [isEditProgram, setIsEditProgram] = useState(false);
  const [isEditCourse, setIsEditCourse] = useState(false);
  const [isEditAdditional, setIsEditAdditional] = useState(false);

  const { studentNo: urlStudentNo } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchStudentData() {
      try {
        setIsLoading(true);
        setError(null);
        const response = await fetch("/data/students.json");

        if (!response.ok) {
          throw new Error("Failed to fetch student data");
        }
        const data = await response.json();

        // Find the student with the matching studentNo
        const foundStudent = data.find(
          (student) => student.studentNo === urlStudentNo
        );

        if (foundStudent) {
          setStudentInfo({
            studentNo: foundStudent.studentNo,
            firstName: foundStudent.fname,
            lastName: foundStudent.lname,
            program: foundStudent.program,
            dob: foundStudent.dob,
            sex: foundStudent.sex,
            telephone: foundStudent.telephone,
            mobile: foundStudent.mobile,
            email: foundStudent.email,
            address: foundStudent.address,
          });
        } else {
          throw new Error("Student not found");
        }
      } catch (error) {
        console.error("Error fetching student data:", error);
        setError(error.message);
      } finally {
        setIsLoading(false);
      }
    }

    fetchStudentData();
  }, [urlStudentNo]);

  function handleChange(e) {
    const { name, value } = e.target;

    setStudentInfo((prevInfo) => ({
      ...prevInfo,
      [name]: value,
    }));
  }

  function isValidPhoneNumber(number) {
    return /^[0-9]+$/.test(number);
  }

  function isValidEmail(email) {
    return /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(email);
  }

  async function handleSubmitBasic(e) {
    e.preventDefault();

    const { telephone, mobile, email } = studentInfo;

    if (!telephone || !email) {
      alert("Fields cannot be blank!");
      return;
    }

    if (!isValidPhoneNumber(telephone) || !isValidPhoneNumber(mobile)) {
      alert("Telephone and mobile must contain only numbers");
      return;
    }

    if (!isValidEmail(email)) {
      alert("Email should be in the format of xxx@xxx.xxx");
      return;
    }

    try {
      const response = await fetch(
        `http://localhost:3900/api/student/${studentInfo.studentNo}`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(studentInfo),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to update student");
      }

      setIsEditBasic(false); // Exit edit mode after successful save
    } catch (error) {
      setError(error.message);
    }

    navigate(`/dashboard/staff/edit-confirmed/${studentInfo.studentNo}`);
  }

  async function handleSubmitProgram(e) {}

  async function handleSubmitCourse(e) {}

  async function handleSubmitAdditional(e) {}

  function handleEditBasic() {
    setIsEditBasic((prev) => !prev);
  }

  function handleEditProgram() {
    setIsEditProgram((prev) => !prev);
  }

  function handleEditCourse() {
    setIsEditAdditional((prev) => !prev);
  }

  function handleEditAdditional() {
    setIsEditAdditional((prev) => !prev);
  }

  function handleCancelEditBasic() {
    setIsEditBasic(false);
  }

  function handleCancelProgram() {
    setIsEditProgram(false);
  }
  function handleCancelCourse() {
    setIsEditCourse(false);
  }
  function handleCancelAdditional() {
    setIsEditAdditional(false);
  }

  if (isLoading) {
    return <Loader />;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className={styles.studentPofileLayout}>
      <EditContainerLayout
        title="Basic Information"
        isEdit={isEditBasic}
        onClickEdit={handleEditBasic}
        onClickConfirm={handleSubmitBasic}
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
              formData={studentInfo}
              handleChange={handleChange}
              isEdit={isEditBasic}
            />
          </form>
        </div>
      </EditContainerLayout>

      {/* ---------- Program ----------- */}
      <div className={styles.programCourseLayout}>
        {/* <EditContainerLayout
          title="Program"
          isEdit={isEditProgram}
          onClickEdit={isEditProgram ? handleSubmitProgram : handleEditProgram}
          onClickCancel={handleCancelProgram}
        >
          <div className={styles.detail}>
            <form className={styles.form} onSubmit={handleSubmitProgram}>
              <ProfileForm
                formArr={studentInfo.program}
                handleChange={handleChange}
                isEdit={isEditProgram}
              />
            </form>
          </div>
        </EditContainerLayout> */}

        {/* -------------- Course ------------- */}
        {/* <EditContainerLayout
          title="Course"
          isEdit={isEditProgram}
          onClickEdit={isEditCourse ? handleSubmitCourse : handleEditCourse}
          onClickCancel={handleCancelCourse}
        >
          <div className={styles.detail}>
            <form className={styles.form} onSubmit={handleSubmitCourse}></form>
          </div>
        </EditContainerLayout> */}
      </div>
      {/* <EditContainerLayout
        title="Additional Information"
        isEdit={isEditAdditional}
        onClickEdit={
          isEditAdditional ? handleSubmitAdditional : handleEditAdditional
        }
        onClickCancel={handleCancelAdditional}
      >
        <div className={styles.detail}>
          <form className={styles.form} onSubmit={handleSubmitAdditional}>
            <ProfileForm
              formData={studentInfo}
              handleChange={handleChange}
              isEdit={isEditAdditional}
            />
          </form>
        </div>
      </EditContainerLayout> */}
    </div>
  );
}

export default StudentProfile;
