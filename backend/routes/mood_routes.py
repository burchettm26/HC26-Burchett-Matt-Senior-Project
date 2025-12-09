from flask import Blueprint, request
from models import db, Mood

mood_bp = Blueprint("mood_bp", __name__)

@mood_bp.route("/api/mood", methods=["GET"]) # Needs to eventually be for a specific user
def get_moods():
    moods = Mood.query.all()
    return {"moods": [moods.to_dict() for mood in moods]}