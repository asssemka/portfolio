import React, { useEffect, useRef } from 'react';
import { useTheme } from '../context/ThemeContext';
import { useLanguage } from '../context/LanguageContext';
import profileImage from '../assets/1.jpeg'; 
import projectImage from '../assets/2.jpeg'; 
import './css/AnimatedText.css';

const AnimatedText = () => {
    const { theme } = useTheme();
    const { language, translations } = useLanguage();
    const lineRef = useRef(null);
  
    useEffect(() => {
      const handleMouseMove = (event) => {
        const { clientX, clientY } = event;
        const { innerWidth, innerHeight } = window;
  
        const rotateX = (clientY / innerHeight) * -50 + 25;
        const rotateY = (clientX / innerWidth) * 50 - 25;
  
        if (lineRef.current) {
          lineRef.current.style.transform = `translate(-50%, -50%) rotate(${rotateY}deg)`;
        }
      };
  
      window.addEventListener('mousemove', handleMouseMove);
      return () => {
        window.removeEventListener('mousemove', handleMouseMove);
      };
    }, []);
  
    return (
      <div className={`animated-text ${theme}`}>
        <div className="text-content">
          <img src={profileImage} alt="Profile" className="circle-image profile-image" />
          <h1>ASSEM K.</h1>
          <h2>{translations[language].portfolio}</h2>
          <img src={projectImage} alt="Project" className="square-image project-image" />
          <p className="description">
            {translations[language].missionStatement}
          </p>
          <div ref={lineRef} className="line"></div>
        </div>
       </div>
    );
  };
  
export default AnimatedText;
