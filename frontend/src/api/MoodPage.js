import React, { useEffect, useState } from "react";
import { BASE_URL } from "./config";

function MoodPage() {
  const [moods, setMoods] = useState([]);

  // Loading all moods
  useEffect(() => {
    fetch(`${BASE_URL}/api/mood`)
      .then((res) => {
        if (!res.ok) throw new Error("Failed to fetch moods");
        return res.json();
      })
      .then((data) => {
        setMoods(data.moods);
      })
      .catch((err) => {
        console.error("Error fetching moods:", err);
        setMoods([]);
      });
  }, []);

  return (
    <div style={{ textAlign: "center", marginTop: "50px" }}>
      <h1>Mood Entries</h1>
      <ul>
        {moods.map((mood) => (
          <li key={mood.id}>
            Date: {mood.date}, Mood: {mood.mood_level}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default MoodPage;