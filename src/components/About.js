import React, { useState } from 'react';
import { useTheme } from '../context/ThemeContext';
import { useLanguage } from '../context/LanguageContext';
import './css/About.css';

const About = () => {
  const { theme } = useTheme();
  const { language, translations } = useLanguage();
  const [isStoryOpen, setIsStoryOpen] = useState(false);
  const [isMissionOpen, setIsMissionOpen] = useState(false);

  const toggleStory = () => setIsStoryOpen(!isStoryOpen);
  const toggleMission = () => setIsMissionOpen(!isMissionOpen);

  return (
    <div className={`about-section ${theme}`}>
      <h2>{translations[language].aboutMe}</h2>
      <p className="about-description">{translations[language].aboutDescription}</p>
      <div className="accordion">
        <div className="accordion-item">
          <div className="accordion-title" onClick={toggleStory}>
            <span>{translations[language].myStory}</span>
            <span>{isStoryOpen ? '-' : '+'}</span>
          </div>
          {isStoryOpen && (
            <div className="accordion-content">
              <p>{translations[language].myStoryContent}</p>
            </div>
          )}
        </div>
        <div className="accordion-item">
          <div className="accordion-title" onClick={toggleMission}>
            <span>{translations[language].myMission}</span>
            <span>{isMissionOpen ? '-' : '+'}</span>
          </div>
          {isMissionOpen && (
            <div className="accordion-content">
              <p>{translations[language].myMissionContent}</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default About;
