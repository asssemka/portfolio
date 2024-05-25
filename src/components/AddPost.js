import React from 'react';
import PostForm from './PostForm';
import { useTheme } from '../context/ThemeContext';

const AddPost = () => {
  const { theme } = useTheme();

  return (
    <div className={`add-post ${theme}`}>
      <PostForm />
    </div>
  );
};

export default AddPost;
