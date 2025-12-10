import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import MoodPage from "../src/api/MoodPage";

global.fetch = jest.fn();

beforeEach(() => {
  fetch.mockResolvedValueOnce({
    ok: true,
    json: async () => ({
      moods: [
        {
          id: 1,
          date: "2025-01-01",
          positivity_level: 8,
          stress_level: 4,
          energy_level: 7,
          calmness_level: 6,
          motivation_level: 9
        }
      ]
    })
  });
});

test("loads and displays mood list", async () => {
  render(<MoodPage />);

  const moodEntry = await screen.findByText(/Positivity/i);
  expect(moodEntry).toBeInTheDocument();
});

test("submits a mood survey", async () => {
  fetch.mockResolvedValueOnce({ ok: true }); // POST request mock

  render(<MoodPage />);

  fireEvent.change(screen.getByLabelText(/Positivity/i), {
    target: { value: "7" }
  });

  fireEvent.change(screen.getByLabelText(/Stress/i), {
    target: { value: "5" }
  });

  fireEvent.change(screen.getByLabelText(/Energy/i), {
    target: { value: "8" }
  });

  fireEvent.change(screen.getByLabelText(/Calmness/i), {
    target: { value: "6" }
  });

  fireEvent.change(screen.getByLabelText(/Motivation/i), {
    target: { value: "9" }
  });

  fireEvent.click(screen.getByText("Submit Mood"));

  await waitFor(() => {
    expect(fetch).toHaveBeenCalledTimes(2); 
    // #1 initial GET /api/mood
    // #2 submit POST /api/mood
  });
});
