import React, { useState } from "react";
import generalStyles from "../../generalStyles.module.css";
import styles from "./Login.module.css";
import Button from "../../components/Button/Button";
import { Link, useNavigate } from "react-router-dom";
import supabase from "../../config/supabaseClient";
import logo from "../../assets/logo-removebg-preview.png";
import { useUnreadCount } from "../../contexts/UnreadContext";
import { getUnreadAnnouncementsCount } from "../../services/apiAnnouncements";
import { useUser } from "../../contexts/UserContext";
import ForgotPassword from "./ForgotPassword";
import { getUserByID, getLoginInfoByUsername } from "../../services/apiUser";

function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showForgotPassword, setShowForgotPassword] = useState(false);

  const navigate = useNavigate();
  const { setUserNo } = useUser();
  const { setUnreadCount } = useUnreadCount();

  const handleLogin = async (e) => {
    e.preventDefault();

    const loginData = await getLoginInfoByUsername(username);
    console.log(loginData);

    const userEmail = loginData.Email;

    const { data, error } = await supabase.auth.signInWithPassword({
      email: userEmail,
      password: password,
    });

    if (error) {
      alert("Invalid Username or Password");
      return;
    }

    console.log(data);

    const userId = data.session.user.id;

    localStorage.setItem("UserID", userId);
    localStorage.setItem("role", loginData.Roles.RoleName);

    setUserNo(loginData.UserNo);

    try {
      const unreadCount = await getUnreadAnnouncementsCount(data.UserNo);
      setUnreadCount(unreadCount);
    } catch (err) {
      console.error("Failed to fetch unread announcements:", err);
    }

    navigate("/dashboard", { replace: true });
  };

  return (
    <main className={styles.homepage}>
      <div className={styles.bg}></div>

      <div className={styles.loginAndForgotPassword}>
        <section
          className={`${styles.loginSection} ${
            showForgotPassword ? styles.moveLeft : ""
          }`}
        >
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
              <Link
                className={generalStyles.link}
                onClick={() => setShowForgotPassword(true)}
              >
                Forgot password
              </Link>
            </div>

            <div className={styles.loginFormItem}>
              <Button size="large">Login</Button>
            </div>
          </form>
        </section>
        <section
          className={`${styles.forgotPasswordSection} ${
            showForgotPassword ? styles.moveLeft : ""
          }`}
        >
          <ForgotPassword setShowForgotPassword={setShowForgotPassword} />
        </section>
      </div>
    </main>
  );
}

export default Login;
