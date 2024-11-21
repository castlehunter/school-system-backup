import React, { useState } from "react";
import generalStyles from "../../generalStyles.module.css";
import styles from "./Login.module.css";

import Button from "../../components/Button/Button";
import { useNavigate } from "react-router-dom";
import supabase from "../../config/supabaseClient";
import { Link } from "react-router-dom";
import logo from "../../assets/logo-removebg-preview.png";
import { useUnreadCount } from "../../contexts/UnreadContext";
import { getUnreadAnnouncementsCount } from "../../services/apiAnnouncements";
import { useUser } from "../../contexts/UserContext";

function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const { setUserNo } = useUser();
  const { setUnreadCount } = useUnreadCount();

  const handleLogin = async (e) => {
    e.preventDefault();
    const { data, error } = await supabase
      .from("Users")
      .select(
        `
        UserID,
        UserNo,
        UserName,
        FirstName,
        LastName,
        PasswordHash,
        Roles (RoleName)
      `
      )
      .eq("UserName", username)
      .eq("PasswordHash", password)
      .single();

    if (error || !data) {
      alert("Invalid Username or Password");
      return;
    }

    console.log("Login page data " + JSON.stringify(data));
    const userRole = data.Roles.RoleName;
    localStorage.setItem("UserID", data.UserID);
    localStorage.setItem("role", userRole);

    setUserNo(data.UserNo);

    // 更新 UnreadContext
    try {
      const unreadCount = await getUnreadAnnouncementsCount(data.UserNo);
      setUnreadCount(unreadCount); // 更新未读计数
    } catch (err) {
      console.error("Failed to fetch unread announcements:", err);
    }

    navigate("/dashboard");
  };

  return (
    <main className={styles.homepage}>
      <div className={styles.bg}></div>

      <section className={styles.loginSection}>
        <div className={styles.loginHeader}>
          <img src={logo} alt="logo" className={styles.logo} />
          <div className={styles.welcome}>Welcome Back!</div>
        </div>

        <form className={styles.loginForm} onSubmit={handleLogin}>
          <div className={styles.loginFormItem}>
            <label className={styles.loginFormLabel} htmlFor="username">
              Username:
            </label>
            <input
              className={styles.loginFormInput}
              type="text"
              id="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>
          <div className={styles.loginFormItem}>
            <label className={styles.loginFormLabel} htmlFor="password">
              Password:
            </label>
            <input
              className={styles.loginFormInput}
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <div className={`${styles.loginFormItem} ${styles.loginHint}`}>
            <div className={styles.rememberMe}>
              <input type="checkbox" />
              <span>Remember me</span>
            </div>
            <Link to="/login/forgot-password" className={generalStyles.link}>
              Forgot password
            </Link>
          </div>

          <div className={styles.loginFormItem}>
            <Button>Login</Button>
          </div>
        </form>
      </section>
    </main>
  );
}

export default Login;
