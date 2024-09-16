import React, { useState } from "react";
import generalStyles from "../generalStyles.module.css";
import styles from "./HomePage.module.css";
import PageNav from "../components/PageNav";
import Footer from "../components/Footer/Footer";
import Button from "../components/Button/Button";
import { useNavigate } from "react-router-dom";
import formStyles from "../components/Form/Form.module.css";
import supabase from "../config/supabaseClient";
import { Link } from "react-router-dom";

function HomePage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  //show supabase client
  console.log(supabase);

  const handleLogin = async (event) => {
    event.preventDefault();
    navigate("/dashboard");

    // if (username && password) {
    //   try {
    //     const response = await fetch("http://localhost:5000/api/register", {
    //       method: "POST",
    //       headers: {
    //         "Content-Type": "application/json",
    //       },
    //       body: JSON.stringify({ username, password }),
    //     });

    //     if (response.ok) {
    //       const data = await response.json();
    //       console.log("Login successful:", data);
    //       navigate("/dashboard");
    //     } else {
    //       alert("Login failed: " + response.statusText);
    //     }
    //   } catch (error) {
    //     console.log("Error during login:", error);
    //     alert("Error occurred. Please try again.");
    //   }
    // } else {
    //   alert("Please enter a username and password!");
    // }
  };

  return (
    <main className={styles.homepage}>
      <div className={styles.bg}></div>
      <section className={styles.loginSection}>
        <form className={styles.loginForm} onSubmit={handleLogin}>
          <div className={formStyles.formItem}>
            <label className={formStyles.formLabel} htmlFor="username">
              Username:
            </label>
            <input
              className={formStyles.formInput}
              type="text"
              id="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>
          <div className={formStyles.formItem}>
            <label className={formStyles.formLabel} htmlFor="password">
              Password:
            </label>
            <input
              className={formStyles.formInput}
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>{" "}
          <div className={formStyles.formItem}>
            <Button colorType="rose">Login</Button>
          </div>
          <div className={formStyles.formItem}>
            <Link className={generalStyles.link} style={{ color: "white" }}>
              Forgot password?
            </Link>
          </div>
        </form>
      </section>
    </main>
  );
}

export default HomePage;
