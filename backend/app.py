from flask import Flask
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

@app.route("/")
def home():
    return {"message": "Hello from backend!"}

@app.route("/api/runs") # Needs to eventually be for a specific user
def get_runs():
    # Example data; replace with actual data retrieval logic
    runs = [
        {"id": 1, "name": "Run 1", "status": "completed"},
        {"id": 2, "name": "Run 2", "status": "completed"},
    ]
    return {"runs": runs}

if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5000)