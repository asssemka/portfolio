import React from 'react';
import axios from 'axios';
import './css/PostItem.css';

const PostItem = ({ post, onDelete, onEdit }) => {
  const handleDelete = async () => {
    try {
      await axios.delete(`http://localhost:4444/posts/${post._id}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });
      alert('Post deleted successfully');
      if (onDelete) {
        onDelete(post._id);
      }
    } catch (error) {
      console.error('Failed to delete post', error);
    }
  };

  return (
    <div className="post-item">
      {post.imageUrl && <img src={`http://localhost:4444${post.imageUrl}`} alt={post.title} />}
      <h2>{post.title}</h2>
      <p>{post.text}</p>
      <div>
        <strong>Tags:</strong> {post.tags.join(', ')}
      </div>
      <div>
        <strong>Category:</strong> {post.category.name}
      </div>
      <button onClick={handleDelete}>Delete</button>
      <button onClick={() => onEdit(post)}>Edit</button>
    </div>
  );
};

export default PostItem;
