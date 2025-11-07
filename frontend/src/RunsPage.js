import React, { useEffect, useState } from "react";
import { getRuns } from "./api/runs";

const BASE_URL = "https://symmetrical-spoon-5g7jwjjjp4fv4p9-5000.app.github.dev";

function RunsPage() {
  const [runs, setRuns] = useState([]);
  const [formData, setFormData] = useState({ name: "", total_time: "", distance: "" });

  // Loading all runs
  useEffect(() => {
    getRuns().then((data) => {
      setRuns(data.runs);
    });
  }, []);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch(`${BASE_URL}/api/runs`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (!res.ok) throw new Error("Failed to add run");

      const data = await res.json();
      alert("✅ Run added successfully!");

      // Add new run to list immediately
      setRuns([...runs, data.run]);

      // Reset form
      setFormData({ name: "", total_time: "", distance: "" });
    } catch (err) {
      console.error(err);
      alert("❌ Error adding run");
    }
  };

  return (
    <div style={{ textAlign: "center", marginTop: "50px" }}>
      <h1>Add Run</h1>

      <form onSubmit={handleSubmit} style={{ marginBottom: "20px" }}>
        <input
          type="text"
          name="name"
          placeholder="Run name"
          value={formData.name}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="total_time"
          placeholder="Time (HH:MM:SS)"
          value={formData.total_time}
          onChange={handleChange}
          required
        />
        <input
          type="number"
          name="distance"
          placeholder="Distance (miles)"
          value={formData.distance}
          onChange={handleChange}
          step="0.01"
          required
        />
        <button type="submit">Add Run</button>
      </form>

      <h1>My Runs</h1>
      {runs.length > 0 ? (
        <ul style={{ listStyleType: "none", padding: 0 }}>
          {runs.map((run) => (
            <li key={run.id}>
              {run.name} — {run.distance} mi — {run.total_time} — {run.status}
            </li>
          ))}
        </ul>
      ) : (
        <p>No runs found.</p>
      )}

    </div>
  );
}

export default RunsPage;
