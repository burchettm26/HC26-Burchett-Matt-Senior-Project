---
layout: post
title: CRUD Operations in SQLAlchemy
---

Now that you’ve defined your models and relationships, it’s time to put them into action.  
In this section, you’ll learn how to perform **CRUD** operations — **Create**, **Read**, **Update**, and **Delete** — directly from Flask routes using SQLAlchemy.

---

## Learning Objectives

By the end of this section, you will:
- Add new records to the database.
- Retrieve and display data from tables.
- Update existing records.
- Delete records safely.
- Understand how SQLAlchemy sessions manage database changes.

---

## Step 1: Preparing Your App

Make sure your `app.py` file includes the models we built earlier (`User` and `Run`), and that your database (`example.db`) exists.

Your imports and setup should look like this at the top of the file:

```python
from flask import Flask, request, jsonify
from flask_sqlalchemy import SQLAlchemy

app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///example.db'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
db = SQLAlchemy(app)
```

## Step 2: Create (Adding Data)
To insert a new record into the database, you can use SQLAlchemy’s session system.
Let’s create a simple route to add a new user:

```python
@app.route("/add_user", methods=["POST"])
def add_user():
    data = request.get_json()
    new_user = User(username=data["username"], email=data["email"])
    db.session.add(new_user)
    db.session.commit()
    return jsonify({"message": "User added successfully!"})
```

### Example Request
You can test this using curl, Postman, or any frontend:

```bash
curl -X POST -H "Content-Type: application/json" \
-d '{"username": "Alice", "email": "alice@example.com"}' \
http://127.0.0.1:5000/add_user
```
This route:

Reads incoming JSON data, creates a new User object, and adds and commits it to the database.

## Step 3: Read (Querying Data)
You can retrieve all users, specific users, or related data.

```python
@app.route("/users")
def get_users():
    users = User.query.all()
    return jsonify([{"id": u.id, "username": u.username, "email": u.email} for u in users])
```

To fetch a single user by ID, use:

```python
@app.route("/users/<int:id>")
def get_user(id):
    user = User.query.get_or_404(id)
    return jsonify({"id": user.id, "username": user.username, "email": user.email})
```

You can visit these routes directly in your browser:

http://127.0.0.1:5000/users — all users

http://127.0.0.1:5000/users/1 — single user

## Step 4: Update (Modifying Data)
Updating records involves retrieving an existing entry, modifying it, and committing changes.

```python
@app.route("/update_user/<int:id>", methods=["PUT"])
def update_user(id):
    user = User.query.get_or_404(id)
    data = request.get_json()
    user.username = data.get("username", user.username)
    user.email = data.get("email", user.email)
    db.session.commit()
    return jsonify({"message": "User updated successfully!"})
```
Example Request:

```bash
curl -X PUT -H "Content-Type: application/json" \
-d '{"email": "alice_new@example.com"}' \
http://127.0.0.1:5000/update_user/1
```
## Step 5: Delete (Removing Data)
To remove a record:

```python
@app.route("/delete_user/<int:id>", methods=["DELETE"])
def delete_user(id):
    user = User.query.get_or_404(id)
    db.session.delete(user)
    db.session.commit()
    return jsonify({"message": "User deleted successfully!"})
```

Test it with:

```bash
curl -X DELETE http://127.0.0.1:5000/delete_user/1
```
## Step 6: CRUD for Related Data (Example with Runs)
Here’s how you can add and view Run entries related to a user.

Add a Run:

```python
@app.route("/add_run/<int:user_id>", methods=["POST"])
def add_run(user_id):
    user = User.query.get_or_404(user_id)
    data = request.get_json()
    run = Run(distance=data["distance"], mood=data["mood"], user=user)
    db.session.add(run)
    db.session.commit()
    return jsonify({"message": f"Run added for {user.username}!"})
```

View Runs for a User:

```python
@app.route("/runs/<int:user_id>")
def get_runs(user_id):
    user = User.query.get_or_404(user_id)
    return jsonify([
        {"id": r.id, "distance": r.distance, "mood": r.mood}
        for r in user.runs
    ])
```
## Understanding Sessions

- db.session.add() marks an object for insertion.
- db.session.commit() writes all pending changes.
- You can batch multiple operations before committing to improve performance.
- If something goes wrong, use db.session.rollback() to undo uncommitted changes.

## Recap

You now know how to:
- Perform all four CRUD operations with Flask + SQLAlchemy.
- Use routes to manage database records.
- Work with relationships (like users and runs).
- Your app can now dynamically store, modify, and retrieve data!

Click here to go back to [Defining Models and Relationships](./models.md). Click here to go to the practice section of the tutorial [Practice Exercises](./practice.md).