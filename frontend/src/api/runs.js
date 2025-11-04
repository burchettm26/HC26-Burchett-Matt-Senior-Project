const BASE_URL = "https://symmetrical-spoon-5g7jwjjjp4fv4p9-5000.app.github.dev";

export async function getRuns() {
  try {
    const res = await fetch(`${BASE_URL}/api/runs`);
    if (!res.ok) throw new Error("Failed to fetch runs");
    return await res.json();
  } catch (err) {
    console.error("Error fetching runs:", err);
    return { runs: [] };
  }
}