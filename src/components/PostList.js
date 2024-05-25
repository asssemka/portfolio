import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './css/PostList.css';
import { useTheme } from '../context/ThemeContext';
import { useLanguage } from '../context/LanguageContext';

const PostList = () => {
  const [posts, setPosts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('');
  const [selectedPost, setSelectedPost] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const { theme } = useTheme();
  const { language, translations } = useLanguage();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await axios.get('http://localhost:4444/posts');
        setPosts(response.data);
      } catch (error) {
        console.error(translations[language].fetchPostsError, error);
      }
    };

    const fetchCategories = async () => {
      try {
        const response = await axios.get('http://localhost:4444/categories');
        setCategories(response.data);
      } catch (error) {
        console.error(translations[language].fetchCategoriesError, error);
      }
    };

    const checkAuth = async () => {
      const token = localStorage.getItem('token');
      if (token) {
        try {
          await axios.get('http://localhost:4444/auth/me', {
            headers: { Authorization: `Bearer ${token}` },
          });
          setIsAuthenticated(true);
        } catch (error) {
          setIsAuthenticated(false);
        }
      }
    };

    fetchPosts();
    fetchCategories();
    checkAuth();
  }, [language, translations]);

  const handlePostClick = (post) => {
    setSelectedPost(post);
  };

  const handleBackClick = () => {
    setSelectedPost(null);
  };

  const handleEdit = (postId) => {
    navigate(`/edit-post/${postId}`);
  };

  const handleDelete = async (postId) => {
    try {
      await axios.delete(`http://localhost:4444/posts/${postId}`, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
      });
      setPosts(posts.filter(post => post._id !== postId));
      setSelectedPost(null);
    } catch (error) {
      console.error(translations[language].deletePostError, error);
    }
  };

  const filteredPosts = selectedCategory
    ? posts.filter(post => post.category.name === selectedCategory)
    : posts;

  if (selectedPost) {
    return (
      <div className={`post-details ${theme}`}>
        <button onClick={handleBackClick} className="back-button">{translations[language].back}</button>
        <div className="post-details-content">
          <div className="post-details-text">
            <h2>{`{ ${selectedPost.title.toUpperCase()} }`}</h2>
            <p>{selectedPost.text}</p>
          </div>
          {selectedPost.imageUrl && (
            <div className="post-details-image">
              <img src={`http://localhost:4444${selectedPost.imageUrl}`} alt={selectedPost.title} />
            </div>
          )}
        </div>
        <div className="post-details-meta">
          <p><strong>{translations[language].category}</strong> {selectedPost.category.name}</p>
          <p><strong>{translations[language].tags}</strong> {selectedPost.tags.map((tag, index) => (
            <React.Fragment key={index}>
              <a href={tag} target="_blank" rel="noopener noreferrer">{tag}</a>
              {index < selectedPost.tags.length - 1 && ', '}
            </React.Fragment>
          ))}</p>
          <p><strong>{translations[language].author}</strong> {selectedPost.user.fullName}</p>
          {isAuthenticated && (
            <div className="post-actions">
              <button onClick={() => handleEdit(selectedPost._id)}>{translations[language].edit}</button>
              <button onClick={() => handleDelete(selectedPost._id)}>{translations[language].delete}</button>
            </div>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className={`post-list ${theme}`}>
      <div className="filter">
        <button
          className={`category-button ${selectedCategory === '' ? 'active' : ''}`}
          onClick={() => setSelectedCategory('')}
        >
          {translations[language].all}
        </button>
        {categories.map((category) => (
          <button
            key={category._id}
            className={`category-button ${selectedCategory === category.name ? 'active' : ''}`}
            onClick={() => setSelectedCategory(category.name)}
          >
            {category.name}
          </button>
        ))}
      </div>
      <div className="post-grid">
        {filteredPosts.map((post, index) => (
          <div key={post._id} className="post-card" onClick={() => handlePostClick(post)}>
            <div className="post-card-header">
              <span className="post-card-index">{`{ ${index + 1} }`}</span>
              <span className="post-card-category">{post.category.name.toUpperCase()}</span>
            </div>
            {post.imageUrl && (
              <img src={`http://localhost:4444${post.imageUrl}`} alt={post.title} className="post-card-image" />
            )}
            <div className="post-card-body">
              <h3 className="post-card-title">{post.title}</h3>
              <p className="post-card-excerpt">{post.text.slice(0, 100)}...</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PostList;
