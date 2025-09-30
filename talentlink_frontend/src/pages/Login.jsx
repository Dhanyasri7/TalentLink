import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import styles from "../styles/Login.module.css";

function Login() {
  const navigate = useNavigate();
  const [form, setForm] = useState({ username: "", password: "" });

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();
    alert("Login functionality will connect to backend");
    navigate("/dashboard"); // placeholder
  };

  return (
    <div className={styles.container}>
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <div className={styles["form-group"]}>
          <label>Username</label>
          <input name="username" onChange={handleChange} required />
        </div>
        <div className={styles["form-group"]}>
          <label>Password</label>
          <input type="password" name="password" onChange={handleChange} required />
        </div>
        <button type="submit">Login</button>
      </form>
      <p>
        Don't have an account? <Link to="/register">Register here</Link>
      </p>
    </div>
  );
}

export default Login;
