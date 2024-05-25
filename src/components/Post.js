import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Post = ({ postId }) => {
  const [post, setPost] = useState(null);

  useEffect(() => {
    async function fetchPost() {
      try {
        const response = await axios.get(`http://localhost:4444/posts/${postId}`);
        setPost(response.data);
      } catch (error) {
        console.error('Failed to fetch post', error);
      }
    }

    fetchPost();
  }, [postId]);

  if (!post) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h2>{post.title}</h2>
      <p>{post.text}</p>
      <div>
        <strong>Tags:</strong> {post.tags.join(', ')}
      </div>
    </div>
  );
};

export default Post;
