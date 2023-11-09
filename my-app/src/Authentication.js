import React, { useState } from "react";
import'./Style/Authentication.css'

const Login = ({ navigateTo }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("");
  const [isSignUp, setIsSignUp] = useState(false);

  const handleLogin = () => {
    // Implement login functionality here
    navigateTo('clinic-reservation');
  };

  const handleSignUp = async () => {
    const data = {
      username: username,
      password: password,
      role: role,
    };

    try {
      const response = await fetch('http://127.0.0.1:8000/sign_up_doctor/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        const responseData = await response.json();
        console.log(responseData);
      } else {
        console.error('Failed to fetch data');
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="form-container">
      <h2>{isSignUp ? "Sign Up" : "Log in"}</h2>
      <form>
        <div>
          <label>Username</label>
          <input type="username" value={username} onChange={(e) => setUsername(e.target.value)} />
        </div>
        <div>
          <label>Password</label>
          <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
        </div>
        {isSignUp && (
          <div>
            <label>Enter is your role</label>
            <label>
              <input
                type="radio"
                value="Doctor"
                checked={role === "Doctor"}
                onChange={() => setRole("Doctor")}
              />
              Doctor
            </label>
            <label>
              <input
                type="radio"
                value="Patient"
                checked={role === "Patient"}
                onChange={() => setRole("Patient")}
              />
              Patient
            </label>
          </div>
        )}
        {isSignUp ? (
          <button onClick={handleSignUp}>Sign Up</button>
        ) : (
          <button onClick={handleLogin}>Log in</button>
        )}
      </form>
      <p>
        {isSignUp ? "Already have an account? ": "Don't have an account? "}
        <br />
        <button onClick={() => setIsSignUp(!isSignUp)}>
          {isSignUp ? "Log in" : "Sign Up"}
        </button>
      </p>
    </div>
  );
};

export default Login;
