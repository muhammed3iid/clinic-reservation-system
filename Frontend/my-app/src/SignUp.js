import React, { useState } from "react";
import'./Login.css'
const SignUp = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [userType, setUserType] = useState("patient");

  const handleSignUp = () => {
    // Implement sign-up functionality here
  };

  return (
    <div>
      <h2>Sign Up</h2>
      <form>
        <div>
          <label>Email:</label>
          <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
        </div>
        <div>
          <label>Password:</label>
          <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
        </div>
        <div>
          <label>User Type:</label>
          <select value={userType} onChange={(e) => setUserType(e.target.value)}>
            <option value="patient">Patient</option>
            <option value="doctor">Doctor</option>
          </select>
        </div>
        <button onClick={handleSignUp}>Sign Up</button>
      </form>
    </div>
  );
};

export default SignUp;
