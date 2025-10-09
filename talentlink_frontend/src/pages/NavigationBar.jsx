import React from "react";
import { Link, useNavigate } from "react-router-dom";
import styles from "../styles/NavigationBar.module.css";

function NavigationBar() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("access_token");
    localStorage.removeItem("refresh_token");
    navigate("/login");
  };

  return (
    <div className={styles.navbar}>
      <Link to="/dashboard" className={styles.button}>Dashboard</Link>
      <Link to="/find-freelancers" className={styles.button}>Find Freelancers</Link>
      <Link to="/find-projects" className={styles.button}>Find Projects</Link>
      <button onClick={handleLogout} className={styles.button}>Logout</button>
    </div>
  );
}

export default NavigationBar;
