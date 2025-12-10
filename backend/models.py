"""
File: models.py

Description:
Flask backend application models for the Running Tracker and Mood Tracker project.
Implements SQLAlchemy models for Run and Mood entries, defining their database
schemas and helper methods for serialization and pace calculation.

Responsibilities:
- Initialize and provide the SQLAlchemy database instance.
- Define the Run model with its fields and database schema.
- Offer helper methods to convert model instances to JSON-friendly dictionaries.
- Provide pace calculation logic based on total_time and distance.
- Define the Mood model with its fields and database schema.

Model: Run
Fields:
- id: Primary key
- name: Run name
- date: Datetime of run (defaults to UTC)
- distance: Distance in miles (float)
- total_time: String formatted as HH:MM:SS
- status: Completion status (default "completed")

Model: Mood
Fields:
- id: Primary key
- positivity_level: Integer rating
- stress_level: Integer rating
- energy_level: Integer rating
- calmness_level: Integer rating
- motivation_level: Integer rating Integer rating
- date: Datetime of mood entry (defaults to EST)

Key Methods:
- calculate_pace(): Computes pace per mile in mm:ss format.
- to_dict(): Serializes the run instance for API responses.

Dependencies:
- flask_sqlalchemy
- datetime
- zoneinfo

Author: Matt Burchett
Last Modified: 12-9-2025
"""

from flask_sqlalchemy import SQLAlchemy
from datetime import datetime
from zoneinfo import ZoneInfo

db = SQLAlchemy()
date_format = "%b %d, %Y %I:%M %p"


def get_est_time():
    return datetime.now(ZoneInfo("America/New_York")).replace(tzinfo=None)

class Run(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(100), nullable=False)
    date = db.Column(db.DateTime, default=datetime.utcnow)
    distance = db.Column(db.Float, nullable=False)
    total_time = db.Column(db.String(50), nullable=False)
    status = db.Column(db.String(20), default="completed")

    def calculate_pace(self):
        # Assuming total_time is in "HH:MM:SS" format
        h, m, s = map(int, self.total_time.split(':'))
        total_seconds = h * 3600 + m * 60 + s
        pace_seconds = total_seconds / self.distance
        pace_min = int(pace_seconds // 60)
        pace_sec = int(pace_seconds % 60)
        return f"{pace_min:2d}:{pace_sec:02d} /mi"

    def to_dict(self):
        return {
            "id": self.id,
            "name": self.name,
            "date": self.date.strftime(date_format),
            "distance": self.distance,
            "total_time": self.total_time,
            "pace": self.calculate_pace(),
            "status": self.status,
        }

class Mood(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    positivity_level = db.Column(db.Integer, nullable=False)
    stress_level = db.Column(db.Integer, nullable=False)
    energy_level = db.Column(db.Integer, nullable=False)
    calmness_level = db.Column(db.Integer, nullable=False)
    motivation_level = db.Column(db.Integer, nullable=False)
    date = db.Column(db.DateTime, default=get_est_time)

    def to_dict(self):
        return {
            "id": self.id,
            "positivity_level": self.positivity_level,
            "stress_level": self.stress_level,
            "energy_level": self.energy_level,
            "calmness_level": self.calmness_level,
            "motivation_level": self.motivation_level,
            "date": self.date.strftime(date_format),
        }