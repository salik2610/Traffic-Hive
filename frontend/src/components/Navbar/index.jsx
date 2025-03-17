import { useNavigate, useLocation } from 'react-router-dom';
import DelhiNotifications from '../DelhiNotifications';
import './styles.css'

const Navbar = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const isActive = (path) => {
    if (path === '/' && location.pathname === '/') return true;
    if (path !== '/' && location.pathname.includes(path)) return true;
    return false;
  };

  return (
    <nav className="navbar">
      <div className="logo" onClick={() => navigate('/')}>TRAFFIC HIVE</div>
      <div className="nav-links">
        <a 
          onClick={() => navigate('/')} 
          className={isActive('/') ? 'active' : ''}
        >HOME</a>
        <a 
          onClick={() => navigate('/model/traffic-bot')}
          className={isActive('/model/traffic-bot') ? 'active' : ''}
        >TRAFFIC BOT</a>
        <a 
          onClick={() => navigate('/model/smart-traffic-signals')}
          className={isActive('/model/smart-traffic-signals') ? 'active' : ''}
        >SMART SIGNAL</a>
        <a 
          onClick={() => navigate('/model/intelligent-parking')}
          className={isActive('/model/intelligent-parking') ? 'active' : ''}
        >PARKING SYSTEM</a>
        <DelhiNotifications />
      </div>
    </nav>
  )
}

export default Navbar 