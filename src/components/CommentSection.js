import React, { useState, useEffect } from 'react';
import { generateClient } from 'aws-amplify/api';
import { createComment, createNotification } from '../graphql/mutations';
import { listComments } from '../graphql/queries';
import { onCreateComment } from '../graphql/subscriptions';
import './CommentSection.css';

const client = generateClient();

const CommentSection = ({ postId, userId, username, postOwnerId }) => {
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchComments();
    const subscription = subscribeToNewComments();
    return () => subscription.unsubscribe(); // Clean up subscription
  }, [postId]);

  const fetchComments = async () => {
    try {
      const response = await client.graphql({
        query: listComments,
        variables: {
          filter: { postId: { eq: postId } },
          limit: 50,
          sortDirection: 'DESC'
        }
      });
      setComments(response.data.listComments.items);
    } catch (error) {
      console.error('Error fetching comments:', error);
    }
  };

  const subscribeToNewComments = () => {
    return client.graphql({
      query: onCreateComment
    }).subscribe({
      next: ({ value }) => {
        const newCommentData = value.data.onCreateComment;
        if (newCommentData.postId === postId) {
          // To prevent duplicates from the subscription and the manual state update
          setComments(prev => {
            if (prev.find(c => c.id === newCommentData.id)) {
              return prev;
            }
            return [newCommentData, ...prev];
          });
        }
      },
      error: error => console.error('Error subscribing to comments:', error)
    });
  };

  const handleSubmitComment = async (e) => {
    e.preventDefault();
    if (!newComment.trim()) return;

    setLoading(true);
    try {
      const commentInput = {
        postId,
        userId,
        content: newComment.trim(),
        owner: userId
      };

      const response = await client.graphql({
        query: createComment,
        variables: { input: commentInput }
      });

      const createdComment = response.data.createComment;
      setComments(prev => [createdComment, ...prev]); // Manually add to state
      setNewComment('');

      // Create notification
      if (userId !== postOwnerId) { // Don't notify on self-comment
        await client.graphql({
          query: createNotification,
          variables: {
            input: {
              userId: postOwnerId,
              type: 'NEW_COMMENT',
              actorId: userId,
              postId: postId,
              read: false,
            }
          }
        });
      }
    } catch (error) {
      console.error('Error creating comment:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="comment-section">
      <form onSubmit={handleSubmitComment} className="comment-form">
        <input
          type="text"
          placeholder="Add a comment..."
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
          disabled={loading}
          className="comment-input"
        />
        <button
          type="submit"
          disabled={!newComment.trim() || loading}
          className="comment-submit-btn"
        >
          Post
        </button>
      </form>

      <div className="comments-list">
        {comments.map(comment => (
          <div key={comment.id} className="comment-item">
            <div className="comment-avatar">
              {(comment.user?.preferred_username?.[0] || comment.user?.username[0] || '?').toUpperCase()}
            </div>
            <div className="comment-content">
              <strong>{comment.user?.preferred_username || comment.user?.username}</strong>
              <p>{comment.content}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CommentSection;