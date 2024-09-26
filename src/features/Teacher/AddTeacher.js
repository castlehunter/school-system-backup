import React, { useState } from "react";
import {
  useNavigate,
  redirect,
  useSubmit,
  useLoaderData,
} from "react-router-dom";
import { addTeacher } from "../../services/apiTeacher.js";
import Container from "../../ui/Layout/Container";
import ProfileForm from "../../components/Form/ProfileForm.js";
import styles from "../../components/Form/Form.module.css";

export default function AddTeacher() {
  const [error, setError] = useState(null);
  const exisitingTeacherNo = useLoaderData();
  const teacherNo = exisitingTeacherNo + 1;
  const submit = useSubmit();
  const navigate = useNavigate();

  function handleFormSubmit(e) {
    e.preventDefault();
    const form = e.target;
    submit(form, { method: "post" });
  }

  const handleCancel = () => {
    navigate(`/teachers/teacher-list`);
  };

  return (
    <Container title="Add Teacher" headingType="primaryHeading">
      <ProfileForm
        type="Teacher"
        isEdit={true}
        onFormSubmit={handleFormSubmit}
        onCancel={handleCancel}
        No={teacherNo}
      />
      {error && <div className={styles.error}>Error: {error}</div>}
    </Container>
  );
}

// Below is a draft
// export async function addTeacherAction({ request }) {
//   const formData = await request.formData();
//   const requestData = Object.fromEntries(formData);

//   const userData = {
//     SchoolID: "d8d5caa0-5269-4c3c-8adc-f7590ded9eee",
//     FirstName: requestData.FirstName,
//     LastName: requestData.LastName,
//     DateofBirth: requestData.DateofBirth,
//     Email: requestData.Email,
//     PhoneNumber: requestData.PhoneNumber,
//   };

//   try {
//     const newTeacher = await addTeacher(userData);
//     return redirect(`/teachers/confirmed/${newTeacher.TeacherNo}`);
//   } catch (err) {
//     console.error(err);
//     return { error: err.message };
//   }
// }
