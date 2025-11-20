const isLocal = window.location.hostname.includes("github.dev") ||
                window.location.hostname.includes("preview.app.github.dev") ||
                window.location.hostname.includes("localhost");

export const BASE_URL = isLocal
  ? "https://symmetrical-spoon-5g7jwjjjp4fv4p9-5000.app.github.dev" // your Codespaces backend
  : "https://hc26-burchett-matt-senior-project.onrender.com"; // your Render backend
