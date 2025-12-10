import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import RunsPage from "../src/api/RunsPage";
import { getRuns } from "../src/api/runs";

jest.mock("../src/api/runs"); // mock getRuns
global.fetch = jest.fn();     // mock fetch

beforeEach(() => {
  getRuns.mockResolvedValue({
    runs: [
      {
        id: 1,
        date: "2025-01-01",
        name: "Test Run",
        distance: 3.5,
        total_time: "00:30:00",
        pace: "8:34"
      }
    ]
  });
});

test("loads and displays runs", async () => {
  render(<RunsPage />);

  const row = await screen.findByText("Test Run");
  expect(row).toBeInTheDocument();
});

test("submits a new run", async () => {
  fetch.mockResolvedValueOnce({ ok: true });

  render(<RunsPage />);

  fireEvent.change(screen.getByPlaceholderText("Run name"), {
    target: { value: "My New Run" }
  });
  fireEvent.change(screen.getByPlaceholderText("Distance (miles)"), {
    target: { value: "2" }
  });
  fireEvent.change(screen.getByPlaceholderText("Time (HH:MM:SS)"), {
    target: { value: "00:20:00" }
  });

  // Fill date
  fireEvent.change(screen.getByLabelText(/add run/i, { selector: "input[type=datetime-local]" }) || 
    screen.getByRole("textbox", { name: /date/i })
  , {
    target: { value: "2025-01-02T12:00" }
  });

  fireEvent.click(screen.getByText("Add Run"));

  await waitFor(() => {
    expect(fetch).toHaveBeenCalledTimes(1);
  });
});

test("deletes a run", async () => {
  fetch.mockResolvedValueOnce({ ok: true });

  render(<RunsPage />);

  const deleteButton = await screen.findByText("Delete");
  fireEvent.click(deleteButton);

  await waitFor(() => {
    expect(fetch).toHaveBeenCalledWith(expect.stringContaining("/api/runs/1"), expect.any(Object));
  });
});
