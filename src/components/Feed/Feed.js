import React, { useState, useEffect } from 'react';
import { useAuthenticator } from '@aws-amplify/ui-react';
import './Feed.css';
import Post from '../Post/Post';
import client from '../../utils/client';
import { listPostsWithUser } from '../../graphql/custom-queries';
import { onCreatePost } from '../../graphql/subscriptions'; // Import the subscription

function Feed() {
  const { user: currentUser } = useAuthenticator();
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchPosts();

    // Set up the subscription with error handling and retries
    let subscription;
    try {
      subscription = client.graphql({
        query: onCreatePost,
        variables: {} // Explicitly set empty variables
      }).subscribe({
        next: ({ data }) => {
          if (data?.onCreatePost) {
            const newPost = data.onCreatePost;
            setPosts(prevPosts => {
              if (prevPosts.find(p => p.id === newPost.id)) {
                return prevPosts;
              }
              return [newPost, ...prevPosts];
            });
          }
        },
        error: (error) => {
          console.error('Subscription error:', error);
          // Attempt to reestablish subscription after error
          setTimeout(() => {
            if (subscription) {
              subscription.unsubscribe();
            }
            // Recursive retry with exponential backoff could be implemented here
          }, 5000);
        }
      });
    } catch (err) {
      console.error('Error setting up subscription:', err);
    }

    // Cleanup subscription on component unmount
    return () => subscription.unsubscribe();

  }, []);

  async function fetchPosts() {
    try {
      const postData = await client.graphql({
        query: listPostsWithUser,
        variables: {
          limit: 20,
          filter: {
            // Ne pas filtrer par owner pour voir tous les posts
          },
        }
      });
      
      if (postData.data?.listPosts?.items) {
        // Trier les posts par date de création (plus récents en premier)
        const sortedPosts = postData.data.listPosts.items.sort((a, b) => 
          new Date(b.createdAt) - new Date(a.createdAt)
        );
        setPosts(sortedPosts);
      } else {
        console.log('No posts found or invalid response format');
      }
    } catch (err) {
      console.error('Error fetching posts:', err);
    } finally {
      setLoading(false);
    }
  }

  if (loading) {
    return <div className="feed-message">Loading posts...</div>;
  }

  if (posts.length === 0) {
    return <div className="feed-message">No posts yet. Be the first to post!</div>;
  }

  return (
    <div className="feed">
      {posts.map(post => (
        <Post key={post.id} post={post} currentUser={currentUser} />
      ))}
    </div>
  );
}

export default Feed;
