import React, { useState, useEffect } from 'react';
import { Amplify } from 'aws-amplify';
import { generateClient } from 'aws-amplify/api';
import { createLike, deleteLike } from '../graphql/mutations';
import { listLikes } from '../graphql/queries';
import './LikeButton.css';

const client = generateClient();

const LikeButton = ({ postId, userId }) => {
  const [isLiked, setIsLiked] = useState(false);
  const [likeId, setLikeId] = useState(null);
  const [likesCount, setLikesCount] = useState(0);

  useEffect(() => {
    checkIfPostIsLiked();
    fetchLikesCount();
  }, [postId, userId]);

  const checkIfPostIsLiked = async () => {
    try {
      const response = await client.graphql({
        query: listLikes,
        variables: {
          filter: {
            and: [
              { postId: { eq: postId } },
              { userId: { eq: userId } }
            ]
          }
        }
      });
      
      const like = response.data.listLikes.items[0];
      if (like) {
        setIsLiked(true);
        setLikeId(like.id);
      }
    } catch (error) {
      console.error('Error checking like status:', error);
    }
  };

  const fetchLikesCount = async () => {
    try {
      const response = await client.graphql({
        query: listLikes,
        variables: {
          filter: { postId: { eq: postId } }
        }
      });
      setLikesCount(response.data.listLikes.items.length);
    } catch (error) {
      console.error('Error fetching likes count:', error);
    }
  };

  const handleLike = async () => {
    try {
      if (isLiked) {
        // Unlike the post
        await client.graphql({
          query: deleteLike,
          variables: { input: { id: likeId } }
        });
        setIsLiked(false);
        setLikeId(null);
        setLikesCount(prev => prev - 1);
      } else {
        // Like the post
        const response = await client.graphql({
          query: createLike,
          variables: {
            input: {
              postId,
              userId,
              owner: userId
            }
          }
        });
        setIsLiked(true);
        setLikeId(response.data.createLike.id);
        setLikesCount(prev => prev + 1);
      }
    } catch (error) {
      console.error('Error toggling like:', error);
    }
  };

  return (
    <div className="like-button-container">
      <button 
        onClick={handleLike} 
        className={`like-button ${isLiked ? 'liked' : ''}`}
      >
        {isLiked ? '❤️' : '🤍'}
      </button>
      <span>{likesCount} likes</span>
    </div>
  );
};

export default LikeButton;