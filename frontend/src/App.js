import React from "react";
import { BrowserRouter as Router, Routes, Route, NavLink } from "react-router-dom";
import RunsPage from "./RunsPage";

function HomePage() {
  return (
    <div>
      <h2>Welcome to the Mood & Running Task Tracker</h2>
    </div>
  );
}

function App() {
  return (
    <Router>
      <header style={{ backgroundColor: "#282c34", padding: "10px", color: "white", textAlign: "center" }}>
        <h1>Mood & Running Task Tracker</h1>
      </header>

      <nav style={{ background: "#79ddffff", padding: "15px", fontSize: "30px" }}>
        <NavLink
          to="/"
          end
          style={({ isActive }) => ({
            margin: "0 15px",
            fontSize: "18px",
            fontWeight: isActive ? "bold" : "normal",
            color: isActive ? "black" : "white",
            textDecoration: "none",
          })}
        >
          Home
        </NavLink>
        <NavLink
          to="/runs"
          end
          style={({ isActive }) => ({
            margin: "0 15px",
            fontSize: "18px",
            fontWeight: isActive ? "bold" : "normal",
            color: isActive ? "black" : "white",
            textDecoration: "none",
          })}
        >
          Runs
        </NavLink>

        <NavLink
          to="/runs"
          end
          style={({ isActive }) => ({
            margin: "0 15px",
            fontSize: "18px",
            fontWeight: isActive ? "bold" : "normal",
            color: isActive ? "black" : "white",
            textDecoration: "none",
          })}
        >
          Mood Tracker
        </NavLink>

        <NavLink
          to="/runs"
          end
          style={({ isActive }) => ({
            margin: "0 15px",
            fontSize: "18px",
            fontWeight: isActive ? "bold" : "normal",
            color: isActive ? "black" : "white",
            textDecoration: "none",
          })}
        >
        Progress  
        </NavLink>

        <NavLink
          to="/runs"
          end
          style={({ isActive }) => ({
            margin: "0 15px",
            fontSize: "18px",
            fontWeight: isActive ? "bold" : "normal",
            color: isActive ? "black" : "white",
            textDecoration: "none",
          })}
        >
          Profile
        </NavLink>
      </nav>

      <div style={{ textAlign: "center", marginTop: "10px" }}>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/runs" element={<RunsPage />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;