"use client";

import React from 'react';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Doughnut } from 'react-chartjs-2';

ChartJS.register(ArcElement, Tooltip, Legend);

interface PriorityProps {
  rawData: {
    critical: number;
    high: number;
    medium: number;
    low: number;
  };
}

const PriorityDistribution = ({ rawData }: PriorityProps) => {
  const data = {
    labels: ['Critical', 'High', 'Medium', 'Low'],
    datasets: [
      {
        data: [
          rawData.critical || 0,
          rawData.high || 0,
          rawData.medium || 0,
          rawData.low || 0
        ],
        backgroundColor: ['#ef4444', '#379dd4', '#eab308', '#14b8a6'],
        borderWidth: 0,
        hoverOffset: 4,
      },
    ],
  };

  const options = {
    cutout: '75%',
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'right' as const, // Moves legend to the right side
        align: 'start' as const,    // Aligns legend to the top
        labels: {
          usePointStyle: true,
          pointStyle: 'circle',
          padding: 20,              // Adds vertical spacing between legend items
          font: {
            size: 12,
            weight: 500 as const,
          },
        },
      },
      tooltip: {
        backgroundColor: '#1e293b',
        padding: 12,
        cornerRadius: 8,
      }
    },
  };

  return (
    /* The Container: Styled with Tailwind for a clean dashboard look */
    <div className="w-full bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold text-slate-800">Task Priorities</h3>
        <span className="text-xs font-medium px-2.5 py-0.5 rounded-full bg-slate-100 text-slate-600">
          Distribution
        </span>
      </div>

      {/* Chart Wrapper: Controls the height of the actual chart */}
      <div className="h-64 w-full relative">
        <Doughnut data={data} options={options} />
      </div>
    </div>
  );
};

export default PriorityDistribution;