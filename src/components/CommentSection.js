import React, { useState, useEffect } from 'react';
import { Amplify } from 'aws-amplify';
import { generateClient } from 'aws-amplify/api';
import { createComment } from '../graphql/mutations';
import { listComments } from '../graphql/queries';
import { onCreateComment } from '../graphql/subscriptions';
import './CommentSection.css';

const client = generateClient();

const CommentSection = ({ postId, userId, username }) => {
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchComments();
    subscribeToNewComments();
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
    const subscription = client.graphql({
      query: onCreateComment
    }).subscribe({
      next: ({ value }) => {
        const newComment = value.data.onCreateComment;
        if (newComment.postId === postId) {
          setComments(prev => [newComment, ...prev]);
        }
      },
      error: error => console.error('Error subscribing to comments:', error)
    });

    return () => subscription.unsubscribe();
  };

  const handleSubmitComment = async (e) => {
    e.preventDefault();
    if (!newComment.trim()) return;

    setLoading(true);
    try {
      await client.graphql({
        query: createComment,
        variables: {
          input: {
            postId,
            userId,
            content: newComment.trim(),
            owner: userId
          }
        }
      });
      setNewComment('');
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