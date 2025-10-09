import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import styles from "../styles/Login.module.css";

const API_URL = "http://127.0.0.1:8000/api/accounts";

function Login() {
  const navigate = useNavigate();
  const [form, setForm] = useState({ username: "", password: "" });
  const [role, setRole] = useState("client"); // default role

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Login request
      const response = await fetch(`${API_URL}/login/`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      const data = await response.json();

      if (!response.ok) {
        alert(JSON.stringify(data));
        return;
      }

      // Save tokens
      localStorage.setItem("access_token", data.access);
      localStorage.setItem("refresh_token", data.refresh);

      // Navigate based on selected role
      if (role === "client") {
        navigate("/dashboard");
      } else if (role === "freelancer") {
        navigate("/freelancerdashboard");
      } else {
        navigate("/");
      }
    } catch (error) {
      console.error("Login error:", error);
      alert("Something went wrong. Check console.");
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

        <div className={styles["form-group"]}>
          <label>Login as:</label>
          <select value={role} onChange={(e) => setRole(e.target.value)}>
            <option value="client">Client</option>
            <option value="freelancer">Freelancer</option>
          </select>
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
