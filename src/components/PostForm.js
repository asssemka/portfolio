import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './css/PostForm.css';
import { useTheme } from '../context/ThemeContext';

const PostForm = ({ postId, initialData }) => {
  const [title, setTitle] = useState('');
  const [text, setText] = useState('');
  const [tags, setTags] = useState('');
  const [category, setCategory] = useState('');
  const [imageFile, setImageFile] = useState(null);
  const [categories, setCategories] = useState([]);
  const { theme } = useTheme();
  const navigate = useNavigate();

  useEffect(() => {
    if (initialData) {
      setTitle(initialData.title);
      setText(initialData.text);
      setTags(initialData.tags.join(', '));
      setCategory(initialData.category);
      console.log('Initial data set:', initialData); // Debugging line
    }
  }, [initialData]);

  useEffect(() => {
    async function fetchCategories() {
      try {
        const response = await axios.get('http://localhost:4444/categories');
        setCategories(response.data);
      } catch (error) {
        console.error('Failed to fetch categories', error);
      }
    }

    fetchCategories();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append('title', title);
    formData.append('text', text);
    formData.append('tags', tags.split(',').map(tag => tag.trim()));
    formData.append('category', category);
    if (imageFile) {
      formData.append('image', imageFile);
    }

    try {
      const config = {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
          'Content-Type': 'multipart/form-data'
        },
      };

      if (postId) {
        await axios.patch(`http://localhost:4444/posts/${postId}`, formData, config);
      } else {
        await axios.post('http://localhost:4444/posts', formData, config);
      }

      alert('Post saved successfully');
      navigate('/posts');
    } catch (error) {
      console.error('Failed to save post', error.response ? error.response.data : error.message);
    }
  };

  return (
    <form onSubmit={handleSubmit} className={`post-form ${theme}`}>
      <h2>{postId ? 'Edit Post' : 'Add New Post'}</h2>
      <div>
        <label>Title</label>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
      </div>
      <div>
        <label>Text</label>
        <textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          required
        />
      </div>
      <div>
        <label>Tags</label>
        <input
          type="text"
          value={tags}
          onChange={(e) => setTags(e.target.value)}
          required
        />
      </div>
      <div>
        <label>Category</label>
        <select value={category} onChange={(e) => setCategory(e.target.value)} required>
          <option value="">Select Category</option>
          {categories.map((cat) => (
            <option key={cat._id} value={cat.name}>
              {cat.name}
            </option>
          ))}
        </select>
      </div>
      <div>
        <label>Upload Image</label>
        <input
          type="file"
          onChange={(e) => setImageFile(e.target.files[0])}
        />
      </div>
      <button type="submit">Save Post</button>
    </form>
  );
};

export default PostForm;
