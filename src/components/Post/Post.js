import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getUrl } from '@aws-amplify/storage';
import LikeButton from '../LikeButton';
import CommentSection from '../CommentSection';
import './Post.css';

function Post({ post, currentUser }) {
  const [showComments, setShowComments] = useState(false);
  const [imageUrl, setImageUrl] = useState(null);
  const [avatarUrl, setAvatarUrl] = useState(null);

  useEffect(() => {
    const fetchMediaUrls = async () => {
      // Fetch post image
      if (post.image) {
        console.log("Fetching image for post:", post.id, "with key:", post.image);
        try {
          let imagePath = post.image;
          if (!imagePath.startsWith('public/')) {
            imagePath = `public/${imagePath}`;
          }
          
          console.log("Using path:", imagePath);
          
          const urlResult = await getUrl({
            path: imagePath,
          });
          console.log("Image URL received:", urlResult.url.toString());
          setImageUrl(urlResult.url.toString());
        } catch (error) {
          console.error('Error fetching image URL:', error);
        }
      }

      // Fetch user avatar
      if (post.user?.avatar) {
        console.log("Fetching avatar for user:", post.user.username, "with key:", post.user.avatar);
        try {
            const urlResult = await getUrl({ key: post.user.avatar, options: { accessLevel: 'protected' }});
            console.log("Avatar URL received:", urlResult.url.toString());
            setAvatarUrl(urlResult.url.toString());
        } catch (error) {
            console.error('Error fetching avatar URL:', error);
        }
      }
    };

    fetchMediaUrls();
  }, [post.image, post.user?.avatar]);
  
  return (
    <article className="post">
      <header className="post-header">
        <div className="post-avatar">
          {avatarUrl ? <img src={avatarUrl} alt="Profile" /> : <div className="default-avatar-placeholder" />}
        </div>
        <div className="post-owner">
          <Link to={`/profile/${post.user.username}`}>
            {post.user?.preferred_username || post.user?.username || 'Unknown User'}
          </Link>
        </div>
      </header>
      <div className="post-content">
        <p>{post.content}</p>
        {imageUrl && (
          <div className="post-image">
            <img src={imageUrl} alt="Post content" />
          </div>
        )}
      </div>
      <footer className="post-footer">
        <div className="post-actions">
          <LikeButton 
            postId={post.id} 
            userId={currentUser.username}
            postOwnerId={post.userId}
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
            postOwnerId={post.userId}
          />
        )}
      </footer>
    </article>
  );
}

export default Post;