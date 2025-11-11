import React, { useState } from 'react';
import LikeButton from '../LikeButton';
import CommentSection from '../CommentSection';
import './Post.css';

function Post({ post, currentUser }) {
  const [showComments, setShowComments] = useState(false);
  
  return (
    <article className="post">
      <header className="post-header">
        <div className="post-avatar">
          {post.user?.avatar && <img src={post.user.avatar} alt="Profile" />}
        </div>
        <div className="post-owner">
          {post.user?.preferred_username || post.user?.username || 'Unknown User'}
        </div>
      </header>
      <div className="post-content">
        <p>{post.content}</p>
        {post.image && (
          <div className="post-image">
            <img src={post.image} alt="Post content" />
          </div>
        )}
      </div>
      <footer className="post-footer">
        <div className="post-actions">
          <LikeButton 
            postId={post.id} 
            userId={currentUser.username}
          />
          <button 
            onClick={() => setShowComments(!showComments)}
            className={`comment-button ${showComments ? 'active' : ''}`}
          >
            💬
          </button>
        </div>
        {showComments && (
          <CommentSection
            postId={post.id}
            userId={currentUser.username}
            username={currentUser.preferred_username || currentUser.username}
          />
        )}
      </footer>
    </article>
  );
}

export default Post;
