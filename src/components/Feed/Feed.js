import React, { useState, useEffect } from 'react';
import { useAuthenticator } from '@aws-amplify/ui-react';
import { Link } from 'react-router-dom';
import './Feed.css';
import Post from '../Post/Post';
import client from '../../utils/client';
import { getUserWithFollows } from '../../graphql/custom-queries';
import { listPostsWithUser } from '../../graphql/custom-queries';
import { onCreatePost } from '../../graphql/subscriptions';

function Feed() {
  const { user: currentUser } = useAuthenticator();
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [followedUsers, setFollowedUsers] = useState([]);

  useEffect(() => {
    if (!currentUser) return;

    const fetchFollowingAndPosts = async () => {
      try {
        setLoading(true);
        // 1. Fetch the list of users the current user is following
        const userDetails = await client.graphql({
          query: getUserWithFollows,
          variables: { username: currentUser.username }
        });

        const followingList = userDetails.data.getUser.following.items.map(item => item.followedId);
        setFollowedUsers(followingList);
        
        // 2. Construct the filter for posts, ensuring no empty values
        const userIdsToFetch = [currentUser.username, ...followingList].filter(Boolean);
        
        let filter;
        if (userIdsToFetch.length > 1) {
          filter = {
            or: userIdsToFetch.map(userId => ({ userId: { eq: userId } }))
          };
        } else if (userIdsToFetch.length === 1) {
          filter = { userId: { eq: userIdsToFetch[0] } };
        } else {
          // No valid users to fetch posts for.
          setPosts([]);
          setLoading(false);
          return;
        }

        // 3. Fetch posts from followed users and the current user
        const postData = await client.graphql({
          query: listPostsWithUser,
          variables: {
            limit: 20,
            filter: filter
          }
        });

        if (postData.data?.listPosts?.items) {
          const sortedPosts = postData.data.listPosts.items.sort((a, b) => 
            new Date(b.createdAt) - new Date(a.createdAt)
          );
          setPosts(sortedPosts);
        }
      } catch (err) {
        console.error('Error fetching data:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchFollowingAndPosts();

    // 4. Set up subscription for new posts
    const subscription = client.graphql({
      query: onCreatePost,
    }).subscribe({
      next: ({ data }) => {
        if (data?.onCreatePost) {
          const newPost = data.onCreatePost;
          // Only add the new post if it's from the user or someone they follow
          if (newPost.userId === currentUser.username || followedUsers.includes(newPost.userId)) {
            setPosts(prevPosts => {
              if (prevPosts.find(p => p.id === newPost.id)) {
                return prevPosts;
              }
              return [newPost, ...prevPosts];
            });
          }
        }
      },
      error: (error) => console.error('Subscription error:', error),
    });

    return () => subscription.unsubscribe();
  }, [currentUser]);

  const handleDeletePost = (postId) => {
    setPosts(posts.filter(post => post.id !== postId));
  };

  if (loading) {
    return <div className="feed-message">Loading your personalized feed...</div>;
  }

  if (posts.length === 0) {
    return (
      <div className="feed-message">
        <h2>Welcome to your feed!</h2>
        <p>Your feed is currently empty. Posts from users you follow will appear here.</p>
        <Link to="/search" className="find-friends-link">Find friends to follow</Link>
      </div>
    );
  }

  return (
    <div className="feed">
      {posts.map(post => (
        <Post key={post.id} post={post} currentUser={currentUser} onDelete={handleDeletePost} />
      ))}
    </div>
  );
}

export default Feed;