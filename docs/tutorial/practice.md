---
layout: post
title: Practice Exercises
---

Now that you’ve completed the setup, model creation, and CRUD operations, it’s time to practice what you’ve learned.  
These exercises will help reinforce your understanding of how SQLAlchemy integrates with Flask to manage data effectively.

---

## Learning Objectives

By the end of this section, you will:
- Apply CRUD concepts in new contexts.
- Create and manipulate database relationships on your own.
- Practice debugging and testing database interactions.
- Build features similar to those used in real-world Flask applications.

---

## Exercise 1: Create a Mood Model

Extend your existing app with a new `Mood` model that records a user’s daily mood.  
This model should include:
- An integer `id` (primary key)
- A text field `description` (e.g., "Happy", "Tired", "Motivated")
- A date field `date`
- A foreign key connecting to the `User` table

### Example:
```python
class Mood(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    description = db.Column(db.String(100), nullable=False)
    date = db.Column(db.Date, nullable=False)
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'))
    user = db.relationship('User', backref='moods')
```

Once added, use db.create_all() again to update your database schema.

Goal: You should be able to create and query moods for each user.

---

## Exercise 2: Add Routes for the Mood Model
Now that the Mood table exists, create endpoints to manage it.

1. **POST** ```/add_mood/<user_id>``` — add a new mood entry.
2. **GET** ```/moods/<user_id>``` — list all moods for a user.
3. **DELETE** ```/delete_mood/<int:id>``` — remove a mood entry.

**Hint:**
Use the same patterns from your CRUD routes in 3_crud.md.

Make sure each mood connects properly to its user.

Bonus Challenge:
- Add a query route like ```/moods/<user_id>/latest``` that returns the user’s most recent mood based on the date.

---

## Exercise 3: Combine Runs and Moods
In your project, create a new route ```/dashboard/<user_id>``` that shows both:

- The user’s total number of runs
- The average distance of those runs
- Their most recent mood

### Example Output:
```json
{
  "user": "Alice",
  "total_runs": 5,
  "average_distance": 4.8,
  "latest_mood": "Motivated"
}
```
You can use SQLAlchemy queries like:

```python
from sqlalchemy import func

average_distance = db.session.query(func.avg(Run.distance)).filter_by(user_id=user.id).scalar()
```
**Goal**: Combine different models in one route and return summarized data.

## Reflection: Connecting It to Your Project

Answer these short questions in your notes (or your project journal):

- How can SQLAlchemy make managing your app’s data easier compared to writing raw SQL?
- What part of CRUD feels most intuitive to you now?
- How might you extend your app’s database to include other types of data (like workout types or notes)?

To go back to the CRUD Operations click here: [CRUD Operations in SQLAlchemy](./crud.md). To go on to the summary click here: [Summary & Additional Resources](./summary.md).