from flask import Blueprint, request
from models import db, Mood

mood_bp = Blueprint("mood_bp", __name__)

@mood_bp.route("/api/mood", methods=["GET"]) # Needs to eventually be for a specific user
def get_moods():
    moods = Mood.query.all()
    return {"moods": [mood.to_dict() for mood in moods]}

@mood_bp.route("/api/mood", methods=["POST"]) # Needs to eventually be for a specific user
def add_mood():
    data = request.get_json()

    new_mood = Mood(
        positivity_level=data["positivity_level"],
        stress_level=data["stress_level"],
        energy_level=data["energy_level"],
        calmness_level=data["calmness_level"],
        motivation_level=data["motivation_level"],
    )

    db.session.add(new_mood)
    db.session.commit()
    return {"message": "Mood added successfully", "mood": new_mood.to_dict()}, 201