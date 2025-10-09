import React, { useEffect, useState } from "react";
import styles from "../styles/Dashboard.module.css";
import NavigationBar from "./NavigationBar";

const API_URL = "http://127.0.0.1:8000/api/accounts";

function Dashboard() {
  const [profile, setProfile] = useState(null);
  const [projects, setProjects] = useState([]);
  const [form, setForm] = useState({
    title: "",
    description: "",
    category: "",
    budget: "",
    duration: "",
  });

  const accessToken = localStorage.getItem("access_token");

  // Fetch client profile
  const fetchProfile = async () => {
    try {
      const res = await fetch(`${API_URL}/client-profile/`, {
        headers: { Authorization: `Bearer ${accessToken}` },
      });
      if (res.ok) {
        const data = await res.json();
        setProfile(data);
      } else {
        console.error("Failed to fetch profile");
      }
    } catch (err) {
      console.error(err);
    }
  };

  // Fetch client's projects
  const fetchProjects = async () => {
    try {
      const res = await fetch(`${API_URL}/projects/`, {
        headers: { Authorization: `Bearer ${accessToken}` },
      });
      if (res.ok) {
        const data = await res.json();
        setProjects(data);
      } else {
        console.error("Failed to fetch projects");
      }
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchProfile();
    fetchProjects();
  }, []);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // Create project
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch(`${API_URL}/projects/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
        body: JSON.stringify(form),
      });

      if (res.ok) {
        alert("✅ Project created successfully!");
        setForm({ title: "", description: "", category: "", budget: "", duration: "" });
        fetchProjects();
      } else {
        const data = await res.json();
        alert(JSON.stringify(data));
      }
    } catch (err) {
      console.error(err);
    }
  };

  // Delete project
  const deleteProject = async (projectId) => {
    if (!window.confirm("Are you sure you want to delete this project?")) return;

    try {
      const res = await fetch(`${API_URL}/projects/${projectId}/`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${accessToken}` },
      });
      if (res.ok || res.status === 204) {
        alert("✅ Project deleted successfully!");
        fetchProjects();
      } else {
        alert("Failed to delete project.");
      }
    } catch (err) {
      console.error(err);
    }
  };

  // Delete proposal
  const deleteProposal = async (proposalId) => {
    if (!window.confirm("Are you sure you want to delete this proposal?")) return;

    try {
      const res = await fetch(`${API_URL}/proposals/${proposalId}/`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${accessToken}` },
      });
      if (res.ok || res.status === 204) {
        alert("✅ Proposal deleted successfully!");
        fetchProjects();
      } else {
        alert("Failed to delete proposal.");
      }
    } catch (err) {
      console.error(err);
    }
  };

  if (!profile) return <p>Loading profile...</p>;

  return (
    <div className={styles.container}>
        <div className={styles.logo}>TalentLink</div>
      <NavigationBar />

      <h1>Client Dashboard</h1>

      {/* Profile Section */}
      <div className={styles.card}>
        <h2>Your Profile</h2>
        <p><strong>Company:</strong> {profile.company_name}</p>
        <p><strong>Bio:</strong> {profile.bio || "No bio provided."}</p>
        <p><strong>Email:</strong> {profile.contact_email}</p>
      </div>

      {/* Add Project Form */}
      <div className={styles.card}>
        <h2>Add Project</h2>
        <form onSubmit={handleSubmit}>
          <input name="title" placeholder="Title" value={form.title} onChange={handleChange} required />
          <input name="description" placeholder="Description" value={form.description} onChange={handleChange} required />
          <input name="category" placeholder="Category" value={form.category} onChange={handleChange} required />
          <input name="budget" type="number" placeholder="Budget" value={form.budget} onChange={handleChange} required />
          <input name="duration" type="number" placeholder="Duration (days)" value={form.duration} onChange={handleChange} required />
          <button type="submit">Create Project</button>
        </form>
      </div>

      {/* Projects List */}
      <div className={styles.card}>
        <h2>Your Projects & Proposals</h2>
        {projects.length === 0 ? (
          <p>No projects found.</p>
        ) : (
          projects.map((project) => (
            <div key={project.id} className={styles.card}>
              <strong>{project.title}</strong> - {project.description}
              <p>Category: {project.category} | Budget: ${project.budget} | Duration: {project.duration} days</p>

              <button className={styles.deleteBtn} onClick={() => deleteProject(project.id)}>Delete Project</button>

              <h4>Proposals:</h4>
              {project.proposals.length === 0 ? (
                <p>No proposals yet.</p>
              ) : (
                <ul>
                  {project.proposals.map((p) => (
                    <li key={p.id}>
                      {p.freelancer.username}: {p.proposal_text} | Bid: ${p.bid_amount} | Status: {p.status}{" "}
                      <button className={styles.deleteBtn} onClick={() => deleteProposal(p.id)}>Delete Proposal</button>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default Dashboard;
