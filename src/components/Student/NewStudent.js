// NewStudent.js
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Button from "../Button/Button";
import ContainerLayout from "../Layout/Container";
import ProfileForm from "../Form/ProfileForm";
import styles from "../Form/Form.module.css";

function NewStudent() {
  const [formData, setFormData] = useState({
    studentNo: "",
    firstName: "",
    lastName: "",
    sex: "",
    dob: "",
    telephone: "",
    mobile: "",
    email: "",
    address: "",
  });
  const [error, setError] = useState(null);
  const [existingStudentNos, setExistingStudentNos] = useState([]);

  const navigate = useNavigate();

  useEffect(() => {
    // Fetch existing student numbers logic here
    // setExistingStudentNos(data);
  }, []);

  useEffect(() => {
    if (existingStudentNos.length > 0) {
      setFormData((prev) => ({ ...prev, studentNo: generateStudentNo() }));
    }
  }, [existingStudentNos]);

  function generateStudentNo() {
    // Generate student number logic here
  }

  function validate() {
    const { firstName, lastName, telephone, mobile, email } = formData;
    if (!firstName || !lastName || !telephone || !mobile || !email) {
      return "Please fill in all fields!";
    }
    if (!/^[a-zA-Z]+$/.test(firstName) || !/^[a-zA-Z]+$/.test(lastName)) {
      return "First name and last name should contain only letters";
    }
    if (!/^[0-9]+$/.test(telephone) || !/^[0-9]+$/.test(mobile)) {
      return "Telephone and mobile must contain only numbers";
    }
    if (!/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(email)) {
      return "Email should be in the format of xxx@xxx.xxx";
    }
    return null;
  }

  async function handleSubmit(e) {
    e.preventDefault();
    const validationError = validate();
    if (validationError) {
      alert(validationError);
      return;
    }

    try {
      const response = await fetch(
        "http://localhost:3900/api/student/student-add",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(formData),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to add new student");
      }

      navigate(`/dashboard/student/confirmed/${formData.studentNo}`);
    } catch (error) {
      setError(error.message);
    }
  }

  function handleCancel(e) {
    e.preventDefault();
    navigate("/student/student-list");
  }

  function handleChange(e) {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  }

  return (
    <ContainerLayout title="Add a new student">
      <form className={styles.form} onSubmit={handleSubmit}>
        <ProfileForm
          formData={formData}
          handleChange={handleChange}
          isEdit={true}
          formWidth={styles.formHalf}
        />
        <div className={styles.formActions}>
          <Button classType="submit">Add</Button>
          <Button classType="cancel" onClick={handleCancel}>
            Cancel
          </Button>
        </div>
      </form>
      {error && <div>Error: {error}</div>}
    </ContainerLayout>
  );
}

export default NewStudent;
