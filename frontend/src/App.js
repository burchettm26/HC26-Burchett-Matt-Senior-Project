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
 * Last Modified: 11-19-2025
 */

import React from "react";
import { BrowserRouter as Router, Routes, Route, NavLink } from "react-router-dom";
import RunsPage from "./api/RunsPage";
import HomePage from "./home/HomePage";
import MoodPage from "./api/MoodPage";


function App() {
  return (
    <Router>

      <nav style={{ 
      background: "#939393ff",
      padding: "15px 30px", 
      textAlign: "center", 
      display: "flex",
      alignItems: "center"
      }}>

        <h1 style={{ 
          margin: 0, 
          fontSize: "30px", 
          color: "black", 
          backgroundColor: "#ff4646ff",
          padding: "8px 14px",             // inside spacing
          borderRadius: "8px",              // rounded corners
          display: "inline-block"
          }}>
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
        <NavLink
          to="/mood"
          end
          style={({ isActive }) => ({
            margin: "0 50px",
            fontSize: "25px",
            fontWeight: isActive ? "bold" : "normal",
            color: isActive ? "black" : "white",
            textDecoration: "none",
          })}
        >
          Mood
        </NavLink>
      </nav>

      <div>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/runs" element={<RunsPage />} />
          <Route path="/mood" element={<MoodPage />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;