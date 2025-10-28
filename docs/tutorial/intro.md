---
layout: post
title: Introduction
---

This tutorial will guide you through using **SQLAlchemy** — a powerful Object Relational Mapper (ORM) — with **Flask**, a lightweight web framework for Python.  
Together, these tools allow you to manage databases efficiently and interact with your data using Python instead of raw SQL.

By the end of this tutorial, you’ll have a fully functional Flask app that connects to a database, defines models, and performs CRUD (Create, Read, Update, Delete) operations.

---

## Learning Objectives

After completing this tutorial, you will be able to:

- Understand what SQLAlchemy is and how it integrates with Flask.  
- Configure Flask to use a SQLAlchemy database.  
- Define models that represent tables and relationships.  
- Perform CRUD operations through Flask routes.  
- Apply this knowledge to build real applications that store and manage data.

---

## Target Audience

This tutorial is designed for **beginner to intermediate web developers** who:

- Have basic knowledge of **Python** and **Flask** (routes, app structure).  
- Want to learn how to **connect a web app to a database**.  
- Are building a Flask project that needs **persistent data storage**, such as a task tracker, blog, or mood tracker.  

If you’re comfortable creating basic Flask apps but haven’t worked with databases before, this tutorial is perfect for you.

---

## What do you need for this Tutorial?

### Knowledge
You should already understand:
- Basic Python programming (variables, functions, classes)
- Fundamentals of Flask (creating routes, running the app)
- What databases are and why they’re useful (no SQL experience required)

### Installed Tools
Please ensure the following are installed and ready:

| Tool | Version | Description |
|------|----------|-------------|
| **Python** | 3.9 or later | Programming language used for Flask & SQLAlchemy |
| **pip** | latest | Python package manager |
| **Flask** | 3.x | Web framework |
| **Flask-SQLAlchemy** | 3.x | Database integration for Flask |
| **Code Editor** | any (VS Code recommended) | To edit your project files |
| **Terminal / Command Prompt** | — | To run commands |

You can verify installation by running:

```bash
python --version
pip --version
```

Next is the setup for this tutorial. It will ensure everything is correctly installed and you are working with the correct things. To go to the setup go here: [Setup For SQLAlchemy](./setup.md). To go back to the index go here: [Index](./index.md).