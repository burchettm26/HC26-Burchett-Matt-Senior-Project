import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import RunsPage from "./RunsPage";

function HomePage() {
  return (
    <div>
      <h1>Home Page</h1>
      <Link to="/runs">Go to Runs Page</Link>
    </div>
  );
}

function App() {
  return (
    <Router>
      <div style={{ textAlign: "center", marginTop: "50px" }}>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/runs" element={<RunsPage />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;