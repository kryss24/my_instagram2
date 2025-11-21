import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { generateClient } from 'aws-amplify/api';
import { notificationsByUserIdAndCreatedAt } from '../../graphql/queries';
import { onCreateNotification } from '../../graphql/subscriptions';
import './NotificationIcon.css';

const client = generateClient();

const NotificationIcon = ({ user }) => {
  const [unreadCount, setUnreadCount] = useState(0);

  useEffect(() => {
    if (!user) return;

    // Fetch initial unread count
    const fetchUnreadCount = async () => {
      try {
        const response = await client.graphql({
          query: notificationsByUserIdAndCreatedAt,
          variables: {
            userId: user.username,
            filter: { read: { eq: false } },
          },
        });
        setUnreadCount(response.data.notificationsByUserIdAndCreatedAt.items.length);
      } catch (error) {
        console.error('Error fetching unread notification count:', error);
      }
    };

    fetchUnreadCount();

    // Subscribe to new notifications
    const subscription = client.graphql({
      query: onCreateNotification,
      variables: { userId: user.username } // Only subscribe to notifications for the current user
    }).subscribe({
      next: () => {
        setUnreadCount(prevCount => prevCount + 1);
      },
      error: (error) => console.error('Subscription error:', error),
    });

    return () => subscription.unsubscribe();
  }, [user]);

  return (
    <Link to="/notifications" className="notification-icon-container">
      <span className="notification-icon">🔔</span>
      {unreadCount > 0 && (
        <span className="notification-badge">{unreadCount}</span>
      )}
    </Link>
  );
};

export default NotificationIcon;
