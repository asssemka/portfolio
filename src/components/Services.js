import React, { useState } from 'react';
import { useTheme } from '../context/ThemeContext';
import './css/Services.css';
import teamWorkImage from '../services/1.jpeg';
import designImage from '../services/2.jpeg';
import animationImage from '../services/3.jpeg';
import javaDevImage from '../services/4.jpeg';

const services = [
  { name: 'TEAMWORK', image: teamWorkImage },
  { name: 'DESIGN', image: designImage },
  { name: '3D ANIMATION', image: animationImage },
  { name: 'JAVA DEVELOPER', image: javaDevImage },
];

const Services = () => {
  const { theme } = useTheme();
  const [hoveredService, setHoveredService] = useState(null);

  return (
    <div className={`services-section ${theme}`}>
      <div className="services-list">
        {services.map((service, index) => (
          <div
            key={index}
            className={`service-item ${index % 2 === 0 ? 'left' : 'right'}`}
            onMouseEnter={() => setHoveredService(service.image)}
            onMouseLeave={() => setHoveredService(null)}
          >
            {service.name}
            {hoveredService === service.image && (
              <img src={service.image} alt={service.name} className={`service-image ${index % 2 === 0 ? 'right' : 'left'}`} />
            )}
          </div>
        ))}
      </div>
      <div className="bottom-line"></div>
          </div>
  );
};

export default Services;
