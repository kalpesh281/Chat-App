import React from "react";
import { Line, Doughnut } from "react-chartjs-2";
import {
  CategoryScale,
  Chart as ChartJS,
  Legend,
  Title,
  LineElement,
  PointElement,
  LinearScale,
  Filler,
  Tooltip,
  ArcElement,
} from "chart.js";
import { getLast7Days } from "../../libs/features";

ChartJS.register(
  CategoryScale,
  Legend,
  Title,
  LineElement,
  PointElement,
  LinearScale,
  Filler,
  Tooltip,
  ArcElement
);

const labels = getLast7Days();

const lineChartOptions = {
  responsive: true,
  plugins: {
    legend: {
      display: false,
    },
    title: {
      display: false,
    },
  },
  scales: {
    x: {
      grid: {
        display: false,
      },
    },
    y: {
      grid: {
        display: false,
      },
    },
  },
};

function LineChart({ value = [] }) {
  const data = {
    labels: labels,
    datasets: [
      {
        label: "Last Messages",
        data: value,
        fill: true,
        backgroundColor: "rgba(25, 118, 210, 0.15)", // Primary color with transparency
        borderColor: "#1976d2", // Primary color
        tension: 0.4,
        pointBackgroundColor: "#ffffff",
        pointBorderColor: "#1976d2",
        pointBorderWidth: 2,
        pointHoverBackgroundColor: "#1976d2",
        pointHoverBorderColor: "#ffffff",
      },
    ],
  };
  return <Line data={data} options={lineChartOptions} />;
}

function DoughnutChart({ labels = ["Groups", "Users"], values = [0, 0] }) {
  const data = {
    labels: labels,
    datasets: [
      {
        data: values,
        backgroundColor: [
          "#1976d2", // Primary blue (matching the app's primary color)
          "#2e7d32", // Success green (matching the app's success color)
        ],
        borderColor: [
          "#115293", // Darker primary (matching app's gradient)
          "#1b5e20", // Darker green (matching app's success dark)
        ],
        borderWidth: 1,
        hoverOffset: 5,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    cutout: "70%",
    plugins: {
      legend: {
        position: "bottom",
        labels: {
          padding: 15,
          font: {
            size: 12,
          },
          color: "#212121", // Text primary color
        },
      },
      title: {
        display: true,
        text: "Chat Distribution",
        font: {
          size: 16,
          weight: 600,
        },
        color: "#212121", // Text primary color
      },
    },
  };

  return <Doughnut data={data} options={options} />;
}

export { LineChart, DoughnutChart };
