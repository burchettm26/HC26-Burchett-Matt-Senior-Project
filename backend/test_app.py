from app import app, db, Run
import json
from datetime import datetime

def test_home():
    client = app.test_client()
    res = client.get("/")
    assert res.status_code == 200
    assert res.json["message"] == "Hello from backend!"

# Helper: resets test database for clean runs
def setup_function():
    with app.app_context():
        db.drop_all()
        db.create_all()


# Test GET /api/runs (empty DB)
def test_get_runs_empty():
    client = app.test_client()
    res = client.get("/api/runs")
    assert res.status_code == 200
    assert res.json["runs"] == []


# Test POST /api/runs with valid data
def test_add_run_success():
    client = app.test_client()

    data = {
        "name": "Morning Run",
        "date": "2025-01-15T09:30",
        "distance": 5.0,
        "total_time": "00:45:00"
    }

    res = client.post("/api/runs", json=data)

    assert res.status_code == 201
    assert res.json["message"] == "Run added successfully"
    assert res.json["run"]["name"] == "Morning Run"
    assert res.json["run"]["distance"] == 5.0
    assert res.json["run"]["total_time"] == "00:45:00"
    assert "pace" in res.json["run"]       # automatic model pace calculation


# Test POST /api/runs with invalid time format
def test_add_run_invalid_time():
    client = app.test_client()

    data = {
        "name": "Bad Time Run",
        "date": "2025-01-15T09:30",
        "distance": 3.0,
        "total_time": "45 minutes"   # invalid
    }

    res = client.post("/api/runs", json=data)

    assert res.status_code == 400
    assert res.json["error"] == "Time must be in HH:MM:SS format"


# Test POST /api/runs with invalid datetime format
def test_add_run_invalid_datetime():
    client = app.test_client()

    data = {
        "name": "Bad Date Run",
        "date": "15-01-2025 09:30",  # invalid
        "distance": 4.0,
        "total_time": "00:40:00"
    }

    res = client.post("/api/runs", json=data)

    assert res.status_code == 400
    assert res.json["error"] == "Invalid datetime format. Use YYYY-MM-DDTHH:MM"


# Test POST /api/runs with missing fields
def test_add_run_missing_fields():
    client = app.test_client()

    data = {
        "name": "Oops",
        # missing date
        # missing total_time
        "distance": 2.5
    }

    res = client.post("/api/runs", json=data)

    # Could raise KeyError or 400 depending on your app
    assert res.status_code in (400, 500)


# Test GET /api/runs after adding a run
def test_get_runs_after_adding():
    client = app.test_client()

    # Add run
    client.post("/api/runs", json={
        "name": "Evening Run",
        "date": "2025-02-01T18:00",
        "distance": 4.0,
        "total_time": "00:32:00"
    })

    # Get runs
    res = client.get("/api/runs")

    assert res.status_code == 200
    assert len(res.json["runs"]) == 1
    assert res.json["runs"][0]["name"] == "Evening Run"
