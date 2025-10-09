import React, { useState, useEffect } from "react";
import styles from "../styles/Profile.module.css";
const API_URL = "http://127.0.0.1:8000/api/accounts";

function Profile() {
  const [profile, setProfile] = useState(null);
  const [form, setForm] = useState({ portfolio: "", skills: "", hourly_rate: "", availability: true });
  const accessToken = localStorage.getItem("access_token");

  const fetchProfile = async () => {
    try {
      const res = await fetch(`${API_URL}/profiles/`, {
        headers: { Authorization: `Bearer ${accessToken}` },
      });
      if (res.ok) {
        const data = await res.json();
        if (data.length > 0) {
          setProfile(data[0]);
          setForm({
            portfolio: data[0].portfolio,
            skills: data[0].skills,
            hourly_rate: data[0].hourly_rate,
            availability: data[0].availability,
          });
        }
      }
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchProfile();
  }, []);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm({ ...form, [name]: type === "checkbox" ? checked : value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch(`${API_URL}/profiles/${profile ? profile.id + "/" : ""}`, {
        method: profile ? "PUT" : "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
        body: JSON.stringify(form),
      });

      if (res.ok) {
        alert("Profile saved successfully!");
        fetchProfile();
      } else {
        alert("Error saving profile");
      }
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className={styles.container}>
      <h1>Your Profile</h1>
      <form onSubmit={handleSubmit}>
        <input name="portfolio" placeholder="Portfolio" value={form.portfolio} onChange={handleChange} />
        <input name="skills" placeholder="Skills" value={form.skills} onChange={handleChange} />
        <input name="hourly_rate" type="number" placeholder="Hourly Rate" value={form.hourly_rate} onChange={handleChange} />
        <label>
          <input type="checkbox" name="availability" checked={form.availability} onChange={handleChange} />
          Available for work
        </label>
        <button type="submit">Save Profile</button>
      </form>
    </div>
  );
}

export default Profile;
