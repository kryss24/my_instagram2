import React, { useState, useEffect } from 'react';
import { useAuthenticator } from '@aws-amplify/ui-react';
import { Link } from 'react-router-dom';
import './Feed.css';
import Post from '../Post/Post';
import client from '../../utils/client';
import { getUserWithFollows } from '../../graphql/custom-queries';
import { listPosts } from '../../graphql/queries';
import { onCreatePost } from '../../graphql/subscriptions';

function Feed() {
  const { user: currentUser } = useAuthenticator();
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [followedUsers, setFollowedUsers] = useState([]);

  useEffect(() => {
    if (!currentUser) return;

    const fetchPosts = async () => {
      try {
        setLoading(true);
        
        // 1. Récupérer la liste des utilisateurs suivis
        const userDetails = await client.graphql({
          query: getUserWithFollows,
          variables: { username: currentUser.username }
        });

        const followingList = userDetails.data.getUser.following.items.map(
          item => item.followedId
        );
        setFollowedUsers(followingList);

        // 2. Récupérer tous les posts publics
        const publicPostsResult = await client.graphql({
          query: listPosts,
          variables: {
            filter: {
              or: [
                { isPublic: { eq: true } },
                { isPublic: { attributeExists: false } } // Posts anciens sans isPublic
              ]
            },
            limit: 50
          }
        });

        let allPosts = publicPostsResult.data.listPosts.items || [];

        // 3. Récupérer les posts privés des utilisateurs suivis + mes posts privés
        const usersToFetch = [...followingList, currentUser.username];
        
        for (const userId of usersToFetch) {
          try {
            const userPostsResult = await client.graphql({
              query: listPosts,
              variables: {
                filter: {
                  userId: { eq: userId },
                  isPublic: { eq: false }
                },
                limit: 20
              }
            });
            
            if (userPostsResult.data.listPosts.items) {
              allPosts = allPosts.concat(userPostsResult.data.listPosts.items);
            }
          } catch (err) {
            console.error(`Error fetching posts for user ${userId}:`, err);
          }
        }

        // 4. Dédupliquer et trier par date
        const uniquePosts = Array.from(
          new Map(allPosts.map(post => [post.id, post])).values()
        ).sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

        setPosts(uniquePosts);
      } catch (err) {
        console.error('Error fetching posts:', err);
        setPosts([]);
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();

    // 5. Subscription pour nouveaux posts
    const subscription = client.graphql({
      query: onCreatePost,
    }).subscribe({
      next: ({ data }) => {
        if (data?.onCreatePost) {
          const newPost = data.onCreatePost;
          
          // Vérifier si le post doit être visible
          const shouldDisplay = checkPostVisibility(newPost);
          
          if (shouldDisplay) {
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

  // Fonction pour vérifier la visibilité d'un post en temps réel
  const checkPostVisibility = (post) => {
    // Si c'est mon propre post
    if (post.userId === currentUser.username) {
      return true;
    }

    // Si le post est public ou n'a pas de valeur isPublic (posts anciens)
    if (post.isPublic === true || post.isPublic === null || post.isPublic === undefined) {
      return true;
    }

    // Si le post est privé, vérifier si je suis l'auteur
    if (post.isPublic === false) {
      return followedUsers.includes(post.userId);
    }

    return false;
  };

  const handleDeletePost = (postId) => {
    setPosts(prevPosts => prevPosts.filter(post => post.id !== postId));
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
        <Post 
          key={post.id} 
          post={post} 
          currentUser={currentUser} 
          onDelete={handleDeletePost} 
        />
      ))}
    </div>
  );
}

export default Feed;