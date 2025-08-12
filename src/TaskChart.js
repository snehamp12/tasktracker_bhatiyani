import React from 'react';
import { Bar } from 'react-chartjs-2';
import { Chart, BarElement, CategoryScale, LinearScale } from 'chart.js';

// Register necessary Chart.js components
Chart.register(BarElement, CategoryScale, LinearScale);

/**
 * TaskChart component shows a bar chart visualizing the number of tasks by their status.
 * @param {Array} tasks - List of task objects with status field
 */
const TaskChart = ({ tasks }) => {
  // Count tasks by status
  const statusCounts = {
    "To Do": 0,
    "In Progress": 0,
    "Done": 0,
  };

  tasks.forEach(task => {
    if (statusCounts[task.status] !== undefined) {
      statusCounts[task.status]++;
    }
  });

  // Prepare data for Chart.js bar chart
  const data = {
    labels: Object.keys(statusCounts),
    datasets: [
      {
        label: 'Number of Tasks',
        data: Object.values(statusCounts),
        backgroundColor: ['#1976d2', '#9c27b0', '#2e7d32'], // Colors for bars
      },
    ],
  };

  return <Bar data={data} />;
};

export default TaskChart;
