import React, { useState, useEffect } from 'react';
import './styles.css';

const DelhiNotifications = () => {
  const [showNotification, setShowNotification] = useState(false);
  const [aqiData, setAqiData] = useState({
    overall: null,
    locations: {
      'Vigyan Bhawan': null,
      'India Gate': null,
      'Lodhi Road': null
    }
  });
  const [locationName, setLocationName] = useState('Delhi');
  const [isLoading, setIsLoading] = useState(true);

  const fetchAQIData = async () => {
    try {
      console.log('Fetching AQI data...');
      const token = import.meta.env.VITE_WAQI_TOKEN;
      
      // Delhi station IDs for WAQI
      const stations = [
        { id: '@10112', name: 'Lodhi Road' },
        { id: '@10111', name: 'India Gate' },
        { id: '@10110', name: 'Vigyan Bhawan' }
      ];

      const responses = await Promise.all(
        stations.map(async station => {
          try {
            const response = await fetch(`https://api.waqi.info/feed/${station.id}/?token=${token}`);
            const data = await response.json();
            return data;
          } catch (error) {
            return null;
          }
        })
      );

      const validData = responses.filter(data => 
        data && data.status === 'ok' && data.data && typeof data.data.aqi === 'number'
      );

      if (validData.length > 0) {
        // Log the station ID being used
        console.log('Using station ID:', validData[0].data.idx);

        const overall = Math.round(
          validData.reduce((sum, data) => sum + (data.data.aqi || 0), 0) / validData.length
        );

        const locations = {};
        validData.forEach((data, index) => {
          if (data && data.data && typeof data.data.aqi === 'number') {
            locations[stations[index].name] = data.data.aqi;
          } else {
            locations[stations[index].name] = null;
          }
        });

        setAqiData({
          overall: isNaN(overall) ? null : overall,
          locations
        });
      }
    } catch (error) {
      console.error('Error fetching AQI data:', error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchAQIData();
    const interval = setInterval(fetchAQIData, 300000);
    return () => clearInterval(interval);
  }, []);

  const getAQILevel = (aqi) => {
    if (isLoading) return 'Loading...';
    if (!aqi) return 'No Data';
    if (aqi <= 50) return 'Good';
    if (aqi <= 100) return 'Moderate';
    if (aqi <= 150) return 'Unhealthy for Sensitive Groups';
    if (aqi <= 200) return 'Unhealthy';
    if (aqi <= 300) return 'Very Unhealthy';
    return 'Hazardous';
  };

  const today = new Date();
  const formattedDate = today.toLocaleDateString('en-US', {
    month: 'numeric',
    day: 'numeric',
    year: 'numeric'
  });
  const isOddDay = today.getDate() % 2 === 1;

  return (
    <div className="notifications-wrapper">
      <button 
        onClick={() => setShowNotification(true)}
        className="delhi-updates-btn"
      >
        Show Updates
      </button>

      {showNotification && (
        <div className="notification-panel">
          <div className="notification-content">
            <div className="notification-header">
              <h2>{locationName} Updates - {formattedDate}</h2>
              <button 
                onClick={() => setShowNotification(false)}
                className="close-btn"
              >
                ✕
              </button>
            </div>

            <div className="updates-container">
              {/* AQI Section */}
              <div className="update-card">
                <div className="aqi-header">
                  <span className="wind-icon">💨</span>
                  Overall Air Quality Index: <span className="aqi-value">{aqiData.overall} ({getAQILevel(aqiData.overall)})</span>
                </div>
                
                <div className="local-aqi">
                  <p>Local AQI Readings:</p>
                  <div className="aqi-grid">
                    {Object.entries(aqiData.locations).map(([location, value]) => (
                      <div key={location} className="aqi-location">
                        <span className="location-icon">📍</span>
                        {location}: <span className="aqi-number">{value}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Vehicle Rule Card */}
              <div className="update-card">
                <div className="vehicle-rule">
                  <span className="car-icon">🚗</span>
                  Today's Odd-Even Rule: {isOddDay ? "Odd" : "Even"} numbered vehicles allowed
                </div>
              </div>

              {/* Road Works Card */}
              <div className="update-card">
                <div className="roadworks">
                  <span className="construction-icon">🚧</span>
                  Ongoing Road Works:
                  <div className="roadworks-list">
                    <p>Nehru Place (Duration: 2 days)</p>
                    <p>Connaught Place (Duration: 5 days)</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default DelhiNotifications;