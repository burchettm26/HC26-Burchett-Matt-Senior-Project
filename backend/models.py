from flask_sqlalchemy import SQLAlchemy
from datetime import datetime

db = SQLAlchemy()

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
            "date": self.date.strftime("%b %d, %Y %I:%M %p"),
            "distance": self.distance,
            "total_time": self.total_time,
            "pace": self.calculate_pace(),
            "status": self.status,
        }