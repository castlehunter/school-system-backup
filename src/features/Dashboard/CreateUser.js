import React, { useState, useEffect } from "react";
import Button from "../../components/Button/Button";
import styles from "../../components/Form/Form.module.css";
import { useLoaderData } from "react-router-dom";
import Container from "../../ui/Layout/Container";
function CreateUser({ isEdit = true }) {
  const userNo = useLoaderData();
  const [inputData, setInputData] = useState({
    UserNo: "",
    UserName: "",
    Password: "",
    FirstName: "",
    LastName: "",
    DateOfBirth: "",
    PhoneNumber: "",
    HomeAddress: "",
  });

  function handleChange(e) {
    const { name, value } = e.target;
    setInputData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  }

  function onFormSubmit() {}

  return (
    <Container title="Create User" headingType="primaryHeading">
      <form className={styles.form} onSubmit={onFormSubmit}>
        <div className={styles.formItem}>
          <label htmlFor="UserNo" className={styles.formLabel}>
            User Number
          </label>
          <input
            type="text"
            name="UserNo"
            value={userNo}
            onChange={handleChange}
            className={styles.formText}
            disabled={true}
          />
        </div>

        <div className={styles.formRow}>
          <div className={styles.formItem}>
            <label htmlFor="UserName" className={styles.formLabel}>
              User Name
            </label>
            <input
              type="text"
              name="UserName"
              value={inputData.UserName}
              onChange={handleChange}
              className={isEdit ? styles.formInput : styles.formText}
              disabled={!isEdit}
            />
          </div>
          <div className={styles.formItem}>
            <label htmlFor="Password" className={styles.formLabel}>
              Password
            </label>
            <input
              type="text"
              name="Password"
              value={inputData.Password}
              onChange={handleChange}
              className={isEdit ? styles.formInput : styles.formText}
              disabled={!isEdit}
            />
          </div>
        </div>

        <div className={styles.formRow}>
          <div className={styles.formItem}>
            <label htmlFor="FirstName" className={styles.formLabel}>
              FirstName
            </label>
            <input
              type="text"
              name="FirstName"
              value={inputData.FirstName}
              onChange={handleChange}
              className={isEdit ? styles.formInput : styles.formText}
              disabled={!isEdit}
            />
          </div>
          <div className={styles.formItem}>
            <label htmlFor="LastName" className={styles.formLabel}>
              Last Name
            </label>
            <input
              type="text"
              name="LastName"
              value={inputData.LastName}
              onChange={handleChange}
              className={isEdit ? styles.formInput : styles.formText}
              disabled={!isEdit}
            />
          </div>
        </div>

        <div className={styles.formRow}>
          <div className={styles.formItem}>
            <label htmlFor="DateOfBirth" className={styles.formLabel}>
              Date Of Birth
            </label>
            <input
              type="date"
              name="DateOfBirth"
              value={inputData.DateOfBirth}
              onChange={handleChange}
              className={isEdit ? styles.formInput : styles.formText}
              disabled={!isEdit}
            />
          </div>
          <div className={styles.formItem}>
            <label htmlFor="PhoneNumber" className={styles.formLabel}>
              Phone Number
            </label>
            <input
              type="text"
              name="PhoneNumber"
              value={inputData.PhoneNumber}
              onChange={handleChange}
              className={isEdit ? styles.formInput : styles.formText}
              disabled={!isEdit}
            />
          </div>
        </div>

        <div className={styles.formRow}>
          <div className={styles.formItem}>
            <label htmlFor="HomeAddress" className={styles.formLabel}>
              Home Address
            </label>
            <input
              type="text"
              name="HomeAddress"
              value={inputData.HomeAddress}
              onChange={handleChange}
              className={isEdit ? styles.formInput : styles.formText}
              disabled={!isEdit}
            />
          </div>
        </div>

        <div className={styles.formActions}>
          <Button classType="submit">Add</Button>
          <Button classType="cancel">Cancel</Button>
        </div>
      </form>
    </Container>
  );
}

export default CreateUser;
