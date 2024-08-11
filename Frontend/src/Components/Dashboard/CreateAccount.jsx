import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../Security/AuthContext";

function CreateAccount() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const navigate = useNavigate("");
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

      const result = await useContext.createAccount(email, password);

      if (result.success) {
        navigate("/");
      } else {
      }
    } catch (e) {}
  }

  return (
    <form className="form" onSubmit={handleSubmit}>
      <div>
        <h1>Create Account</h1>
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
        {passwordError && <div className="error-message">{passwordError}</div>}
        <button type="submit">Register</button>
      </div>
      <div>
        {" "}
        <ul>
          <li>
            <Link to="/Login">Login</Link>
          </li>
        </ul>
      </div>
    </form>
  );
}

export default CreateAccount;
