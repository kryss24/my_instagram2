import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { getUrl } from 'aws-amplify/storage';
import { generateClient } from 'aws-amplify/api';
import { deletePost, updatePost } from '../../graphql/mutations';
import LikeButton from '../LikeButton';
import CommentSection from '../CommentSection';
import './Post.css';

const client = generateClient();

function Post({ post, currentUser, onDelete }) {
  const [showComments, setShowComments] = useState(false);
  const [imageUrl, setImageUrl] = useState(null);
  const [videoUrl, setVideoUrl] = useState(null);
  const [avatarUrl, setAvatarUrl] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [editedContent, setEditedContent] = useState(post.content);
  const videoRef = useRef(null);

  useEffect(() => {
    const fetchMediaUrls = async () => {
      try {
        // Fetch post image
        if (post.image) {
          let imagePath = post.image;
          if (!imagePath.startsWith('public/')) {
            imagePath = `public/${imagePath}`;
          }
          const urlResult = await getUrl({ path: imagePath });
          setImageUrl(urlResult.url.toString());
        }

        // Fetch post video
        if (post.video) {
          let videoPath = post.video;
          if (!videoPath.startsWith('public/')) {
            videoPath = `public/${videoPath}`;
          }
          const urlResult = await getUrl({ path: videoPath });
          setVideoUrl(urlResult.url.toString());
        }

        // Fetch user avatar
        if (post.user?.avatar) {
          let avatarPath = post.user.avatar;
          if (!avatarPath.startsWith('public/')) {
            avatarPath = `public/${avatarPath}`;
          }
          const urlResult = await getUrl({ path: avatarPath });
          setAvatarUrl(urlResult.url.toString());
        }
      } catch (error) {
        console.error('Error fetching media URLs:', error);
      }
    };

    fetchMediaUrls();
  }, [post.image, post.video, post.user?.avatar]);

  const handleDelete = async () => {
    if (window.confirm('Are you sure you want to delete this post?')) {
      try {
        await client.graphql({
          query: deletePost,
          variables: { input: { id: post.id } },
        });
        if (onDelete) {
          onDelete(post.id);
        }
      } catch (error) {
        console.error('Error deleting post:', error);
        alert('Failed to delete post: ' + error.message);
      }
    }
  };

  const handleSave = async () => {
    try {
      await client.graphql({
        query: updatePost,
        variables: {
          input: {
            id: post.id,
            content: editedContent,
          },
        },
      });
      setIsEditing(false);
      // Optimistically update the post content
      post.content = editedContent;
    } catch (error) {
      console.error('Error updating post:', error);
      alert('Failed to update post: ' + error.message);
    }
  };

  // Render media based on what's available
  const renderMedia = () => {
    // Priorité à la vidéo si présente
    if (videoUrl) {
      return (
        <div className="post-video">
          <video 
            ref={videoRef}
            src={videoUrl} 
            controls
            playsInline
            preload="metadata"
          />
        </div>
      );
    }

    // Sinon afficher l'image
    if (imageUrl) {
      return (
        <div className="post-image">
          <img src={imageUrl} alt="Post content" />
        </div>
      );
    }

    return null;
  };

  const isOwner = currentUser?.username === post.owner;

  return (
    <article className="post">
      <header className="post-header">
        <div className="post-avatar">
          {avatarUrl ? (
            <img src={avatarUrl} alt="Profile" />
          ) : (
            <div className="default-avatar-placeholder" />
          )}
        </div>
        <div className="post-owner">
          <Link to={`/profile/${post.user?.username || 'unknown'}`}>
            {post.user?.preferred_username || post.user?.username || 'Unknown User'}
          </Link>
        </div>
        {isOwner && (
          <div className="post-actions-menu">
            <button onClick={() => setIsEditing(!isEditing)}>
              {isEditing ? 'Cancel' : 'Edit'}
            </button>
            <button onClick={handleDelete}>Delete</button>
          </div>
        )}
      </header>
      
      <div className="post-content">
        {isEditing ? (
          <textarea
            value={editedContent}
            onChange={(e) => setEditedContent(e.target.value)}
            rows="3"
          />
        ) : (
          post.content && <p>{post.content}</p>
        )}
        {renderMedia()}
      </div>
      
      <footer className="post-footer">
        <div className="post-actions">
          {isEditing ? (
            <button onClick={handleSave} className="save-button">
              Save
            </button>
          ) : (
            <>
              <LikeButton 
                postId={post.id} 
                userId={currentUser?.username}
                postOwnerId={post.owner}
              />
              <button 
                onClick={() => setShowComments(!showComments)}
                className={`comment-button ${showComments ? 'active' : ''}`}
              >
                💬
              </button>
            </>
          )}
        </div>
        {showComments && (
          <CommentSection
            postId={post.id}
            userId={currentUser?.username}
            username={currentUser?.preferred_username || currentUser?.username}
            postOwnerId={post.owner}
          />
        )}
      </footer>
    </article>
  );
}

export default Post;