import { useParams, useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import AmbientSpheres from '../components/AmbientSpheres';
import './ModelDetail.css';
import smartTrafficLight from '../assets/smarttrafficlight.png';
import smartParking from '../assets/smartparking.png';
import trafficChatbot from '../assets/trafficchatbot.png';
import realTimeRoute from '../assets/realtimeroute.png';
import dataDrivenInsights from '../assets/datadriveninsights.png';

const modelDetails = {
  'smart-traffic-signals': {
    title: 'Smart Traffic Signal',
    description: 'Say goodbye to traffic jams and frustrating delays! At Traffic Hive, we\'ve crafted a state-of-the-art solution to transform how cities handle traffic. Our Smart Signal and Congestion Management system is designed to optimize traffic flow and minimize congestion, ensuring a smoother journey for everyone.',
    subtitle: 'Experience the difference with Traffic Hive—where technology meets smoother travel!',
    buttonText: 'TRY NOW',
    tryNowLink: 'https://traffic-signal-sigma.vercel.app/',
    image: smartTrafficLight
  },
  'real-time-route': {
    title: 'Real Time Route Guidance',
    description: 'Never lose your way again with Real-Time Guidance by Traffic Hive! Our cutting-edge system is your trusted partner for navigating even the busiest roads with ease. Designed to provide accurate and instant directions, Real-Time Guidance ensures that you reach your destination without unnecessary detours or delays.',
    subtitle: 'Let Traffic Hive lead the way. Your destination, made simpler.',
    buttonText: 'ROUTE UI',
    tryNowLink: 'https://traffic-hivemapping.vercel.app',
    image: realTimeRoute
  },
  'data-driven-insights': {
    title: 'Statistical Insights',
    description: 'We\'re redefining how you understand traffic dynamics! At Traffic Hive, our data-driven insights deliver real-time, actionable intelligence to optimize your journeys and improve urban mobility. Whether you\'re planning your commute, monitoring congestion, or tracking air quality, our intuitive system ensures you\'re always ahead of the curve.',
    subtitle: 'Analyze. Act. Innovate. Welcome to the future of smarter transportation!',
    buttonText: 'SEE STATS',
    tryNowLink: '/see-stats',
    image: dataDrivenInsights
  },
  'traffic-bot': {
    title: 'Traffic Bot',
    description: 'Discover the ultimate companion for safe and informed driving! Traffic Bot by Traffic Hive is here to revolutionize the way you navigate traffic rules and regulations. Whether you\'re a new driver eager to stay compliant or a seasoned commuter looking for quick answers, Traffic Bot has everything you need.',
    subtitle: 'Stay informed. Drive responsibly. Join the road safety revolution with Traffic Bot by Traffic Hive!',
    buttonText: 'CHAT NOW',
    tryNowLink: 'https://traffic-bot394m.vercel.app/',
    image: trafficChatbot
  },
  'intelligent-parking': {
    title: 'Smart Parking',
    description: 'We\'re revolutionizing the way you park! At Traffic Hive, we bring you a seamless, smart, and efficient parking experience designed to save your time and eliminate stress. Whether you\'re heading to work, shopping, or enjoying a day out, our system ensures a hassle-free journey from start to finish.',
    subtitle: 'Find. Park. Relax. Welcome to the future of parking!',
    buttonText: 'BOOK NOW',
    tryNowLink: 'https://parking-system-orpin.vercel.app/',
    image: smartParking
  }
};

const ModelDetail = () => {
  const { modelId } = useParams();
  const model = modelDetails[modelId];
  const navigate = useNavigate();

  if (!model) {
    return <div>Model not found</div>;
  }

  const handleButtonClick = () => {
    if (model.buttonText === 'SEE STATS') {
      navigate('/statistics');
    } else if (model.buttonText === 'CHAT NOW' || 
               model.buttonText === 'BOOK NOW' || 
               model.buttonText === 'TRY NOW' ||
               model.buttonText === 'ROUTE UI') {
      window.open(model.tryNowLink, '_blank');
    }
  };

  return (
    <div className="model-detail-page">
      <Navbar />
      <AmbientSpheres />
      <div className="model-detail-content">
        <div className="model-detail-grid">
          <div className="model-detail-text">
            <h1>{model.title}</h1>
            <p className="main-description">{model.description}</p>
            {model.additionalText && (
              <p className="additional-description">{model.additionalText}</p>
            )}
            <p className="subtitle">{model.subtitle}</p>
            <button 
              className="try-now-btn" 
              onClick={handleButtonClick}
            >
              {model.buttonText}
            </button>
          </div>
          <div className="model-detail-image">
            {model.image ? (
              <img 
                src={model.image} 
                alt={model.title} 
                className="detail-image"
              />
            ) : (
              <div className="image-placeholder"></div>
            )}
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default ModelDetail; 
