---
layout: post
title: Defining Models and Relationships
---

Now that your Flask app and SQLAlchemy are set up, it’s time to create your first **database models** — the Python classes that represent your tables.  

In this section, you’ll define models, create a database, and understand how relationships work between tables.

---

## Learning Objectives
By the end of this section, you will:
- Define database tables using SQLAlchemy models.
- Understand columns, data types, and primary keys.
- Create one-to-many relationships between tables.
- Generate your database tables using `db.create_all()`.

---

## What is a Model?

In SQLAlchemy, a **model** is a Python class that maps directly to a database table.  
Each **attribute** of the class corresponds to a **column** in that table.

For example:

```python
from app import db

class User(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(80), nullable=False)
    email = db.Column(db.String(120), unique=True, nullable=False)
```

## Explanation

- **User** is your table name (automatically named user by default).
- *id*, *username*, and *email* are columns in that table.
- db.Column defines the data type and constraints:
    - db.Integer = whole numbers
    - db.String(n) = string with max length n
    - primary_key=True marks a *unique* identifier
    - unique=True prevents *duplicate* values
    - nullable=False means the field is *required*

## Step 1: Add Your Model to the Flask App

In your app.py file, add the model below the db = SQLAlchemy(app) line:

```python
class User(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(80), nullable=False)
    email = db.Column(db.String(120), unique=True, nullable=False)

    def __repr__(self):
        return f"<User {self.username}>"
```

## Step 2: Create the Database Tables

With your model defined, it’s time to create the actual table in your database.

Add the following after your model definition:

```python
with app.app_context():
    db.create_all()
```

This will:

Create the database file (example.db) if it doesn’t exist and add a new table for your model (user).

You can verify it worked by checking your project folder for example.db.

## Step 3: Add a Second Model and a Relationship

Let’s extend our database to include a second table — for example, a Run model that stores data about a user’s runs.

Add this below your User model:

```python
class Run(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    distance = db.Column(db.Float, nullable=False)
    mood = db.Column(db.String(50))
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'))
    user = db.relationship('User', backref='runs', lazy=True)

    def __repr__(self):
        return f"<Run {self.distance} miles>"
```

### Explanation

**user_id** is a foreign key that connects each Run to a specific User.

db.relationship('User', backref='runs') allows you to easily access a user’s runs:

```python
user = User.query.first()
print(user.runs)   # shows all runs for that user
```

The backref creates a shortcut: you can go from a Run to its User, and from a User to all their Runs.

## Step 4: Test the Relationship

Let’s test this setup in the Flask shell.

Run your Flask shell by typing:

```bash
flask shell
```
Then, inside the shell:

```python
from app import db, User, Run

# Create a new user
user = User(username="Alice", email="alice@example.com")
db.session.add(user)
db.session.commit()

# Add a run linked to that user
run = Run(distance=5.2, mood="Happy", user_id=user.id)
db.session.add(run)
db.session.commit()

# Query the database
User.query.all()
Run.query.all()
user.runs   # List of runs for Alice
```
If everything is correct, you’ll see your new user and their run data appear.

## Step 5: Understanding the ORM Workflow

Here’s what happens conceptually:

| Action | SQLAlchemy | Database Equivalent |
| ------ | ---- | --------------- |
| Define a class| class User(db.Model) | CREATE TABLE user (...) |
| Create an object | user = User(username="Alice") | INSERT INTO user ... |
| Query objects | User.query.all() | SELECT * FROM user |
| Commit changes | db.session.commit() | Saves all changes |

This **ORM** (Object Relational Mapper) system means you can work with Python objects instead of writing raw SQL.

## Quick Recap

You now know how to:

- Define database models and columns.
- Create relationships between tables.
- Generate database tables using SQLAlchemy.

To go back to the setup go here: [Setup for SQLAlchemy](./setup.md). To continue the tutorial and learn about CRUD operations in SQLALchemy go here: [CRUD Operations in SQLAlchemy](./crud.md).