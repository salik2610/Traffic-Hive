import { useState, useEffect } from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import AmbientSpheres from './components/AmbientSpheres';
import Models from './components/Models';
import SecondPage from './pages/SecondPage';
import ModelDetail from './pages/ModelDetail';
import StatisticsPage from './pages/StatisticsPage';
import './App.css';

function AppContent() {
  const navigate = useNavigate();
  const [scrollPosition, setScrollPosition] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const position = window.scrollY;
      setScrollPosition(position);
      
      // When scroll reaches 60% of viewport height, navigate to second page
      if (position > window.innerHeight * 0.6) {
        navigate('/second-page');
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [navigate]);

  return (
    <div className="app">
      <Navbar />
      <div className="fixed-content">
        <Hero />
      </div>
      <div className="scrollable-content">
        <div className="black-section">
          <AmbientSpheres />
          <Models isVisible={scrollPosition > window.innerHeight * 0.3} />
        </div>
      </div>
    </div>
  );
}

function App() {
  return (
    <Routes>
      <Route path="/" element={<AppContent />} />
      <Route path="/second-page" element={<SecondPage />} />
      <Route path="/model/:modelId" element={<ModelDetail />} />
      <Route path="/statistics" element={<StatisticsPage />} />
    </Routes>
  );
}

export default App;