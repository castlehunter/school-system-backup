import React from "react";
import styles from "./MyAccount.module.css";
import avatar from "../../assets/user-avatar-account.jpg";

// account setting, avatar, password, username change...

function MyAccount() {
  return (
    <div className={styles.content}>
      <div className={styles.section}>
        <div className={styles["section-header"]}>Basic Information</div>
        <div className={styles["section-details"]}>
          <div className={styles.avatar}>
            <img src={avatar} alt="user avatar" />
            <button className={styles.btn}>Update</button>
          </div>
          <form>
            <div className={styles["form-row"]}>
              <div className={styles["form-item"]}>
                <label for="firstName" className={styles["form-label"]}>
                  First Name
                </label>
                <input
                  type="text"
                  name="firstName"
                  className={styles["form-input"]}
                ></input>
              </div>
              <div className={styles["form-item"]}>
                <label for="lastName" className={styles["form-label"]}>
                  Last Name
                </label>
                <input
                  type="text"
                  name="lastName"
                  className={styles["form-input"]}
                ></input>
              </div>
            </div>
            <div className="form-row">
              <div className="form-item">
                <label for="phone" className={styles["form-label"]}>
                  Phone
                </label>
                <input
                  type="text"
                  name="phone"
                  className={styles["form-input"]}
                ></input>
              </div>
              <div className={styles["form-item"]}>
                <label for="personal-email" className={styles["form-label"]}>
                  Personal Email
                </label>
                <input
                  type="email"
                  name="personal-email"
                  className={styles["form-input"]}
                ></input>
              </div>
            </div>
            <div className={styles["form-item"]}>
              <label for="dob" className={styles["form-label"]}>
                Date of Birth
              </label>
              <input
                type="date"
                name="dob"
                className={styles["form-input"]}
              ></input>
            </div>
            <div className={styles["form-item"]}>
              <label for="address" className={styles["form-label"]}>
                Home Address
              </label>
              <input
                type="text"
                name="address"
                className={styles["form-input"]}
              ></input>
            </div>
            <button className={styles.btn}>Edit</button>
          </form>
        </div>
      </div>

      <div className={styles.section}>
        <div className={styles["section-header"]}>Account Security</div>
        <form>
          <div className={styles["form-row"]}>
            <div className={styles["form-item"]}>
              <label for="userNo" className={styles["form-label"]}>
                User No.
              </label>
              <input
                type="text"
                name="userNo"
                className={styles["form-input"]}
              ></input>
            </div>
            <div className={styles["form-item"]}>
              <label for="username" className={styles["form-label"]}>
                Username
              </label>
              <input
                type="text"
                name="username"
                className={styles["form-input"]}
              ></input>
            </div>
            <div className={styles["form-item"]}>
              <label for="employee-email" className={styles["form-label"]}>
                Employee Email
              </label>
              <input
                type="email"
                name="employee-email"
                className={styles["form-input"]}
              ></input>
            </div>
          </div>
          <div className={styles["form-row"]}>
            <div className={styles["form-item"]}>
              <label for="password" className={styles["form-label"]}>
                Password
              </label>
              <input
                type="password"
                name="password"
                className={styles["form-input"]}
              ></input>
            </div>
            <button className={styles.btn}>Reset</button>
          </div>
        </form>
      </div>

      <div className={styles.section}>
        <div className={styles["section-header"]}>Roles and Activity Logs</div>
        <form>
          <div className={styles["form-item"]}>
            <label for="role" className={styles["form-label"]}>
              Current Role
            </label>
            <input
              type="text"
              name="role"
              className={styles["form-input"]}
            ></input>
          </div>
          <div className={styles["form-item"]}>
            <label for="created-at" className={styles["form-label"]}>
              Account Created At
            </label>
            <input
              type="text"
              name="created-at"
              className={styles["form-input"]}
            ></input>
          </div>
        </form>
      </div>
    </div>
  );
}

export default MyAccount;
