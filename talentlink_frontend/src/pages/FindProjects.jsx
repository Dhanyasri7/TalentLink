import React, { useEffect, useState } from "react";
import styles from "../styles/FindProjects.module.css";

const API_URL = "http://127.0.0.1:8000/api/accounts";

function FindProjects() {
  const [projects, setProjects] = useState([]);
  const [search, setSearch] = useState("");
  const [filters, setFilters] = useState({ category: "", budget: "", duration: "" });

  const accessToken = localStorage.getItem("access_token");

  const fetchProjects = async () => {
    let query = `?search=${search}`;
    if (filters.category) query += `&category=${filters.category}`;
    if (filters.budget) query += `&budget=${filters.budget}`;
    if (filters.duration) query += `&duration=${filters.duration}`;

    try {
      const res = await fetch(`${API_URL}/projects/${query}`, {
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
    fetchProjects();
  }, []);

  const handleSearch = () => {
    fetchProjects();
  };

  const handleFilterChange = (e) => {
    setFilters({ ...filters, [e.target.name]: e.target.value });
  };

  return (
    <div className={styles.container}>
    <NavigationBar />

      <h1>Find Projects</h1>

      <div className={styles.filters}>
        <input
          type="text"
          placeholder="Search by title/description/category"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <input
          name="category"
          placeholder="Category"
          value={filters.category}
          onChange={handleFilterChange}
        />
        <input
          name="budget"
          type="number"
          placeholder="Max Budget"
          value={filters.budget}
          onChange={handleFilterChange}
        />
        <input
          name="duration"
          type="number"
          placeholder="Duration (days)"
          value={filters.duration}
          onChange={handleFilterChange}
        />
        <button onClick={handleSearch}>Search / Filter</button>
      </div>

      <div className={styles.projectList}>
        {projects.length === 0 ? (
          <p>No projects found.</p>
        ) : (
          projects.map((project) => (
            <div key={project.id} className={styles.card}>
              <h3>{project.title}</h3>
              <p>{project.description}</p>
              <p>Category: {project.category}</p>
              <p>Budget: ${project.budget} | Duration: {project.duration} days</p>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default FindProjects;
