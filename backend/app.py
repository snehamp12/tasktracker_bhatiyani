from flask import Flask, jsonify, request
from flask_cors import CORS

app = Flask(__name__)
CORS(app)  # Enable Cross-Origin Resource Sharing to allow frontend (React) to access backend API without CORS errors

# In-memory storage for tasks (list of dictionaries)
tasks = [
    {"id": 1, "title": "Sample task 1", "status": "To Do"},
    {"id": 2, "title": "Sample task 2", "status": "In Progress"},
    {"id": 3, "title": "Sample task 3", "status": "Done"},
]

@app.route('/tasks', methods=['GET'])
def get_tasks():
    """
    GET /tasks
    Return all tasks as JSON list.
    """
    return jsonify(tasks)

@app.route('/tasks', methods=['POST'])
def create_task():
    """
    POST /tasks
    Create a new task with title and status from request JSON body.
    Automatically assigns a new unique ID.
    Returns the created task with HTTP status 201.
    """
    data = request.json
    new_id = max(task['id'] for task in tasks) + 1 if tasks else 1
    new_task = {
        "id": new_id,
        "title": data['title'],
        "status": data['status']
    }
    tasks.append(new_task)
    return jsonify(new_task), 201

@app.route('/tasks/<int:task_id>', methods=['PUT'])
def update_task(task_id):
    """
    PUT /tasks/<task_id>
    Update an existing task’s title and/or status by its ID.
    If task not found, returns 404 error.
    """
    data = request.json
    for task in tasks:
        if task['id'] == task_id:
            task['title'] = data.get('title', task['title'])
            task['status'] = data.get('status', task['status'])
            return jsonify(task)
    return jsonify({"error": "Task not found"}), 404

@app.route('/tasks/<int:task_id>', methods=['DELETE'])
def delete_task(task_id):
    """
    DELETE /tasks/<task_id>
    Delete the task with given ID from the list.
    Returns success message.
    """
    global tasks
    tasks = [task for task in tasks if task['id'] != task_id]
    return jsonify({"message": "Deleted"}), 200

if __name__ == '__main__':
    # Run Flask app in debug mode (for development)
    app.run(debug=True)
