from flask import Flask, request
from flask_sqlalchemy import SQLAlchemy
from flask_cors import CORS
from models import db, Run

app = Flask(__name__)
CORS(app)

app.config["SQLALCHEMY_DATABASE_URI"] = "sqlite:///runs.db"
app.config["SQLALCHEMY_TRACK_MODIFICATIONS"] = False
db.init_app(app)

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
    new_run = Run(
        name=data["name"],
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