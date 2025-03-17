import { useState } from 'react';
import { Line, Bar, Doughnut } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend,
  Filler
} from 'chart.js';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import AmbientSpheres from '../components/AmbientSpheres';
import './StatisticsPage.css';

// Register ChartJS components
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend,
  Filler
);

const StatisticsPage = () => {
  const [timeFilter, setTimeFilter] = useState('Daily');

  // Congestion Levels Chart Data
  const congestionData = {
    labels: ['6-9AM', '9-12PM', '12-3PM', '3-6PM', '6-9PM'],
    datasets: [
      {
        label: 'Delhi Average',
        data: [20, 35, 50, 40, 60],
        borderColor: '#4361EE',
        backgroundColor: 'rgba(67, 97, 238, 0.1)',
        fill: true,
        tension: 0.4
      },
      {
        label: 'High Congestion Zones',
        data: [30, 45, 60, 55, 50],
        borderColor: '#F72585',
        backgroundColor: 'rgba(247, 37, 133, 0.1)',
        fill: true,
        tension: 0.4
      }
    ]
  };

  const congestionOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'top',
        labels: { color: 'white' }
      }
    },
    scales: {
      y: {
        grid: {
          color: 'rgba(255, 255, 255, 0.1)'
        },
        ticks: { color: 'white' }
      },
      x: {
        grid: {
          color: 'rgba(255, 255, 255, 0.1)'
        },
        ticks: { color: 'white' }
      }
    }
  };

  // AQI Levels Chart Data
  const aqiData = {
    labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
    datasets: [
      {
        label: 'Peak',
        data: [180, 165, 170, 175, 160, 155],
        backgroundColor: 'rgba(247, 37, 133, 0.6)',
      },
      {
        label: 'Average',
        data: [140, 135, 145, 140, 130, 125],
        backgroundColor: 'rgba(67, 97, 238, 0.6)',
      }
    ]
  };

  const aqiOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'top',
        labels: { color: 'white' }
      }
    },
    scales: {
      y: {
        stacked: true,
        grid: {
          color: 'rgba(255, 255, 255, 0.1)'
        },
        ticks: { color: 'white' }
      },
      x: {
        stacked: true,
        grid: {
          color: 'rgba(255, 255, 255, 0.1)'
        },
        ticks: { color: 'white' }
      }
    }
  };

  // Model Usage Chart Data
  const usageData = {
    labels: ['Smart Signal', 'Parking System', 'Traffic Bot'],
    datasets: [{
      data: [45, 30, 25],
      backgroundColor: [
        'rgba(67, 97, 238, 0.8)',
        'rgba(247, 37, 133, 0.8)',
        'rgba(76, 175, 80, 0.8)'
      ],
      borderWidth: 0
    }]
  };

  const usageOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'bottom',
        labels: { color: 'white' }
      }
    },
    cutout: '60%'
  };

  const violationHotspots = [
    { area: 'Connaught Place', count: 5872, change: 1.01, trend: 'up' },
    { area: 'Karkardooma', count: 4892, change: 0.49, trend: 'up' },
    { area: 'Karol Bagh', count: 4753, change: -0.91, trend: 'down' },
    { area: 'Lajpat Nagar', count: 4293, change: 1.51, trend: 'up' },
    { area: 'Sarojini Nagar', count: 3923, change: 1.51, trend: 'up' }
  ];

  return (
    <div className="statistics-page">
      <Navbar />
      <AmbientSpheres />
      <div className="stats-content">
        <h1>STATISTICAL ANALYSIS</h1>
        
        <div className="stats-grid">
          <div className="chart-card congestion-chart">
            <div className="card-header">
              <h3>Congestion Levels</h3>
              <select value={timeFilter} onChange={(e) => setTimeFilter(e.target.value)}>
                <option>Daily</option>
                <option>Weekly</option>
                <option>Monthly</option>
              </select>
            </div>
            <div className="chart-area">
              <Line data={congestionData} options={congestionOptions} />
            </div>
          </div>

          <div className="chart-card aqi-chart">
            <h3>AQI Levels</h3>
            <div className="chart-area">
              <Bar data={aqiData} options={aqiOptions} />
            </div>
          </div>

          <div className="chart-card usage-chart">
            <div className="card-header">
              <h3>Model's Usage</h3>
              <button className="more-options">•••</button>
            </div>
            <div className="chart-area">
              <Doughnut data={usageData} options={usageOptions} />
            </div>
          </div>
        </div>

        <div className="violations-section">
          <h3>Violations Hotspots</h3>
          <div className="hotspots-grid">
            {violationHotspots.map((spot, index) => (
              <div key={index} className="hotspot-card">
                <h2>{spot.count}</h2>
                <h4>{spot.area}</h4>
                <div className={`trend ${spot.trend}`}>
                  <span className="trend-arrow">{spot.trend === 'up' ? '↑' : '↓'}</span>
                  <span>{spot.change.toFixed(2)} this week</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default StatisticsPage; 