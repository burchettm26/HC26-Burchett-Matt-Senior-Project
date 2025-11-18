import React, { useEffect, useState } from "react";
import { getRuns } from "./api/runs";

const BASE_URL = "https://symmetrical-spoon-5g7jwjjjp4fv4p9-5000.app.github.dev";

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
