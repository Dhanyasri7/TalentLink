import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import styles from "../styles/Login.module.css";

function Login() {
  const navigate = useNavigate();
  const [form, setForm] = useState({ username: "", password: "" });

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
  e.preventDefault();

  try {
    const response = await fetch("http://127.0.0.1:8000/api/accounts/login/", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form), // sends { username, password }
    });

    const data = await response.json();

    if (response.ok) {
      // Save tokens in localStorage
      localStorage.setItem("access_token", data.access);
      localStorage.setItem("refresh_token", data.refresh);

      // Navigate to dashboard
      navigate("/dashboard");
    } else {
      alert(JSON.stringify(data)); // show error message
    }
  } catch (error) {
    console.error("Login error:", error);
  }
};


const fetchProfile = async (accessToken) => {
  try {
    const res = await fetch("http://127.0.0.1:8000/api/accounts/profile/", {
      method: "GET",
      headers: { Authorization: `Bearer ${accessToken}` },
    });

    if (res.ok) {
      const profile = await res.json();
      console.log("Logged-in user profile:", profile);
    } else {
      console.error("Failed to fetch profile");
    }
  } catch (err) {
    console.error("Profile fetch error:", err);
  }
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
