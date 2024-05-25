import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useTheme } from '../context/ThemeContext';
import { useLanguage } from '../context/LanguageContext';
import { ReactComponent as SunIcon } from '../assets/sun.svg';
import { ReactComponent as MoonIcon } from '../assets/moon.svg';
import './css/Header.css';

const Header = () => {
  const { theme, toggleTheme } = useTheme();
  const { language, toggleLanguage, translations } = useLanguage();
  const navigate = useNavigate();

  const scrollToAbout = () => {
    if (window.location.pathname !== "/") {
      navigate("/", { state: { scrollTo: "about" } });
    } else {
      const aboutSection = document.getElementById("about");
      if (aboutSection) {
        aboutSection.scrollIntoView({ behavior: "smooth" });
      }
    }
  };

  return (
    <header className={`header ${theme}`}>
      <div className="header-content">
        <div className="header-left">
          <div className="header-title" onClick={() => navigate('/')}>
            <div>{translations[language].name}</div>
            <div className='kassenova'>{translations[language].surname}</div>
          </div>
          <div className="portfolio">{translations[language].portfolio}</div>
        </div>
        <div className="header-right">
          <nav>
            <Link to="/posts">{translations[language].projects}</Link>
            <button onClick={scrollToAbout} className="about-me-button">{translations[language].aboutMe}</button>
            <select value={language} onChange={(e) => toggleLanguage(e.target.value)}>
              <option value="en">EN</option>
              <option value="ru">RU</option>
              <option value="kk">KK</option>
            </select>
            <button onClick={toggleTheme} className="theme-toggle">
              {theme === 'light' ? <SunIcon /> : <MoonIcon />}
            </button>
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Header;
