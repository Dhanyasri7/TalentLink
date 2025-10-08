import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import styles from "../styles/Register.module.css";

function Register() {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    username: "",
    email: "",
    password: "",
    password2: "",  // Added field
    role: "freelancer", // or "client"
  });

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(
        "http://127.0.0.1:8000/api/accounts/register/",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(form),
        }
      );

      const data = await response.json();

      if (response.ok) {
        alert("Registration successful! Please login.");
        navigate("/login");
      } else {
        alert(JSON.stringify(data)); // show backend validation errors
      }
    } catch (error) {
      console.error("Registration error:", error);
    }
  };

  return (
    <div className={styles.container}>
      <h2>Register</h2>
      <form onSubmit={handleSubmit}>
        <div className={styles["form-group"]}>
          <label>Username</label>
          <input name="username" onChange={handleChange} required />
        </div>
        <div className={styles["form-group"]}>
          <label>Email</label>
          <input type="email" name="email" onChange={handleChange} required />
        </div>
        <div className={styles["form-group"]}>
          <label>Password</label>
          <input type="password" name="password" onChange={handleChange} required />
        </div>
        <div className={styles["form-group"]}>
          <label>Confirm Password</label>
          <input type="password" name="password2" onChange={handleChange} required />
        </div>
        <div className={styles["form-group"]}>
          <label>Role</label>
          <select name="role" onChange={handleChange}>
            <option value="freelancer">Freelancer</option>
            <option value="client">Client</option>
          </select>
        </div>
        <button type="submit">Register</button>
      </form>
      <p>
        Already have an account? <Link to="/login">Login here</Link>
      </p>
    </div>
  );
}

export default Register;
