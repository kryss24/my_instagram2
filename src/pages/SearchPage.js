import React, { useState, useEffect } from 'react';
import { useLocation, Link } from 'react-router-dom';
import { generateClient } from 'aws-amplify/api';
import { getUrl } from 'aws-amplify/storage';
import { listUsers } from '../graphql/queries';


import { searchUsers } from '../graphql/queries';
import '../styles/SearchPage.css';

const client = generateClient();

function useQuery() {
  return new URLSearchParams(useLocation().search);
}

const SearchPage = () => {
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(true);
  const { search } = useLocation();
  const searchQuery = new URLSearchParams(search).get('q');


  // console.log('Search query:', searchQuery);

  useEffect(() => {
    const fetchResults = async () => {

      if (!searchQuery) {
        setResults([]);
        setLoading(false);
        return;
      }

      setLoading(true);
      try {
        const response = await client.graphql({
          query: listUsers,
          variables: {
            filter: {
              or: [
                { preferred_username: { contains: searchQuery } },
                { username: { contains: searchQuery } },
              ]
            }
          }
        });

        const users = response.data?.listUsers?.items || [];

        const usersWithAvatars = await Promise.all(
          users.map(async (user) => {
            if (user.avatar) {
              
              try {
                // Fetch user avatar
                 let avatarPath = user.avatar;
                  if (!avatarPath.startsWith('public/')) {
                    avatarPath = `public/${avatarPath}`;
                  }
                  const urlResult = await getUrl({ path: avatarPath });
                return { ...user, avatarUrl: urlResult.url.toString() };
              } catch (error) {
                console.error('Error fetching avatar URL for user:', user.username, error);
                return { ...user, avatarUrl: '/default-avatar.png' };
              }
            }
            return { ...user, avatarUrl: '/default-avatar.png' };
          })
        );
        setResults(usersWithAvatars);

      } catch (error) {
        console.error('Error searching users:', error);
        setResults([]);
      } finally {
        setLoading(false);
      }
    };

    fetchResults();
  }, [searchQuery]);

  return (
    <div className="search-page-container">
      <h1 className="search-page-title">Search Results for "{searchQuery}"</h1>
      {loading ? (
        <div className="loading-spinner"></div>
      ) : (
        <div className="search-results">
          {results.length > 0 ? (
            results.map((user) => (
              <div key={user.id} className="search-result-item">
                <Link to={`/profile/${user.username}`} className="search-result-link">
                  <img 
                    src={user.avatarUrl} 
                    alt={`${user.username}'s avatar`} 
                    className="search-result-avatar"
                  />
                  <div className="search-result-info">
                    <span className="search-result-username">{user.preferred_username || user.username}</span>
                    <span className="search-result-handle">@{user.username}</span>
                  </div>
                </Link>
              </div>
            ))
          ) : (
            <p>No users found.</p>
          )}
        </div>
      )}
    </div>
  );
};

export default SearchPage;
