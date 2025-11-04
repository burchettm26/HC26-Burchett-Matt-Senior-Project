// src/RunsPage.js
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getRuns } from "./api/runs";

function RunsPage() {
  const [runs, setRuns] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getRuns().then((data) => {
      setRuns(data.runs);
      setLoading(false);
    });
  }, []);

  if (loading) {
    return <p>Loading runs...</p>;
  }

  return (
    <div style={{ textAlign: "center", marginTop: "50px" }}>
      <h1>My Runs</h1>

      {runs.length > 0 ? (
        <ul style={{ listStyleType: "none", padding: 0 }}>
          {runs.map((run) => (
            <li key={run.id}>
              {run.name} — {run.status}
            </li>
          ))}
        </ul>
      ) : (
        <p>No runs found.</p>
      )}

      <Link to="/">Back to Home</Link>
    </div>
  );
}

export default RunsPage;
