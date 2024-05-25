import React from 'react';
import { useTheme } from '../context/ThemeContext';
import './css/Footer.css';

const Footer = () => {
  const { theme } = useTheme();
  return (
    <footer className={`footer ${theme}`}>
      <div className="footer-content">
        <div className="social-links">
          <a href="https://instagram.com">INSTAGRAM</a>
          <a href="https://facebook.com">FACEBOOK</a>
          <a href="https://youtube.com">YOUTUBE</a>
          <a href="https://linkedin.com">LINKEDIN</a>
        </div>
        <div className="footer-bottom">
          <p>&copy; KASSENOVA ASSEM 2024</p>
        </div>
        <div className="back-to-top">
          <a href="#top">BACK TO TOP</a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
