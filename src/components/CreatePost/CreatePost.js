import React, { useState, useEffect } from 'react';
import './CreatePost.css';
import { generateClient } from 'aws-amplify/api';
import { createPost } from '../../graphql/mutations';
import { getUser } from '../../graphql/queries';
import { uploadData } from 'aws-amplify/storage';

const client = generateClient();

function CreatePost({ user, onPostCreated }) {
  const [content, setContent] = useState('');
  const [mediaFile, setMediaFile] = useState(null);
  const [mediaPreview, setMediaPreview] = useState(null);
  const [mediaType, setMediaType] = useState(null);
  const [loading, setLoading] = useState(false);


  useEffect(() => {
    if (mediaFile) {
      const previewUrl = URL.createObjectURL(mediaFile);
      setMediaPreview(previewUrl);
      return () => URL.revokeObjectURL(previewUrl);
    } else {
      setMediaPreview(null);
    }
  }, [mediaFile]);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setMediaFile(file);
      if (file.type.startsWith('image/')) {
        setMediaType('image');
      } else if (file.type.startsWith('video/')) {
        setMediaType('video');
      }
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!content.trim() && !mediaFile) return;

    setLoading(true);
    try {
      let imageKey = null;
      let videoKey = null;
      
      if (mediaFile) {
        const sanitizedName = mediaFile.name.replace(/[^a-zA-Z0-9.]/g, '_');
        const fileName = `${Date.now()}-${sanitizedName}`;
        
        await uploadData({
          path: `public/${fileName}`,
          data: mediaFile,
        }).result;
        
        if (mediaType === 'image') {
          imageKey = fileName;
        } else if (mediaType === 'video') {
          videoKey = fileName;
        }
      }

      // Récupérer le accountType de l'utilisateur
      let isPublic = true; // Par défaut public
      try {
        const userDataResult = await client.graphql({
          query: getUser,
          variables: { username: user.username }
        });
        const accountType = userDataResult.data.getUser?.accountType || 'public';
        isPublic = accountType === 'public';
      } catch (error) {
        console.error('Error fetching user accountType:', error);
        // En cas d'erreur, on garde public par défaut
      }

      const postDetails = {
        content: content.trim(),
        image: imageKey,
        video: videoKey,
        userId: user.username,
        isPublic: isPublic,
        createdAt: new Date().toISOString(),
        userPostsUsername: user.preferred_username,
      };
      
      const result = await client.graphql({
        query: createPost,
        variables: { input: postDetails }
      });

      if (result.data?.createPost) {
        setContent('');
        setMediaFile(null);
        setMediaPreview(null);
        setMediaType(null);
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
      <div className="create-post-form">
        <textarea
          className="create-post-textarea"
          placeholder="What's on your mind?"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          rows="3"
          disabled={loading}
        />
        
        {mediaPreview && (
          <div className="media-preview">
            {mediaType === 'image' ? (
              <img src={mediaPreview} alt="Selected preview" />
            ) : (
              <video src={mediaPreview} controls />
            )}
            <button 
              type="button" 
              className="remove-media-btn"
              onClick={() => {
                setMediaFile(null);
                setMediaPreview(null);
                setMediaType(null);
              }}
            >
              ✕
            </button>
          </div>
        )}
        
        <div className="create-post-actions">
          <label className="file-input-label">
            <input
              id="file-input"
              type="file"
              accept="image/*,video/*"
              onChange={handleFileChange}
              disabled={loading}
              style={{ display: 'none' }}
            />
            📷 Add Photo/Video
          </label>
          
          <button 
            type="button" 
            className="create-post-button" 
            disabled={loading}
            onClick={handleSubmit}
          >
            {loading ? 'Posting...' : 'Post'}
          </button>
        </div>
      </div>
    </div>
  );
}

export default CreatePost;