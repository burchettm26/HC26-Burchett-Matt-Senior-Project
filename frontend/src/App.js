import React, { useEffect, useState } from "react";

function App() {
  const [message, setMessage] = useState("Loading...");

  useEffect(() => {
  fetch("https://symmetrical-spoon-5g7jwjjjp4fv4p9-5000.app.github.dev/")
    .then((res) => res.json())
    .then((data) => setMessage(data.message))
    .catch((err) => {
      console.error("Error:", err);
      setMessage("Error connecting to backend");
    });
}, []);

  return (
    <div style={{ textAlign: "center", marginTop: "50px" }}>
      <h1>Frontend → Backend Connection Test</h1>
      <p>{message}</p>
    </div>
  );
}

export default App;
