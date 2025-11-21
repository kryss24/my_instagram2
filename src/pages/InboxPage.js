import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { generateClient } from 'aws-amplify/api';
import { getCurrentUser } from '@aws-amplify/auth';
import { listConversationsByMember } from '../graphql/custom-queries';
import '../styles/InboxPage.css';

const client = generateClient();

const InboxPage = () => {
  const [conversations, setConversations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentUser, setCurrentUser] = useState(null);

  useEffect(() => {
    const fetchConversations = async () => {
      try {
        const cognitoUser = await getCurrentUser();
        setCurrentUser(cognitoUser);

        const response = await client.graphql({
          query: listConversationsByMember,
          variables: {
            filter: {
              members: { contains: cognitoUser.username }
            }
          }
        });
        
        // Sort conversations by the latest message's createdAt or conversation's updatedAt
        const sortedConversations = response.data.listConversations.items.sort((a, b) => {
          const aLastMessageTime = a.messages?.items[0]?.createdAt || a.createdAt;
          const bLastMessageTime = b.messages?.items[0]?.createdAt || b.createdAt;
          return new Date(bLastMessageTime) - new Date(aLastMessageTime);
        });

        setConversations(sortedConversations);
      } catch (error) {
        console.error('Error fetching conversations:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchConversations();
  }, []);

  const getOtherMember = (members) => {
    if (!currentUser) return '';
    return members.find(member => member !== currentUser.username);
  };

  return (
    <div className="inbox-page-container">
      <h1 className="inbox-page-title">Inbox</h1>
      {loading ? (
        <div className="loading-spinner"></div>
      ) : (
        <div className="conversations-list">
          {conversations.length > 0 ? (
            conversations.map(conversation => {
              const otherMember = getOtherMember(conversation.members);
              const lastMessage = conversation.messages?.items[0];
              return (
                <Link to={`/inbox/${conversation.id}`} key={conversation.id} className="conversation-item">
                  <div className="conversation-avatar">
                    {/* Placeholder for other member's avatar */}
                    {(otherMember?.[0] || '?').toUpperCase()}
                  </div>
                  <div className="conversation-info">
                    <div className="conversation-header">
                      <span className="conversation-member">{otherMember}</span>
                      {lastMessage && (
                        <span className="conversation-timestamp">
                          {new Date(lastMessage.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                        </span>
                      )}
                    </div>
                    {lastMessage ? (
                      <p className="conversation-last-message">{lastMessage.content}</p>
                    ) : (
                      <p className="conversation-last-message">No messages yet.</p>
                    )}
                  </div>
                </Link>
              );
            })
          ) : (
            <p>You have no conversations yet.</p>
          )}
        </div>
      )}
    </div>
  );
};

export default InboxPage;
