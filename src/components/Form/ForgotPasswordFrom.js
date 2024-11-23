import React, { useState } from "react";
import formStyles from "../Form/Form.module.css";
import Button from "../../components/Button/Button";
import { useNavigate } from "react-router-dom";
import { getSecurityInfoByUserName } from "../../services/apiUser";
import EditContainer from "../../ui/Layout/EditContainer";

function ForgotPassword() {
  const [username, setUsername] = useState("");
  const [securityQuestion, setSecurityQuestion] = useState("");
  const [securityAnswer, setSecurityAnswer] = useState("");
  const [answer, setAnswer] = useState("");
  const [error, setError] = useState(""); // For handling errors
  const navigate = useNavigate();

  const handleGetSecurityQuestion = async () => {
    try {
      const userData = await getSecurityInfoByUserName(username);
      if (userData) {
        setSecurityQuestion(userData.SecurityQuestion);
        setSecurityAnswer(userData.SecurityAnswer);
        setError(""); // Clear previous errors
      } else {
        setError("User not found"); // Error if no user is found
      }
    } catch (error) {
      console.error("Error fetching security question:", error);
      setError("Error fetching security question");
    }
  };

  const handleValidateAnswer = () => {
    if (securityAnswer === "" || securityAnswer !== answer) {
      setError("Security answer is incorrect");
      return;
    }
    // Navigate to reset password form with the username as state
    navigate("/login/reset-password", { state: { username } });
  };

  return (
    <EditContainer title="Forgot Password?">
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

      <Button onClickBtn={handleGetSecurityQuestion}>
        Get Security Question
      </Button>

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

      {/* Display error message if any */}
      {error && <div className={formStyles.error}>{error}</div>}
    </EditContainer>
  );
}

export default ForgotPassword;
