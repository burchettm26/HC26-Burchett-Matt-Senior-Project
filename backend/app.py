from flask import Flask, request
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

@app.route("/")
def home():
    return {"message": "Hello from backend!"}

@app.route("/api/runs", methods=["GET"]) # Needs to eventually be for a specific user
def get_runs():
    # Example data; replace with actual data retrieval logic
    runs = [
        {"id": 1, "name": "Run 1", "distance": "3.0", "total_time": "00:21:30", "status": "completed"},
        {"id": 2, "name": "Run 2", "distance": "4.0", "total_time": "00:30:00", "status": "completed"},
    ]
    return {"runs": runs}

@app.route("/api/runs", methods=["POST"])
def add_run():
    data = request.get_json()
    if not data or "name" not in data:
        return {"error": "Missing 'name' field"}, 400
    new_run = {"id": len(get_runs()) + 1, "name": data["name"], "distance": data["distance"], "total_time": data["total_time"], "status": "completed"}
    get_runs()["runs"].append(new_run)
    return {"message": "Run added successfully", "run": new_run}, 201

if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5000)