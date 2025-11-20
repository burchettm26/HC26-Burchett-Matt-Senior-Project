import React from "react";

function HomePage() {
  return (
    <div style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        padding: "15px",
      }}>
      <div style = {{
        backgroundColor: "#ff4646ff",       // box background
        padding: "15px 25px",          // space inside box
        borderRadius: "12px",          // rounded corners
        boxShadow: "0 4px 10px rgba(0,0,0,0.15)", // soft shadow
        textAlign: "center",}}>
        <h2>Welcome to the Mood & Running Task Tracker!</h2>
      </div>
      <p style={{ marginTop: "12px", fontSize: "18px", color: "black" }}>
          Track your runs, monitor your progress, and stay motivated.
      </p>

      <div
        style={{
          display: "flex",         // side-by-side layout
          gap: "30px",             // space between boxes
          marginTop: "20px",
        }}
      >
        <div
          style={{
            backgroundColor: "#939393ff",
            padding: "20px",
            borderRadius: "10px",
            width: "350px",
            boxShadow: "0 4px 10px rgba(0,0,0,0.15)",
            textAlign: "center",
          }}
        >
          <h3 style={{ marginBottom: "10px" }}>Recent Activity</h3>
          <p>View your latest runs and stats.</p>
        </div>

        <div
          style={{
            backgroundColor: "#939393ff",
            padding: "20px",
            borderRadius: "10px",
            width: "350px",
            minHeight: "250px",
            boxShadow: "0 4px 10px rgba(0,0,0,0.15)",
            textAlign: "center",
          }}
        >
          <h3 style={{ marginBottom: "10px" }}>Add New Run</h3>
          <p>Start tracking a new run here.</p>
        </div>
      </div>
    </div> 
    
  );
}

export default HomePage;