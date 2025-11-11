import React from 'react';
import './PostGridItem.css';

function PostGridItem({ post }) {
  // Assuming post.content is the image URL for now
  return (
    <div className="post-grid-item">
      <img src={post.content} alt={`Post by ${post.owner}`} />
    </div>
  );
}

export default PostGridItem;
