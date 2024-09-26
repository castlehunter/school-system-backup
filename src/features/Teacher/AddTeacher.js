import React, { useState } from "react";
import { useNavigate, redirect } from "react-router-dom";
import { addTeacher } from "../../services/apiTeacher.js";
import Container from "../../ui/Layout/Container";
import ProfileForm from "../../components/Form/ProfileForm.js";
import styles from "../../components/Form/Form.module.css";

export default function AddTeacher() {
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleFormSubmit = async (formData) => {
    try {
      const newTeacher = await addTeacher(formData);
      navigate(`/teachers/confirmed/${newTeacher.TeacherID}`);
    } catch (err) {
      setError(err.message);
    }
  };

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
      />
      {error && <div className={styles.error}>Error: {error}</div>}
    </Container>
  );
}

export async function addTeacherAction({ request }) {
  const formData = await request.formData();
  const requestData = Object.fromEntries(formData);

  const userData = {
    TeacherID: requestData.TeacherID,
    FirstName: requestData.FirstName,
    LastName: requestData.LastName,
    Email: requestData.Email,
    PhoneNumber: requestData.PhoneNumber,
  };

  try {
    const newTeacher = await addTeacher(userData);
    return redirect(`/teachers/confirmed/${newTeacher.TeacherID}`);
  } catch (err) {
    console.error(err);
    return { error: err.message };
  }
}
