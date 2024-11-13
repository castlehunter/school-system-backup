import React, { useState } from "react";
import generalStyles from "../../generalStyles.module.css";
import formStyles from "../Form/Form.module.css";
import Button from "../../components/Button/Button";
import { useNavigate } from "react-router-dom";
import { getSecurityInfoByUserName } from "../../services/apiUser";

function ForgotPassword() {
  const [username, setUsername] = useState("");
  const [securityQuestion, setSecurityQuestion] = useState("");
  const [securityAnswer, setSecurityAnswer] = useState("");
  const [answer, setAnswer] = useState("");
  const navigate = useNavigate();

  const handleGetSecurityQuestion = async () => {
    try {
      const userData = await getSecurityInfoByUserName(username);
      if (userData) {
        setSecurityQuestion(userData.SecurityQuestion);
        setSecurityAnswer(userData.SecurityAnswer);
      } else {
        alert("User not found");
      }
    } catch (error) {
      console.error("Error fetching security question:", error);
      alert("Error fetching security question");
    }
  };

  const handleValidateAnswer = () => {
    console.log(answer);
    if (securityAnswer === "" || securityAnswer !== answer) {
      alert("Security answer is incorrect");
      return;
    }
    // Navigate to reset password form with the username as state
    navigate("/login/reset-password", { state: { username } });
  };

  return (
    <div className={formStyles.form}>
      <div className={formStyles.formItem}>
        <label htmlFor="username" className={formStyles.formLabel}>
          Enter Username:
        </label>
        <input
          type="text"
          id="username"
          name="username"
          className={formStyles.formInput}
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
      </div>

      <Button onClickBtn={handleGetSecurityQuestion}>Get Security Question</Button>

      {securityQuestion && (
        <div className={formStyles.formItem}>
          <label htmlFor="securityAnswer" className={formStyles.formLabel}>
            {securityQuestion}
          </label>
          <input
            type="text"
            id="securityAnswer"
            name="securityAnswer"
            className={formStyles.formInput}
            value={answer}
            onChange={(e) => setAnswer(e.target.value)}
          />
          <Button onClickBtn={handleValidateAnswer}>Submit Answer</Button>
        </div>
      )}
    </div>
  );
}

export default ForgotPassword;