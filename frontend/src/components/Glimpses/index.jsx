import { useEffect, useState } from 'react';
import './styles.css';
import glimpse1 from '../../assets/glimpse1.png';
import glimpse2 from '../../assets/glimpse2.png';
import glimpse3 from '../../assets/glimpse3.png';
import glimpse4 from '../../assets/glimpse4.png';

const images = [glimpse1, glimpse2, glimpse3, glimpse4];

const Glimpses = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      if (!isTransitioning) {
        setIsTransitioning(true);
        setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
      }
    }, 5000); // Increased to 5 seconds

    return () => clearInterval(interval);
  }, [isTransitioning]);

  const handleTransitionEnd = () => {
    setIsTransitioning(false);
  };

  const handleDotClick = (index) => {
    if (!isTransitioning && index !== currentIndex) {
      setIsTransitioning(true);
      setCurrentIndex(index);
    }
  };

  return (
    <div className="glimpses-section">
      <h2>Glimpses of Delhi Traffic</h2>
      <div className="glimpses-container">
        <div 
          className="glimpses-track" 
          style={{ 
            transform: `translateX(-${currentIndex * 100}%)`,
          }}
          onTransitionEnd={handleTransitionEnd}
        >
          {images.map((image, index) => (
            <div key={index} className="glimpse-slide">
              <img 
                src={image} 
                alt={`Delhi Traffic Glimpse ${index + 1}`}
                loading="eager"  // Added eager loading
              />
            </div>
          ))}
        </div>
        <div className="glimpses-dots">
          {images.map((_, index) => (
            <button
              key={index}
              className={`dot ${index === currentIndex ? 'active' : ''}`}
              onClick={() => handleDotClick(index)}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Glimpses; 