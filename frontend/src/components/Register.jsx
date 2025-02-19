import React, { useState } from "react";
import "../css/Register.css";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const baseURL = process.env.REACT_APP_URL;
function Register() {
  const [user, setUser] = useState({
    username: "",
    email: "",
    password: "",
  });
  const [error, setError] = useState(null);

  const navigate = useNavigate();
  const newRequest = axios.create({
    baseURL: `${baseURL}`,
    withCredentials: true,
  });
  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(user);
    try {
      await newRequest.post("/auth/register", {
        ...user      }, {headers:{'Content-Type':'application/json'}});
      navigate("/login")
    } catch (err) {
      console.log(err);
    }
  };
  const handleChange = (e) => {
    const {name, value} = e.target;
    setUser((prev) => ({
      ...prev,
      [name]: value
    }));
  };
  const handleSignUpClick = () => {
    navigate("/login"); // Assuming "/register" is the route to the Register component
  };
  return (
   /* From Uiverse.io by SteeveeG */ 
<div className="login">
  <form className="SignInForms">
    <div className="font header">Join Us...</div>
    <input type="text" name="username" className="Input" placeholder="Name" onChange={handleChange}/>
    <input type="email" name="email" className="Input" placeholder="Email address" onChange={handleChange}/>
    <input type="password" name="password" className="Input" placeholder="Password" onChange={handleChange}/>
    {/* <input type="password" className="Input" placeholder="Confirm password" onChange={handleChange} /> */}
    <div className="Buttons">
      <button className="SignInUp" style={{width:'150px '}} onClick={handleSubmit}>Create a account</button>
    </div>
    <div className="font header" style={{marginTop:'20px'}}>Already have an account?</div>
    <button className="SignInUp" onClick={handleSignUpClick}>Sign in</button>
  </form>
</div>

  );
}

export default Register;