import React, { useEffect, useState, useRef } from 'react';
import Chart from 'chart.js/auto';
import styles from "../styles/Graph.module.css";

import { LineController, CategoryScale, LinearScale, PointElement, LineElement, Tooltip, Title, Legend } from 'chart.js';

Chart.register(LineController, CategoryScale, LinearScale, PointElement, LineElement, Tooltip, Title, Legend);


// Custom plugin to create dashed grid lines and border
const customGridLinesPlugin = {
  id: 'customGridLines',
  beforeDraw: (chart) => {
    const ctx = chart.ctx;
    const xAxis = chart.scales.x;
    const yAxis = chart.scales.y;

    // Customize the grid line style
    ctx.save();
    ctx.strokeStyle = 'rgba(49, 114, 86, 0.7)';
    ctx.lineWidth = 1;
    ctx.setLineDash([5, 5]); // Set the dash style [dash length, gap length]

    // Draw vertical grid lines
    xAxis.ticks.forEach((tick, index) => {
      if (index !== 0 && index !== xAxis.ticks.length - 1) { // Skip the first and last grid lines
        const xPos = xAxis.getPixelForTick(index);
        ctx.beginPath();
        ctx.moveTo(xPos, yAxis.top);
        ctx.lineTo(xPos, yAxis.bottom);
        ctx.stroke();
      }
    });

    // Draw horizontal grid lines
    yAxis.ticks.forEach((tick, index) => {
      if (index !== 0 && index !== yAxis.ticks.length - 1) { // Skip the first and last grid lines
        const yPos = yAxis.getPixelForTick(index);
        ctx.beginPath();
        ctx.moveTo(xAxis.left, yPos);
        ctx.lineTo(xAxis.right, yPos);
        ctx.stroke();
      }
    });

    ctx.restore();

    // Draw the custom border
    ctx.strokeStyle = '#DBDBDB';
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.moveTo(xAxis.left, yAxis.bottom);
    ctx.lineTo(xAxis.right, yAxis.bottom);

    ctx.moveTo(xAxis.left, yAxis.bottom);
    ctx.lineTo(xAxis.left, yAxis.top);

    ctx.stroke();
  },
};

export default function Graph({ format, data }) {

  const chartRef = useRef(null);
  const dayNames = ['Sat', 'Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri']; // Move dayNames here
  let labels = []; // Move the labels declaration outside of the useEffect hook


  useEffect(() => {
    const ctx = chartRef.current.getContext('2d');
    let chartInstance = null;
    let graphData = [];


    if (format === '7d') {
      labels = dayNames
      graphData = Array(7).fill(0);
      data.forEach((item) => {
        const dayIndex = new Date(item.timestamp * 1000).getDay()+1;
    
        graphData[dayIndex % 7] = item.units_consumed ? item.units_consumed : item.units_produced;
      });

    } else if (format === '24h') {
      labels = Array.from(Array(24).keys()).map((hour) => `${hour}:00`);
      graphData = Array(24).fill(0);
      data.forEach((item) => {
        const hour = new Date(item.timestamp * 1000).getHours();
        graphData[hour] = item.units_consumed ? item.units_consumed : item.units_produced;
      });
    } else if (format === '1m') {
      const daysInMonth = new Date(new Date().getFullYear(), new Date().getMonth() + 1, 0).getDate();
      labels = Array.from(Array(daysInMonth).keys()).map((day) => `${day + 1}`);
      graphData = Array(daysInMonth).fill(0);
      data.forEach((item) => {
        const day = new Date(item.timestamp * 1000).getDate();
        graphData[day - 1] = item.units_consumed ? item.units_consumed : item.units_produced;
      });
    }


    else if (format === '1h') {
      labels = data.map((item) => `${new Date(item.timestamp * 1000).getHours()}:${new Date(item.timestamp * 1000).getMinutes()}`)
      graphData = data.map((item) => item.units_consumed ? item.units_consumed : item.units_produced)
    }



    // Create or update the chart
    const createChart = () => {
      // Destroy previous chart instance if exists
      if (chartInstance) {
        chartInstance.destroy();
      }
      const gradientFill = ctx.createLinearGradient(0, chartRef.current.clientHeight, 0, chartRef.current.clientHeight * 0.1); // Adjust the gradient height as needed
      gradientFill.addColorStop(0, 'rgba(31, 180, 37, 0.3)'); // Adjust the alpha value (0.4) for the first color stop
      gradientFill.addColorStop(1, 'rgba(255, 255, 255, 0)'); // Change the alpha value (0) or color as needed


      chartInstance = new Chart(ctx, {
        type: 'line',
        data: {
          labels: labels,

          datasets: [
            {
              label: 'Energy Consumption',
              data: graphData,
              borderColor: '#73FFC2',
              borderWidth: 4,
              tension: 0.4,
              backgroundColor: gradientFill, // Use the gradient fill color
              fill: true,
            },
          ],
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          plugins: {
            customGridLines: customGridLinesPlugin,

          },
          elements: {
            line: {
              borderWidth: 0,
            },
          },
          scales: {
            x: {
              display: true,
              grid: {
                display: false,
              },
              ticks: {
                font: {
                  family: 'Barlow',
                  style: 'normal',
                  weight: 400,
                  size: 24,
                  textAlign: 'center',
                },
                color: '#BABABA',
              },
            },
            y: {
              display: true,
              grid: {
                display: false,
              },
              ticks: {
                font: {
                  family: 'Barlow',
                  style: 'normal',
                  weight: 400,
                  size: 24,
                  textAlign: 'center',
                },
                color: '#BABABA',
              },
            },
          },
          legend: {
            display: false,
          },

          plugins: {
            afterDraw: (chart) => {
              renderXLabels(chart); // Call the custom render function after drawing the chart
            },
          },

        },
        plugins: [customGridLinesPlugin], // Enable the custom grid line plugin
      });
    };

    // Create the initial chart
    createChart();

    // Cleanup function to destroy the chart when component unmounts
    return () => {
      if (chartInstance) {
        chartInstance.destroy();
      }
    };
  }, [format, data]);

  return <canvas ref={chartRef} className={styles.graph} />;
}