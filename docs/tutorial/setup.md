---
layout: post
title: Setup for SQLAlchemy
---

## Learning Objectives
By completing this setup, you will:
- Create a Flask app configured to use SQLAlchemy.
- Understand how Flask connects to a database through the ORM (Object Relational Mapper).
- Verify that everything runs successfully.

---

## Prerequisites
Before you begin, make sure you have the following installed:
- **Python 3.9+**
- **pip** (Python package manager)
- **A code editor**, such as Visual Studio Code
- **Basic familiarity with Flask** (creating routes, running a local server)

If you don’t already have Flask experience, you can review the [Flask Quickstart Guide](https://flask.palletsprojects.com/en/latest/quickstart/).

---

## Step 1: Create Your Project Folder
First, create a folder for your project. In your terminal or command prompt:

```bash
mkdir flask_sqlalchemy_tutorial
cd flask_sqlalchemy_tutorial
```

Then, create a virtual environment to keep your dependencies isolated:

```bash
python -m venv venv
source venv/bin/activate      # On macOS/Linux
venv\Scripts\activate         # On Windows
```

---

## Step 2: Install Flask and Flask-SQLAlchemy

Once your environment is active, install Flask and SQLAlchemy:

```bash
pip install flask flask_sqlalchemy
```

To check if they were installed correctly, run this command:
```bash
pip list
```

You should see output similar to this:
```
Flask            3.x.x
Flask-SQLAlchemy 3.x.x
SQLAlchemy       2.x.x
```

---

## Step 3: Initialize Your Flask App
Now create a file named app.py in your project directory.
Add the following code:

```python
from flask import Flask
from flask_sqlalchemy import SQLAlchemy

# Initialize Flask app
app = Flask(__name__)

# Configure database URI — using SQLite for simplicity
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///example.db'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

# Initialize database
db = SQLAlchemy(app)

@app.route("/")
def home():
    return "Flask + SQLAlchemy setup complete!"

if __name__ == "__main__":
    app.run(debug=True)
```

### What is all this?

- SQLALCHEMY_DATABASE_URI tells Flask where your database is located.
Here, it creates a file named example.db in your project folder.
- db = SQLAlchemy(app) initializes the database connection.
- The / route simply returns a test message to verify everything works.

---

## Step 4: Run the Application

Start your Flask app by running:
```bash
python app.py
```

If everything is configured correctly, your terminal should show:
```
* Running on http://127.0.0.1:5000
```

Open that URL in your browser and you should see this message:

**Flask + SQLAlchemy setup complete!**

Congratulations! You’ve successfully connected Flask with SQLAlchemy!

To *continue* the tutorial go here: **[Defining Models and Relationships](./models.md)**, or to go *back* to the previous page go here: **[Tutorial Introduction](./intro.md)**.