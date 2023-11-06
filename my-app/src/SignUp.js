import React, { useState } from "react";

const SignUp = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("");

  const handleSignUp = async () => {
    console.log("hello 1");
    const data = {
      username: username,
      password: password,
      role: role,
    };
    console.log("hello 2");

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
    <div>
      <h2>Sign Up</h2>
      <form>
        <div>
          <label>Email:</label>
          <input type="username" value={username} onChange={(e) => setUsername(e.target.value)} />
        </div>
        <div>
          <label>Password:</label>
          <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
        </div>
        <div>
          <label>User Type:</label>
          <select value={role} onChange={(e) => setRole(e.target.value)}>
            <option value="PATIENT">Patient</option>
            <option value="DOCTOR">Doctor</option>
          </select>
        </div>
        <button type="button" onClick={handleSignUp}>Sign Up</button>
      </form>
    </div>
  );
};

export default SignUp;


//import React, { useState } from "react";
//import'./Login.css'
//
//const SignUp = () => {
//  const [email, setEmail] = useState("");
//  const [password, setPassword] = useState("");
//  const [userType, setUserType] = useState("patient");
//
//  const handleSignUp = () => {
//    const data = {
//        email: email,
//        password: password,
//        userType: userType,
//    };
//
//    fetch('http://127.0.0.1:8000/sign_up_doctor/', {
//        method: 'POST',
//        headers: {'Content-Type': 'application/json'},
//        body: JSON.stringify(data),
//    })
//  };
//
//  return (
//    <div>
//      <h2>Sign Up</h2>
//      <form>
//        <div>
//          <label>Email:</label>
//          <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
//        </div>
//        <div>
//          <label>Password:</label>
//          <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
//        </div>
//        <div>
//          <label>User Type:</label>
//          <select value={userType} onChange={(e) => setUserType(e.target.value)}>
//            <option value="patient">Patient</option>
//            <option value="doctor">Doctor</option>
//          </select>
//        </div>
//        <button onClick={handleSignUp}>Sign Up</button>
//      </form>
//    </div>
//  );
//};
//
//export default SignUp;
