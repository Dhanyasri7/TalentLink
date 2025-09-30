import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import styles from "../styles/Register.module.css";

function Register() {
  const navigate = useNavigate();
  const [form, setForm] = useState({ username: "", email: "", password: "", role: "freelancer" });

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();
    alert("Register functionality will connect to backend");
    navigate("/login");
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
