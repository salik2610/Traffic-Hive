import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import './styles.css';
import smartTrafficLight from '../../assets/smarttrafficlight.png';
import smartParking from '../../assets/smartparking.png';
import trafficChatbot from '../../assets/trafficchatbot.png';
import dataDrivenInsights from '../../assets/datadriveninsights.png';
import realTimeRoute from '../../assets/realtimeroute.png';

const models = [
  {
    id: 'smart-traffic-signals',
    title: 'Smart Traffic Signals',
    description: 'Efficiently synchronized signals to optimize traffic flow, reduce delays, and ease congestion across the city.',
    image: smartTrafficLight
  },
  {
    id: 'intelligent-parking',
    title: 'Intelligent Parking',
    description: 'Real-time parking availability updates to minimize illegal parking and maximize space utilization.',
    image: smartParking
  },
  {
    id: 'traffic-bot',
    title: 'Traffic Bot',
    description: 'A legal bot providing real-time traffic rules, laws, and violations guidance via AI-powered prompts for safer, compliant, and informed road usage.',
    image: trafficChatbot
  },
  {
    id: 'real-time-route',
    title: 'Route UI',
    description: 'AI-powered updates to help commuters avoid bottlenecks and save valuable travel time with real-time route guidance.',
    image: realTimeRoute
  },
  {
    id: 'data-driven-insights',
    title: 'Data-Driven Insights',
    description: 'Advanced analytics for better urban planning and improved traffic management using cutting-edge AI technologies.',
    image: dataDrivenInsights
  }
];

const Models = ({ isVisible = true }) => {
  const navigate = useNavigate();

  const handleShowMore = (modelId) => {
    navigate(`/model/${modelId}`);
  };

  return (
    <motion.div 
      className="models-container"
      initial={{ opacity: 0 }}
      animate={{ opacity: isVisible ? 1 : 0 }}
      transition={{ duration: 0.5 }}
    >
      <h1>Our Models</h1>
      <div className="models-grid">
        {models.map((model, index) => (
          <motion.div 
            key={model.title}
            className="model-card"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: isVisible ? 1 : 0, y: isVisible ? 0 : 20 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
          >
            <div className="card-image">
              {model.image && <img src={model.image} alt={model.title} />}
            </div>
            <div className="card-content">
              <h3>{model.title}</h3>
              <p>{model.description}</p>
              <button 
                className="show-more-btn"
                onClick={() => handleShowMore(model.id)}
              >
                Show More
              </button>
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
};

export default Models; 