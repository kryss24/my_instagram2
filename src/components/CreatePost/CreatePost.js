import React, { useState, useEffect } from 'react';
import './CreatePost.css';
import { generateClient } from 'aws-amplify/api';
import { createPost } from '../../graphql/mutations';
import { uploadData } from 'aws-amplify/storage';
import { fetchAuthSession } from '@aws-amplify/auth';

const client = generateClient();

function CreatePost({ user, onPostCreated }) {
  const [content, setContent] = useState('');
  const [image, setImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // Create a preview URL whenever the image file changes
    if (image) {
      const previewUrl = URL.createObjectURL(image);
      setImagePreview(previewUrl);

      // Cleanup the preview URL when the component unmounts or the image changes
      return () => URL.revokeObjectURL(previewUrl);
    } else {
      setImagePreview(null);
    }
  }, [image]);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(file);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!content.trim() && !image) return;

    setLoading(true);
    try {
      let imageKey = null;
      if (image) {
        const { identityId } = await fetchAuthSession();
        if (!identityId) {
            throw new Error("User is not authenticated.");
        }
        const sanitizedName = image.name.replace(/[^a-zA-Z0-9.]/g, '_');
        const fileName = `${Date.now()}-${sanitizedName}`;
        // The path should be relative to the access level, 'protected/{identityId}/' is added by Amplify
        const path = `${identityId}/${fileName}`;

        const uploadResult = await uploadData({
        path: `public/${fileName}`,
        data: image,
      }).result;
        
        imageKey = uploadResult.path; // This will now correctly be 'protected/{identityId}/fileName'
      }

      const postDetails = {
        content: content.trim(),
        userId: user.username,
        image: imageKey,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      };
      
      const result = await client.graphql({
        query: createPost,
        variables: { input: postDetails }
      });

      if (result.data?.createPost) {
        setContent('');
        setImage(null);
        setImagePreview(null);
        if (document.getElementById('file-input')) {
          document.getElementById('file-input').value = '';
        }
        if (onPostCreated) {
          onPostCreated();
        }
      }
    } catch (error) {
      console.error('Error creating post:', error);
      alert('Failed to create post: ' + error.message);
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
        {imagePreview && (
          <div className="image-preview">
            <img src={imagePreview} alt="Selected preview" />
          </div>
        )}
        <input
          id="file-input"
          type="file"
          accept="image/*"
          onChange={handleFileChange}
          disabled={loading}
        />
        <button type="submit" className="create-post-button" disabled={loading}>
          {loading ? 'Posting...' : 'Post'}
        </button>
      </form>
    </div>
  );
}

export default CreatePost;