import React, { useState, useEffect, useRef } from 'react';
import { useParams } from 'react-router-dom';
import { generateClient } from 'aws-amplify/api';
import { getConversation } from '../../graphql/custom-queries';
import { createMessage } from '../../graphql/mutations';
import { onCreateMessage } from '../../graphql/subscriptions';
import './Conversation.css';

const client = generateClient();

function Conversation({ loggedInUser }) {
  const [conversation, setConversation] = useState(null);
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const [loading, setLoading] = useState(true);
  const { conversationId } = useParams();
  const messagesEndRef = useRef(null);

  useEffect(() => {
    const fetchConversation = async () => {
      try {
        const response = await client.graphql({
          query: getConversation,
          variables: { id: conversationId },
        });
        const conv = response.data.getConversation;
        setConversation(conv);
        setMessages(conv.messages.items);
      } catch (error) {
        console.error('Error fetching conversation:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchConversation();
  }, [conversationId]);

  useEffect(() => {
    const subscription = client.graphql({
        query: onCreateMessage,
        variables: { conversationId: conversationId }
    }).subscribe({
      next: ({ data }) => {
        const newMessage = data.onCreateMessage;
        // Check if the message belongs to the current conversation
        if (newMessage.conversationId === conversationId) {
            setMessages((prevMessages) => [...prevMessages, newMessage]);
        }
      },
      error: (error) => console.warn(error)
    });

    return () => subscription.unsubscribe();
  }, [conversationId]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSendMessage = async (e) => {
    e.preventDefault();
    if (!newMessage.trim()) return;

    try {
      const input = {
        content: newMessage.trim(),
        conversationId: conversationId,
        senderId: loggedInUser.username,
      };
      setNewMessage('');
      await client.graphql({
        query: createMessage,
        variables: { input },
      });
    } catch (error) {
      console.error('Error sending message:', error);
    }
  };
  
  if (loading) return <p>Loading conversation...</p>;
  if (!conversation) return <p>Conversation not found.</p>;

  const otherMember = conversation.members.find(m => m !== loggedInUser.username);

  return (
    <div className="conversation-container">
      <div className="conversation-header">
        <h2>{otherMember}</h2>
      </div>
      <div className="messages-container">
        {messages.map((message) => (
          <div
            key={message.id}
            className={`message-bubble ${message.senderId === loggedInUser.username ? 'sent' : 'received'}`}
          >
            <p>{message.content}</p>
            <span className="message-timestamp">{new Date(message.createdAt).toLocaleTimeString()}</span>
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>
      <form className="message-input-form" onSubmit={handleSendMessage}>
        <input
          type="text"
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          placeholder="Type a message..."
        />
        <button type="submit">Send</button>
      </form>
    </div>
  );
}

export default Conversation;
