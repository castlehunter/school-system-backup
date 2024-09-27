import React, { useEffect, useState } from "react";
import styles from "./MyAccount.module.css";
import avatar from "../../assets/user-avatar-account.jpg";
import { getUserById } from "../../services/apiUser";

/*************************************************
 *
 * Page Design:
 * 1. Basic Information Section: all fields can be edited except "Employee Email"
 * 2. Account Security Section: only "Password" field can be changed/reset
 * 3. Roles and Activity Logs: view only, no editable fields.
 *
 * Tasks to be completed:
 * 1. Avatar:
 *    1) Supabase Users table lacks avatar data, currently using a local image
 *    2) Update and save the new avatar to database
 * 2. Replace hardcoded userId=4 with dynamic user ID
 * 3. Unable to fetch "Current Role" due to missing RolesAPI(get role name by RoleId)
 * 4. Implement the password reset feature
 * 5. Save Edited Basic Information to database
 *
 *************************************************/
function MyAccount() {
  const userId = 4; // a hardcode userId / userNo.= 4 for testing purposes

  const [isEdit, setIsEdit] = useState(false);
  const [myAccount, setMyAccount] = useState({});
  const {
    FirstName: firstName,
    LastName: lastName,
    PhoneNumber: phone,
    DateOfBirth: dob,
    HomeAddress: address,
    UserNo: userNo,
    UserName: userName,
    Email: employeeEmail,
    RoleID: role,
    CreatedAt: createdAt,
    PasswordHash: password,
  } = myAccount;

  useEffect(() => {
    async function getMyAccount() {
      try {
        const res = await getUserById(userId);
        setMyAccount(res);
      } catch (err) {
        console.log(err);
      }
    }

    getMyAccount();
  }, []);

  function handleChangePicBtn(e) {
    e.preventDefault();
  }

  function handleEditBtn(e) {
    e.preventDefault();
    setIsEdit((prev) => !prev);
  }

  function handleSaveBtn(e) {
    e.preventDefault();
    setIsEdit((prev) => !prev);
  }

  function handleEditForm(e) {
    const { name, value } = e.target;
    setMyAccount((prevAccount) => ({
      ...prevAccount,
      [name]: value,
    }));
  }

  function handleResetPw(e) {
    e.preventDefault();
  }

  return (
    <div className={styles.content}>
      <div className={styles.section}>
        <div className={styles["section-header"]}>Basic Information</div>
        <div className={styles["section-details"]}>
          <div className={styles.avatar}>
            <img src={avatar} alt="user avatar" />
            <button className={styles.btn} onClick={handleChangePicBtn}>
              Change Picture
            </button>
          </div>
          <form>
            <div className={styles["form-row"]}>
              <div className={styles["form-item"]}>
                <label htmlFor="firstName" className={styles["form-label"]}>
                  First Name
                </label>
                <input
                  type="text"
                  id="firstName"
                  name="FirstName"
                  className={styles["form-input"]}
                  disabled={!isEdit}
                  value={firstName}
                  onChange={handleEditForm}
                />
              </div>
              <div className={styles["form-item"]}>
                <label htmlFor="lastName" className={styles["form-label"]}>
                  Last Name
                </label>
                <input
                  type="text"
                  id="lastName"
                  name="LastName"
                  className={styles["form-input"]}
                  disabled={!isEdit}
                  value={lastName}
                  onChange={handleEditForm}
                />
              </div>
            </div>
            <div className={styles["form-row"]}>
              <div className={styles["form-item"]}>
                <label htmlFor="phone" className={styles["form-label"]}>
                  Phone
                </label>
                <input
                  type="phone"
                  id="phone"
                  name="PhoneNumber"
                  className={styles["form-input"]}
                  disabled={!isEdit}
                  value={phone}
                  onChange={handleEditForm}
                />
              </div>
              <div className={styles["form-item"]}>
                <label
                  htmlFor="employee-email"
                  className={styles["form-label"]}
                >
                  Employee Email
                </label>
                <input
                  type="email"
                  id="employee-email"
                  name="Email"
                  className={styles["form-input"]}
                  disabled="true"
                  value={employeeEmail}
                  onChange={handleEditForm}
                />
              </div>
            </div>
            <div className={styles["form-item"]}>
              <label htmlFor="dob" className={styles["form-label"]}>
                Date of Birth
              </label>
              <input
                type="date"
                id="dob"
                name="DateOfBirth"
                className={styles["form-input"]}
                disabled={!isEdit}
                value={dob}
                onChange={handleEditForm}
              />
            </div>
            <div className={styles["form-item"]}>
              <label htmlFor="address" className={styles["form-label"]}>
                Home Address
              </label>
              <input
                type="text"
                id="address"
                name="HomeAddress"
                className={styles["form-input"]}
                disabled={!isEdit}
                value={address}
                onChange={handleEditForm}
              />
            </div>
            <button
              className={styles.btn}
              onClick={isEdit ? handleSaveBtn : handleEditBtn}
            >
              {isEdit ? "Save" : "Edit"}
            </button>
          </form>
        </div>
      </div>

      <div className={styles.section}>
        <div className={styles["section-header"]}>Account Security</div>
        <form>
          <div className={styles["form-row"]}>
            <div className={styles["form-item"]}>
              <label htmlFor="userNo" className={styles["form-label"]}>
                User No.
              </label>
              <input
                type="text"
                id="userNo"
                className={styles["form-input"]}
                disabled="true"
                value={userNo}
              />
            </div>
            <div className={styles["form-item"]}>
              <label htmlFor="username" className={styles["form-label"]}>
                Username
              </label>
              <input
                type="text"
                id="username"
                className={styles["form-input"]}
                disabled="true"
                value={userName}
              />
            </div>
          </div>
          <div className={styles["form-row"]}>
            <div className={styles["form-item"]}>
              <label htmlFor="password" className={styles["form-label"]}>
                Password
              </label>
              <input
                type="password"
                id="password"
                className={styles["form-input"]}
                value={password}
                disabled="true"
              />
            </div>
            <button className={styles.btn} onClick={handleResetPw}>
              Reset
            </button>
          </div>
        </form>
      </div>

      <div className={styles.section}>
        <div className={styles["section-header"]}>Roles and Activity Logs</div>
        <form>
          <div className={styles["form-row"]}>
            <div className={styles["form-item"]}>
              <label htmlFor="role" className={styles["form-label"]}>
                Current Role
              </label>
              <input
                type="text"
                id="role"
                className={styles["form-input"]}
                disabled="true"
                value={role}
              />
            </div>
            <div className={styles["form-item"]}>
              <label htmlFor="created-at" className={styles["form-label"]}>
                Account Created At
              </label>
              <input
                type="text"
                id="created-at"
                className={styles["form-input"]}
                disabled="true"
                value={createdAt}
              />
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}

export default MyAccount;
