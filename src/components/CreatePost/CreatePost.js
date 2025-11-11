import React, { useState } from 'react';
import './CreatePost.css';
import { generateClient } from 'aws-amplify/api'; // Correct v6 import
import { createPost } from '../../graphql/mutations';

const client = generateClient(); // Create the client

function CreatePost({ user, onPostCreated }) { // Accept onPostCreated prop
  const [content, setContent] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!content.trim()) return;

    setLoading(true);
    try {
      const postDetails = {
        content: content.trim(),
        userId: user.username, // Utiliser le username comme identifiant
        createdAt: new Date().toISOString(), // Ajouter la date de création
        updatedAt: new Date().toISOString() // Ajouter la date de mise à jour
      };
      
      const result = await client.graphql({
        query: createPost,
        variables: { input: postDetails }
      });

      if (result.data?.createPost) {
        setContent(''); // Clear input after successful post
        if (onPostCreated) { // Call onPostCreated if provided
          onPostCreated();
        }
      } else {
        console.error('Failed to create post:', result);
      }
    } catch (error) {
      console.error('Error creating post:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="create-post-container">
      <form className="create-post-form" onSubmit={handleSubmit}>
        <textarea
          className="create-post-textarea"
          placeholder="What's on your mind?"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          rows="3"
          disabled={loading}
        ></textarea>
        <button type="submit" className="create-post-button" disabled={loading}>
          {loading ? 'Posting...' : 'Post'}
        </button>
      </form>
    </div>
  );
}

export default CreatePost;
