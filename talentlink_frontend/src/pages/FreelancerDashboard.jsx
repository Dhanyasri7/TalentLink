import React, { useEffect, useState } from "react";
import styles from "../styles/Dashboard.module.css";
import NavigationBar from "./NavigationBar";

const API_URL = "http://127.0.0.1:8000/api/accounts";

function FreelancerDashboard() {
  const [profile, setProfile] = useState(null);
  const [projects, setProjects] = useState([]);
  const [proposalForm, setProposalForm] = useState({ proposal_text: "", bid_amount: "" });
  const accessToken = localStorage.getItem("access_token");

  // Fetch freelancer profile
  const fetchProfile = async () => {
    try {
      const res = await fetch(`${API_URL}/freelancer-profile/`, {
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

  // Fetch all available projects
  const fetchProjects = async () => {
    try {
      const res = await fetch(`${API_URL}/projects/`, {
        headers: { Authorization: `Bearer ${accessToken}` },
      });
      if (res.ok) {
        const data = await res.json();
        setProjects(data);
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
    setProposalForm({ ...proposalForm, [e.target.name]: e.target.value });
  };

  const submitProposal = async (projectId) => {
    if (!proposalForm.proposal_text || !proposalForm.bid_amount) {
      alert("Please fill in both proposal text and bid amount.");
      return;
    }

    try {
      const res = await fetch(`${API_URL}/proposals/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
        body: JSON.stringify({ ...proposalForm, project: projectId }),
      });

      if (res.ok) {
        alert("✅ Proposal submitted successfully!");
        setProposalForm({ proposal_text: "", bid_amount: "" });
        fetchProjects(); // refresh projects to show updated proposals
      } else {
        const data = await res.json();
        alert(JSON.stringify(data));
      }
    } catch (err) {
      console.error(err);
      alert("❌ Something went wrong while submitting proposal.");
    }
  };

  if (!profile) return <p>Loading profile...</p>;

  return (
    <div className={styles.container}>
        <div className={styles.logo}>TalentLink</div>
      <NavigationBar />

      <h1>Freelancer Dashboard</h1>

      {/* Profile Section */}
      <div className={styles.card}>
        <h2>Your Profile</h2>
        <p><strong>Portfolio:</strong> {profile.portfolio || "No portfolio yet."}</p>
        <p><strong>Skills:</strong> {profile.skills || "No skills added."}</p>
        <p><strong>Hourly Rate:</strong> {profile.hourly_rate ? `$${profile.hourly_rate}/hr` : "Not set"}</p>
        <p><strong>Availability:</strong> {profile.availability ? "Available" : "Not Available"}</p>
      </div>

      {/* Available Projects */}
      <div className={styles.card}>
        <h2>Available Projects</h2>
        {projects.length === 0 ? (
          <p>No projects found.</p>
        ) : (
          projects.map((project) => (
            <div key={project.id} className={styles.card}>
              <strong>{project.title}</strong> - {project.description}
              <p>Category: {project.category} | Budget: ${project.budget} | Duration: {project.duration} days</p>

              <h4>Submit Proposal</h4>
              <input
                name="proposal_text"
                placeholder="Cover Letter"
                value={proposalForm.proposal_text}
                onChange={handleChange}
              />
              <input
                name="bid_amount"
                type="number"
                placeholder="Bid Amount"
                value={proposalForm.bid_amount}
                onChange={handleChange}
              />
              <button onClick={() => submitProposal(project.id)}>Submit Proposal</button>

              {/* Existing proposals */}
              {project.proposals.length > 0 && (
                <>
                  <h5>Proposals Submitted:</h5>
                  <ul>
                    {project.proposals.map((p) => (
                      <li key={p.id}>
                        {p.freelancer.username}: {p.proposal_text} | Bid: ${p.bid_amount} | Status: {p.status}
                      </li>
                    ))}
                  </ul>
                </>
              )}
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default FreelancerDashboard;
