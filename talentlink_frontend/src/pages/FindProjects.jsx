import React, { useEffect, useState } from "react";
import styles from "../styles/FindProjects.module.css";

const API_URL = "http://127.0.0.1:8000/api/accounts";

function FindProjects() {
  const [projects, setProjects] = useState([]);
  const [filters, setFilters] = useState({
    search: "",
    category: "",
    budget: "",
    duration: "",
  });

  const accessToken = localStorage.getItem("access_token");

  // Fetch projects with filters
  const fetchProjects = async () => {
    try {
      // Build query params
      const params = new URLSearchParams();
      if (filters.search) params.append("search", filters.search);
      if (filters.category) params.append("category", filters.category);
      if (filters.budget) params.append("budget", filters.budget);
      if (filters.duration) params.append("duration", filters.duration);

      const res = await fetch(`${API_URL}/projects/?${params.toString()}`, {
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
    fetchProjects();
  }, []);

  const handleChange = (e) => {
    setFilters({ ...filters, [e.target.name]: e.target.value });
  };

  const handleFilter = (e) => {
    e.preventDefault();
    fetchProjects();
  };

  return (
    <div className={styles.container}>
      <h1>Find Projects</h1>

      {/* Filter Form */}
      <form className={styles.filterForm} onSubmit={handleFilter}>
        <input
          type="text"
          name="search"
          placeholder="Search by title or description"
          value={filters.search}
          onChange={handleChange}
        />
        <input
          type="text"
          name="category"
          placeholder="Filter by skill/category"
          value={filters.category}
          onChange={handleChange}
        />
        <input
          type="number"
          name="budget"
          placeholder="Max Budget"
          value={filters.budget}
          onChange={handleChange}
        />
        <input
          type="number"
          name="duration"
          placeholder="Max Duration (days)"
          value={filters.duration}
          onChange={handleChange}
        />
        <button type="submit">Apply Filters</button>
      </form>

      {/* Projects List */}
      {projects.length === 0 ? (
        <p>No projects found.</p>
      ) : (
        projects.map((project) => (
          <div key={project.id} className={styles.card}>
            <h3>{project.title}</h3>
            <p>{project.description}</p>
            <p>
              Category: {project.category} | Budget: ${project.budget} | Duration: {project.duration} days
            </p>
          </div>
        ))
      )}
    </div>
  );
}

export default FindProjects;
