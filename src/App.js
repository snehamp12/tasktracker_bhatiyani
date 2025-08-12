import React, { useEffect, useState } from 'react';
import { Container, Typography, Button, TextField, Select, MenuItem } from '@mui/material';
import TaskChart from './TaskChart';

const API_URL = 'http://localhost:5000/tasks'; // Backend Flask API URL for tasks
const JSON_SERVER_URL = 'http://localhost:3001/categories'; // JSON Server URL for categories

function App() {
  // State variables for tasks, form inputs, and categories from JSON Server
  const [tasks, setTasks] = useState([]);
  const [title, setTitle] = useState('');
  const [status, setStatus] = useState('To Do');
  const [categories, setCategories] = useState([]);

  // Fetch tasks and categories when component mounts
  useEffect(() => {
    fetchTasks();
    fetchCategories();
  }, []);

  // Fetch all tasks from backend API
  const fetchTasks = async () => {
    const res = await fetch(API_URL);
    const data = await res.json();
    setTasks(data);
  };

  // Fetch categories from JSON Server
  const fetchCategories = async () => {
    const res = await fetch(JSON_SERVER_URL);
    const data = await res.json();
    setCategories(data);
  };

  // Add a new task via backend POST API
  const addTask = async () => {
    if (!title) return alert('Enter task title');
    await fetch(API_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ title, status }),
    });
    setTitle('');        // Clear input after adding
    setStatus('To Do');  // Reset status dropdown
    fetchTasks();        // Refresh task list
  };

  // Delete a task by ID via backend DELETE API
  const deleteTask = async (id) => {
    await fetch(`${API_URL}/${id}`, { method: 'DELETE' });
    fetchTasks();        // Refresh task list
  };

  return (
    <Container maxWidth="md" sx={{ mt: 4 }}>
      <Typography variant="h4" align="center" gutterBottom>
        Task Tracker
      </Typography>

      {/* Input form to add new tasks */}
      <div>
        <TextField
          label="Task Title"
          value={title}
          onChange={e => setTitle(e.target.value)}
          sx={{ mr: 2 }}
        />
        <Select
          value={status}
          onChange={e => setStatus(e.target.value)}
          sx={{ mr: 2, width: 150 }}
        >
          <MenuItem value="To Do">To Do</MenuItem>
          <MenuItem value="In Progress">In Progress</MenuItem>
          <MenuItem value="Done">Done</MenuItem>
        </Select>
        <Button variant="contained" onClick={addTask}>
          Add Task
        </Button>
      </div>

      {/* List of tasks */}
      <div style={{ marginTop: 20 }}>
        <Typography variant="h6">Tasks</Typography>
        {tasks.length === 0 ? (
          <p>No tasks</p>
        ) : (
          tasks.map(task => (
            <div
              key={task.id}
              style={{ display: 'flex', justifyContent: 'space-between', marginTop: 10 }}
            >
              <div>
                {task.title} - <strong>{task.status}</strong>
              </div>
              <Button color="error" onClick={() => deleteTask(task.id)}>
                Delete
              </Button>
            </div>
          ))
        )}
      </div>

      {/* Chart component showing task status counts */}
      <div style={{ marginTop: 40 }}>
        <TaskChart tasks={tasks} />
      </div>

      {/* Categories fetched from JSON Server */}
      <div style={{ marginTop: 40 }}>
        <Typography variant="h6">Categories from JSON Server</Typography>
        <ul>
          {categories.map(cat => (
            <li key={cat.id}>{cat.name}</li>
          ))}
        </ul>
      </div>
    </Container>
  );
}

export default App;
