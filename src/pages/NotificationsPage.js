import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { generateClient } from 'aws-amplify/api';
import { getCurrentUser } from '@aws-amplify/auth';
import { notificationsByUserIdAndCreatedAt } from '../graphql/queries';
import { updateNotification, markNotificationRead } from '../graphql/mutations';
import { onCreateNotification } from '../graphql/subscriptions';
import { getUrl } from 'aws-amplify/storage';
import { getUser } from '../graphql/queries';
import '../styles/NotificationsPage.css';

const client = generateClient();

const NotificationsPage = () => {
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchNotificationsAndAvatars = async () => {
    try {
      const currentUser = await getCurrentUser();
      const response = await client.graphql({
        query: notificationsByUserIdAndCreatedAt,
        variables: { 
          userId: currentUser.username,
          sortDirection: 'DESC'
        },
      });
      const items = response.data.notificationsByUserIdAndCreatedAt.items;
      

      const notificationsWithAvatars = await Promise.all(
        items.map(async (notification) => {
          let avatarUrl = '/default-avatar.png';

            try {
              const response = await client.graphql({
                        query: getUser,
                        variables: { username: notification.actorId },
                      });
              const actorData = response.data.getUser;
              let avatarPath = actorData.avatar;
              console.log('Avatar Path:', avatarPath);
              if (!avatarPath.startsWith('public/')) {
                avatarPath = `public/${avatarPath}`;
              }
              const urlResult = await getUrl({ path: avatarPath });
              
              avatarUrl =   urlResult.url.toString();
            } catch (error) {
              console.error('Error fetching avatar for notification:', error);
            }
          return { ...notification, actor: { ...notification.actor, avatarUrl } };
        })
      );
      setNotifications(notificationsWithAvatars);
    } catch (error) {
      console.error('Error fetching notifications:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchNotificationsAndAvatars();

    const subscription = client.graphql({
      query: onCreateNotification,
    }).subscribe({
      next: ({ data }) => {
        const newNotification = data.onCreateNotification;
        // Assuming the subscription should only be for the current user
        // You might need to add a filter to the subscription if it's not user-specific by default
        fetchNotificationsAndAvatars(); // Re-fetch all to get the latest list with avatars
      },
      error: (error) => console.warn(error),
    });

    return () => subscription.unsubscribe();
  }, []);

  const handleNotificationClick = async (notification) => {
    if (notification.read) return;

    try {
      await client.graphql({
        query: markNotificationRead,
        variables: { id: notification.id }
      });

      setNotifications(prev => 
        prev.map(n => n.id === notification.id ? { ...n, read: true } : n)
      );
    } catch (error) {
      console.error('Error marking notification as read:', error);
    }
  };
  
  const getNotificationLink = (notification) => {
    switch (notification.type) {
        case 'NEW_FOLLOWER':
            return `/profile/${notification.actor.username}`;
        case 'NEW_LIKE':
        case 'NEW_COMMENT':
            return `/post/${notification.postId}`;
        default:
            return '#';
    }
  }

  const renderNotificationText = (notification) => {
    const actorUsername = notification.actor?.preferred_username || notification.actor?.username;
    switch (notification.type) {
      case 'NEW_LIKE':
        return (
          <>
            <strong>{actorUsername}</strong> liked your post.
          </>
        );
      case 'NEW_COMMENT':
        return (
          <>
            <strong>{actorUsername}</strong> commented on your post.
          </>
        );
      case 'NEW_FOLLOWER':
        return (
          <>
            <strong>{actorUsername}</strong> started following you.
          </>
        );
      default:
        return 'You have a new notification.';
    }
  };

  return (
    <div className="notifications-page-container">
      <h1 className="notifications-page-title">Notifications</h1>
      {loading ? (
        <div className="loading-spinner"></div>
      ) : (
        <div className="notifications-list">
          {notifications.length > 0 ? (
            notifications.map((notification) => (
              
              <Link 
                to={getNotificationLink(notification)}
                key={notification.id} 
                className={`notification-item ${notification.read ? 'read' : 'unread'}`}
                onClick={() => handleNotificationClick(notification)}
              >
                <div className="notification-avatar">
                  <img src={notification.actor.avatarUrl} alt="Actor avatar" />
                </div>
                <div className="notification-content">
                  {renderNotificationText(notification)}
                  <span className="notification-timestamp">
                    {new Date(notification.createdAt).toLocaleString()}
                  </span>
                </div>
              </Link>
            ))
          ) : (
            <p>You have no notifications.</p>
          )}
        </div>
      )}
    </div>
  );
};

export default NotificationsPage;
