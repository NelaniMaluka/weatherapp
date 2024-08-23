import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { useAuth } from "../Security/AuthContext";
import WelcomeAlert from "../Alerts/WelcomeAlert";
import ErrorAlert from "../Alerts/ErrorAlert";

import "./Form.css";

function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");

  const useContext = useAuth();

  function handleEmailChange(event) {
    setEmail(event.target.value);
    // Reset email error message
    setEmailError("");
  }

  function handlePasswordChange(event) {
    setPassword(event.target.value);
    // Reset password error message
    setPasswordError("");
  }

  function isValidPassword(password) {
    // Password validation regex: at least one special character, one capital letter, one number, and minimum 8 characters
    const passwordRegex = /^(?=.*[!@#$%^&*])(?=.*[A-Z])(?=.*[0-9]).{8,}$/;
    return passwordRegex.test(password);
  }

  async function handleSubmit(event) {
    event.preventDefault();
    try {
      if (!email) {
        setEmailError("Email is required");
        return;
      }

      if (!password) {
        setPasswordError("Password is required");
        return;
      } else if (!isValidPassword(password)) {
        setPasswordError(
          "Password must contain at least one special character, one capital letter, minimum of 8 characters, and one number."
        );
      }

      const result = await useContext.login(email, password);
      if (result.success) {
        WelcomeAlert("useContext.isUser.fullName");
        navigate("/");
      } else {
        ErrorAlert("Invalid Credentials");
      }
    } catch (e) {
      ErrorAlert("Internal Server Error");
    }
  }

  return (
    <form className="form" onSubmit={handleSubmit}>
      <div>
        <div>
          <h1>Login</h1>
        </div>
        <div>
          <input
            placeholder="Email"
            type="email"
            name="email"
            value={email}
            autoComplete="email"
            onChange={handleEmailChange}
          />
          {emailError && <div className="error-message">{emailError}</div>}
          <input
            placeholder="Password"
            type="password"
            name="password"
            value={password}
            autoComplete="current-password"
            onChange={handlePasswordChange}
          />
          {passwordError && (
            <div className="error-message">{passwordError}</div>
          )}
          <button type="submit"> Login</button>
        </div>
        <div>
          {" "}
          <ul>
            <li>
              <Link to="/Create-Account">Create an Account</Link>
            </li>
            <li>
              <Link to="/Forgot-Password">Forgot your password ?</Link>
            </li>
          </ul>
        </div>
      </div>
    </form>
  );
}

export default Login;
