from flask_sqlalchemy import SQLAlchemy

db = SQLAlchemy()

class Run(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(100), nullable=False)
    distance = db.Column(db.Float, nullable=False)
    total_time = db.Column(db.String(50), nullable=False)
    status = db.Column(db.String(20), default="completed")

    def to_dict(self):
        return {
            "id": self.id,
            "name": self.name,
            "distance": self.distance,
            "total_time": self.total_time,
            "status": self.status,
        }