import React, { useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, useLocation } from 'react-router-dom';
import { UserProvider } from './context/UserContext';
import { ThemeProvider } from './context/ThemeContext';
import { LanguageProvider } from './context/LanguageContext';
import { StoreProvider } from './redux/store'; 
import Header from './components/Header';
import Profile from './components/Profile';
import PostList from './components/PostList';
import PostForm from './components/PostForm';
import Login from './components/Login';
import Register from './components/Register';
import Footer from './components/Footer';
import AnimatedText from './components/AnimatedText';
import About from './components/About';
import Services from './components/Services';
import AddPost from './components/AddPost'; 
import EditPost from './components/EditPost'; 

const Home = () => {
  const location = useLocation();

  useEffect(() => {
    if (location.state && location.state.scrollTo === "about") {
      const aboutSection = document.getElementById("about");
      if (aboutSection) {
        aboutSection.scrollIntoView({ behavior: "smooth" });
      }
    }
  }, [location]);

  return (
    <>
      <Header />
      <main>
        <AnimatedText />
        <div id="about">
          <About />
        </div>
        <Services />
      </main>
      <Footer />
    </>
  );
};

const ProjectsPage = () => (
  <>
    <Header />
    <main>
      <PostList />
    </main>
    <Footer />
  </>
);

const App = () => {
  return (
    <StoreProvider>
      <UserProvider>
        <ThemeProvider>
          <LanguageProvider>
            <Router>
              <Routes>
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="/add-post" element={<AddPost />} /> 
                <Route path="/edit-post/:postId" element={<EditPost />} /> 
                <Route path="/posts" element={<ProjectsPage />} />
                <Route path="/" element={<Home />} />
              </Routes>
            </Router>
          </LanguageProvider>
        </ThemeProvider>
      </UserProvider>
    </StoreProvider>
  );
};

export default App;
