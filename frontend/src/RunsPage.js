/**
 * File: RunsPage.js
 *
 * Description:
 * React page component for displaying and adding user runs. This component shows
 * a form for entering run details and a table listing all existing runs from the
 * backend API. The component fetches data on mount and handles state updates for
 * both form input and run listing.
 *
 * Responsibilities:
 * - Render a form allowing users to submit new run data.
 * - Validate and send POST requests to the backend.
 * - Fetch existing runs from the backend when the page loads.
 * - Display run information in a styled table, including calculated pace.
 *
 * Key Components / Functions:
 * - RunsPage: Main page component with form and table.
 * - handleChange(): Updates form state on user input.
 * - handleSubmit(): Sends POST /api/runs request to backend.
 *
 * Dependencies:
 * - React (useState, useEffect)
 * - getRuns() from ./api/runs
 * - fetch API
 *
 * Notes:
 * - Requires backend time format HH:MM:SS for successful submission.
 * - Displays pace computed on the backend via Run model.
 *
 * Author: Matt Burchett
 * Last Modified: 2025-11-18
 */

import React, { useEffect, useState } from "react";
import { getRuns } from "./api/runs";

const BASE_URL = "https://symmetrical-spoon-5g7jwjjjp4fv4p9-5000.app.github.dev";

// Inline styles for table elements, going to move to a CSS file later
const th = {
  borderBottom: "2px solid black",
  padding: "10px",
  background: "#f2f2f2",
};

const td = {
  padding: "10px",
  borderBottom: "1px solid #ccc",
  textAlign: "center",
};

const tr = {
  backgroundColor: "white",
};

function RunsPage() {
  const [runs, setRuns] = useState([]);
  const [formData, setFormData] = useState({ name: "", date: "", total_time: "", distance: "" });

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

      //const data = await res.json();
      alert("✅ Run added successfully!");

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
          type="datetime-local"
          name="date"
          value={formData.date}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="name"
          placeholder="Run name"
          value={formData.name}
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
        <input
          type="text"
          name="total_time"
          placeholder="Time (HH:MM:SS)"
          value={formData.total_time}
          onChange={handleChange}
          required
          pattern="^([0-1]?\d|2[0-3]):[0-5]\d:[0-5]\d$"
        />
        <button type="submit">Add Run</button>
      </form>

      <h1>My Runs</h1>
      {runs.length > 0 ? (
        <table className="runs-table" style={{ margin: "0 auto", borderCollapse: "collapse", width: "80%" }}>
          <thead>
            <tr>
              <th style={th}>Date</th>
              <th style={th}>Name</th>
              <th style={th}>Distance (mi)</th>
              <th style={th}>Total Time</th>
              <th style={th}>Pace</th>
            </tr>
          </thead>

        <tbody>
          {runs.map((run) => (
            <tr key={run.id} style={tr}>
              <td style={td}>{run.date}</td>
              <td style={td}>{run.name}</td>
              <td style={td}>{run.distance}</td>
              <td style={td}>{run.total_time}</td>
              <td style={td}>{run.pace}</td>
            </tr>
          ))}
        </tbody>
      </table>
      ) : (
        <p>No runs found.</p>
      )}

    </div>
  );
}

export default RunsPage;
