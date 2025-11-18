/**
 * File: App.js
 *
 * Description:
 * Main React application entry point responsible for setting up routing, layout,
 * navigation, and page structure. Defines the top navigation bar and routes to
 * both the home page and the RunsPage component.
 *
 * Responsibilities:
 * - Configure React Router for page navigation.
 * - Render the navigation bar with site title/logo.
 * - Provide routes for Home and Runs pages.
 *
 * Key Components:
 * - App: Wrapper component with router and layout.
 * - HomePage: Simple landing page for the app.
 * - RunsPage: Imported component for managing run data.
 *
 * Dependencies:
 * - React
 * - react-router-dom (Router, Routes, Route, NavLink)
 *
 * Notes:
 * - Uses inline styles for navigation bar and header.
 *
 * Author: Matt Burchett
 * Last Modified: 2025-11-18
 */

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
      {/* <header style={{ backgroundColor: "#282c34", padding: "10px", color: "white", textAlign: "center" }}>
        <h1>Mood & Running Task Tracker</h1>
      </header> */}

      <nav style={{ background: "#79ddffff", 
      padding: "15px 30px", 
      textAlign: "center", 
      display: "flex",
      alignItems: "center",}}>

        <h1 style={{ margin: 0, 
          fontSize: "30px", 
          color: "white", 
          backgroundColor: "#000000ff",
          padding: "8px 14px",             // inside spacing
          borderRadius: "8px",              // rounded corners
          display: "inline-block",}}>
          M&RTT
        </h1>

        <NavLink
          to="/"
          end
          style={({ isActive }) => ({
            margin: "0 50px",
            fontSize: "25px",
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
            margin: "0 50px",
            fontSize: "25px",
            fontWeight: isActive ? "bold" : "normal",
            color: isActive ? "black" : "white",
            textDecoration: "none",
          })}
        >
          Runs
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