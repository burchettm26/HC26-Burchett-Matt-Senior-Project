"""
File: runs_routes.py

Description:
Flask backend application for the running tracking portion of the project.
Implements API routes for retrieving and creating run entries while managing
database interactions through SQLAlchemy. Handles input validation for time
format and date parsing, and ensures returned responses follow a structured API.

Responsibilities:
- Define backend API routes for GET and POST /api/runs.
- Validate and parse request data before saving new runs.
- Query the database and return serialized run data.

Endpoints:
- GET /api/runs : Returns a list of all run entries.
- POST /api/runs : Validates input and adds a new run to the database.

Dependencies:
- Blueprint, request
- db, Run from models.py
- datetime
- re (for HH:MM:SS time validation)

Author: Matt Burchett
Last Modified: 11-19-2025
"""

from flask import Blueprint, request
from models import db, Run
from datetime import datetime
import re

runs_bp = Blueprint("runs_bp", __name__)

TOTAL_TIME_PATTERN = re.compile(r"^(?:[0-1]?\d|2[0-3]):[0-5]\d:[0-5]\d$") # HH:MM:SS format

@runs_bp.route("/api/runs", methods=["GET"]) # Needs to eventually be for a specific user
def get_runs():
    runs = Run.query.all()
    return {"runs": [run.to_dict() for run in runs]}

@runs_bp.route("/api/runs", methods=["POST"])
def add_run():
    data = request.get_json()

    if not TOTAL_TIME_PATTERN.match(data["total_time"]):
        return {"error": "Time must be in HH:MM:SS format"}, 400

    # Parse datetime if provided, otherwise use current UTC
    if "date" in data and data["date"]:
        try:
            run_datetime = datetime.strptime(data["date"], "%Y-%m-%dT%H:%M")
        except ValueError:
            return {"error": "Invalid datetime format. Use YYYY-MM-DDTHH:MM"}, 400
    else:
        run_datetime = datetime.utcnow()

    new_run = Run(
        name=data["name"],
        date=run_datetime,
        distance=data["distance"],
        total_time=data["total_time"],
        status="completed"
    )
    db.session.add(new_run)
    db.session.commit()
    return {"message": "Run added successfully", "run": new_run.to_dict()}, 201