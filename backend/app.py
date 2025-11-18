"""
File: app.py

Description:
Main Flask backend application for the Running Tracker project.
Implements API routes for retrieving and creating run entries while managing
database interactions through SQLAlchemy. Handles input validation for time
format and date parsing, and ensures returned responses follow a structured API.

Responsibilities:
- Configure Flask, CORS, and SQLAlchemy.
- Define backend API routes for GET and POST /api/runs.
- Validate and parse request data before saving new runs.
- Query the database and return serialized run data.
- Initialize the SQLite database and start the server.

Endpoints:
- GET /api/runs : Returns a list of all run entries.
- POST /api/runs : Validates input and adds a new run to the database.
- GET / : Simple status message for backend availability.

Dependencies:
- Flask, request
- SQLAlchemy via models.py
- flask_cors
- datetime
- re (for HH:MM:SS time validation)

Author: Matt Burchett
Last Modified: 2025-11-18
"""

from flask import Flask
from flask_cors import CORS
from models import db, Run
from routes.runs_routes import runs_bp

app = Flask(__name__)
CORS(app)

app.config["SQLALCHEMY_DATABASE_URI"] = "sqlite:///runs.db"
app.config["SQLALCHEMY_TRACK_MODIFICATIONS"] = False

db.init_app(app)

app.register_blueprint(runs_bp)

@app.route("/")
def home():
    return {"message": "Hello from backend!"}

if __name__ == "__main__":
    with app.app_context():
        db.create_all()  # Creates the runs.db file automatically
    app.run(host="0.0.0.0", port=5000)