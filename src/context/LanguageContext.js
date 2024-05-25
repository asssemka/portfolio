import React, { createContext, useContext, useState, useEffect } from 'react';

const LanguageContext = createContext();

const translations = {
  en: {
    aboutMe: "About Me",
    aboutDescription: "Welcome to the profile of Assem Kassenova",
    myStory: "My Story",
    myStoryContent: "I am an undergraduate student majoring in 'Digital Management and Design' at Narxoz University, Almaty. As part of my studies, I am actively learning how technologies can transform management and design, making processes more efficient and user-oriented.",
    myMission: "My Mission",
    myMissionContent: "I aspire to take on the role of a Project Manager, where I can apply my skills in technology, project management, and teamwork to successfully complete projects. I aim to lead projects that not only meet technical requirements but also exceed client expectations in terms of quality and innovation.",
    profileName: "ASSEM K.",
    portfolio: "//   portfolio",
    missionStatement: "I enjoy bringing people's ideas to life to optimize their everyday activities.",
    name: "Assem -",
    surname: "Kassenova",
    projects: "Projects",
    about: "About",
    services: "Services",
    animatedText: "Animated Text",
    logout: "Logout",
    login: "Login",
    register: "Register",
    fetchPostsError: "Failed to fetch posts",
    fetchCategoriesError: "Failed to fetch categories",
    deletePostError: "Failed to delete post",
    back: "Back",
    category: "Category:",
    tags: "Tags:",
    author: "Author:",
    edit: "Edit",
    delete: "Delete",
    all: "All",
  },
  ru: {
    aboutMe: "Обо мне",
    aboutDescription: "Добро пожаловать в профиль Ассем Касеновой",
    myStory: "Моя история",
    myStoryContent: "Я студентка бакалавриата по специальности 'Цифровое управление и дизайн' в Нархоз Университете, Алматы. В рамках моего обучения я активно изучаю, как технологии могут преобразовать управление и дизайн, делая процессы более эффективными и ориентированными на пользователя.",
    myMission: "Моя миссия",
    myMissionContent: "Я стремлюсь занять роль Менеджера проекта, где смогу применять свои навыки в области технологий, управления проектами и командной работы для успешного завершения проектов. Я нацелена на руководство проектами, которые не только соответствуют техническим требованиям, но и превосходят ожидания клиентов по качеству и инновациям.",
    profileName: "АСЕМ К.",
    portfolio: "//   портфолио",
    missionStatement: "Мне нравится воплощать идеи людей в жизнь, чтобы оптимизировать их повседневную деятельность.",
    name: "Ассем -",
    surname: "Касенова",
    projects: "Проекты",
    about: "Обо мне",
    services: "Услуги",
    animatedText: "Анимированный текст",
    logout: "Выйти",
    login: "Войти",
    register: "Регистрация",
    fetchPostsError: "Не удалось загрузить посты",
    fetchCategoriesError: "Не удалось загрузить категории",
    deletePostError: "Не удалось удалить пост",
    back: "Назад",
    category: "Категория:",
    tags: "Теги:",
    author: "Автор:",
    edit: "Редактировать",
    delete: "Удалить",
    all: "Все",
  },
  kk: {
    aboutMe: "Мен туралы",
    aboutDescription: "Ассем Касенованың профиліне қош келдіңіз",
    myStory: "Менің тарихым",
    myStoryContent: "Мен Алматыдағы Нархоз университетінде 'Цифрлық менеджмент және дизайн' мамандығы бойынша бакалавр студентімін. Менің оқуымның бір бөлігі ретінде мен технологиялардың басқару мен дизайнды қалай өзгертетінін, процестерді неғұрлым тиімді және пайдаланушыға бағытталған ететінін белсенді түрде зерттеп жатырмын.",
    myMission: "Менің миссиям",
    myMissionContent: "Мен жобаларды сәтті аяқтау үшін технологиялар, жобаларды басқару және командалық жұмыс бойынша дағдыларымды қолдана алатын Жоба менеджері рөлін атқаруды мақсат етемін. Мен техникалық талаптарға сәйкес келетін, сонымен қатар сапасы мен инновациялар бойынша клиенттердің үміттерінен асып түсетін жобаларды басқаруды көздеймін.",
    profileName: "АСЕМ К.",
    portfolio: "//   портфолио",
    missionStatement: "Маған адамдардың идеяларын күнделікті іс-әрекеттерін оңтайландыру үшін өмірге енгізу ұнайды.",
    name: "Ассем -",
    surname: "Касенова",
    projects: "Жобалар",
    about: "Мен туралы",
    services: "Қызметтер",
    animatedText: "Анималанған мәтін",
    logout: "Шығу",
    login: "Кіру",
    register: "Тіркелу",
    fetchPostsError: "Жазбаларды жүктеу сәтсіз аяқталды",
    fetchCategoriesError: "Санаттарды жүктеу сәтсіз аяқталды",
    deletePostError: "Жазбаны жою сәтсіз аяқталды",
    back: "Артқа",
    category: "Санат:",
    tags: "Тегтер:",
    author: "Автор:",
    edit: "Өңдеу",
    delete: "Жою",
    all: "Барлық",
  }
};


export const LanguageProvider = ({ children }) => {
  const [language, setLanguage] = useState('en');

  useEffect(() => {
    const savedLanguage = localStorage.getItem('language');
    if (savedLanguage) {
      setLanguage(savedLanguage);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('language', language);
  }, [language]);

  const toggleLanguage = (lang) => {
    setLanguage(lang);
  };

  return (
    <LanguageContext.Provider value={{ language, toggleLanguage, translations }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => useContext(LanguageContext);
