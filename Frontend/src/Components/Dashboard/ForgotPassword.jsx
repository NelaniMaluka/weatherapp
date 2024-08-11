import { useState } from "react";
import { Link } from "react-router-dom";

function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState("");

  function handleEmailChange(event) {
    setEmail(event.target.value);
    // Reset email error message
    setEmailError("");
  }

  function isValidEmail(email) {
    // Basic email format validation
    const emailRegex = /\S+@\S+\.\S+/;
    return emailRegex.test(email);
  }

  function handleSubmit(event) {}

  return (
    <form className="form" onSubmit={handleSubmit}>
      {" "}
      <div>
        <h1>Forgot Password</h1>
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
        <button type="submit"> Login</button>
      </div>
      <div>
        {" "}
        <ul>
          <li>
            <Link to="/Login">Login</Link>
          </li>
          <li>
            <Link to="/Create-Account">Create an Account</Link>
          </li>
        </ul>
      </div>
    </form>
  );
}

export default ForgotPassword;