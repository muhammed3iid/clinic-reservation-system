import React, { useState } from "react";
import'./Login.css'
const Login = ({ navigateTo }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [userType, setUserType] = useState("patient");
  const [isSignUp, setIsSignUp] = useState(false);

  const handleLogin = () => {
    // Implement login functionality here
    navigateTo('clinic-reservation');
  };

  const handleSignUp = () => {
    // Implement sign-up functionality here
  };

  return (
    <div>
      <h2>{isSignUp ? "Sign Up" : "Log in"}</h2>
      <form>
        <div>
          <label>Email:</label>
          <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
        </div>
        <div>
          <label>Password:</label>
          <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
        </div>
        {isSignUp && (
          <div>
            <label>User Type:</label>
            <select value={userType} onChange={(e) => setUserType(e.target.value)}>
              <option value="patient">Patient</option>
              <option value="doctor">Doctor</option>
            </select>
          </div>
        )}
        {isSignUp ? (
          <button onClick={handleSignUp}>Sign Up</button>
        ) : (
          <button onClick={handleLogin}>Log in</button>
        )}
      </form>
      <p>
        {isSignUp
          ? "Already have an account? "
          : "Don't have an account? "}
        <button onClick={() => setIsSignUp(!isSignUp)}>
          {isSignUp ? "Log in" : "Sign Up"}
        </button>
      </p>
    </div>
  );
};

export default Login;
