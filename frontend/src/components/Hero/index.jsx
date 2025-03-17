import { useNavigate } from 'react-router-dom';
import './styles.css'
import collage from '../../assets/collage.png'

const Hero = () => {
  const navigate = useNavigate();

  const handleGetStarted = () => {
    navigate('/second-page');
  };

  return (
    <div className="hero">
      <div className="hero-main">
        <div className="hero-content">
          <div className="hero-image">
            <img src={collage} alt="Traffic Hive Features Collage" />
          </div>
          <div className="hero-text">
            <h1>Smarter Traffic, Greener Delhi</h1>
            <p>
              Welcome to Traffic Hive—transforming Delhi's traffic with smart, sustainable solutions. 
              Our AI-powered platform synchronizes signals, guides parking, and provides real-time 
              route updates to reduce congestion, travel time, and pollution. By enhancing public 
              transport and optimizing road use, we aim to create a cleaner, safer, and more 
              efficient city. Join us in shaping the future of mobility with smarter, eco-friendly 
              innovations designed for Delhi's evolving needs.
            </p>
            <button 
              className="get-started-btn"
              onClick={handleGetStarted}
            >
              Get Started
            </button>
          </div>
        </div>
      </div>
      <div className="slider-dots">
        <span className="dot active"></span>
        <span className="dot"></span>
        <span className="dot"></span>
      </div>
    </div>
  )
}

export default Hero 