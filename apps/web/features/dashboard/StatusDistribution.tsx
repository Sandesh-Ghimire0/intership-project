"use client";

import React from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';

// 1. Register the specific elements required for Bar charts
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

interface StatusProps {
  rawData: {
    todo: number;
    inProgress: number;
    done: number;
  };
}

const StatusDistribution = ({ rawData }: StatusProps) => {
  const data = {
    labels: ['To Do', 'In Progress', 'Done'],
    datasets: [
      {
        label: 'Tasks',
        data: [
          rawData.todo || 0,
          rawData.inProgress || 0,
          rawData.done || 0
        ],
        // Different colors for each status bar
        backgroundColor: [
          '#CBD5E1', // Slate for Todo 
          '#FCD34D', // Yellow for In Progress
          '#6EE7B7', // Green for Done
        ],
        borderRadius: 8, // Rounds the top of the bars
        borderSkipped: false,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false, // Usually not needed for single-dataset bar charts
      },
      tooltip: {
        callbacks: {
          label: (context: any) => ` Tasks: ${context.raw}`,
        },
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        ticks: {
          stepSize: 1, // Since tasks are whole numbers
          precision: 0,
        },
        grid: {
          display: false, // Cleaner look
        },
      },
      x: {
        grid: {
          display: false,
        },
      },
    },
  };

  return (
    <div className="w-full bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
      <div className="mb-6">
        <h3 className="text-lg font-semibold text-slate-800">Task Status</h3>
        <p className="text-sm text-slate-500">Current workflow progress</p>
      </div>

      <div className="h-64 w-full">
        <Bar data={data} options={options as any} />
      </div>
    </div>
  );
};

export default StatusDistribution;