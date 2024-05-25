import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import PostForm from './PostForm';
import { useTheme } from '../context/ThemeContext';

const EditPost = () => {
  const { postId } = useParams();
  const [initialData, setInitialData] = useState(null);
  const { theme } = useTheme();

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const response = await axios.get(`http://localhost:4444/posts/${postId}`);
        setInitialData(response.data);
        console.log('Fetched post data:', response.data); // Debugging line
      } catch (error) {
        console.error('Failed to fetch post', error);
      }
    };

    fetchPost();
  }, [postId]);

  if (!initialData) return <div>Loading...</div>;

  return (
    <div className={`edit-post ${theme}`}>
      <PostForm postId={postId} initialData={initialData} />
    </div>
  );
};

export default EditPost;
