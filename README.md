# Task Tracker - Full Stack Project

## Overview
This is a simple task tracker web app built using React (frontend) and Flask (backend).  
It allows users to add, update, delete, and view tasks with different statuses.  
Task data is stored in backend memory, and categories are fetched from a JSON Server.

## Tech Stack
- Frontend: React, Material UI (MUI), Chart.js, JSON Server  
- Backend: Flask (Python) with full CRUD API  
- Tools: JSON Server for mock categories data  
- Deployment: (Add your live URLs here once deployed)

## Project Structure
- `/backend` - Flask backend API  
- `/frontend` - React frontend app  
- `/db.json` - JSON Server data file for categories

## Running Locally
1. Start JSON Server:
```bash
json-server --watch db.json --port 3001
