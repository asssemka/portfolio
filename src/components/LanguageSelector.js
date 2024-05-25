import React from 'react';
import { useLanguage } from '../context/LanguageContext';

const LanguageSelector = () => {
  const { language, setLanguage } = useLanguage();

  return (
    <div>
      <label>Select Language</label>
      <select value={language} onChange={(e) => setLanguage(e.target.value)}>
        <option value="en">English</option>
        <option value="ru">Russian</option>
        <option value="kz">Kazakh</option>
      </select>
    </div>
  );
};

export default LanguageSelector;
