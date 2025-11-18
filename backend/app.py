from flask import Flask, request
from flask_sqlalchemy import SQLAlchemy
from flask_cors import CORS
from models import db, Run
from datetime import datetime
import re

app = Flask(__name__)
CORS(app)

app.config["SQLALCHEMY_DATABASE_URI"] = "sqlite:///runs.db"
app.config["SQLALCHEMY_TRACK_MODIFICATIONS"] = False
db.init_app(app)

TIME_PATTERN = re.compile(r"^(?:[0-1]?\d|2[0-3]):[0-5]\d:[0-5]\d$") # HH:MM:SS format

@app.route("/")
def home():
    return {"message": "Hello from backend!"}

@app.route("/api/runs", methods=["GET"]) # Needs to eventually be for a specific user
def get_runs():
    runs = Run.query.all()
    return {"runs": [run.to_dict() for run in runs]}

@app.route("/api/runs", methods=["POST"])
def add_run():
    data = request.get_json()

    if not TIME_PATTERN.match(data["total_time"]):
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

if __name__ == "__main__":
    with app.app_context():
        db.create_all()  # Creates the runs.db file automatically
    app.run(host="0.0.0.0", port=5000)