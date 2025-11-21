import React from 'react';
import Conversation from '../components/Conversation/Conversation';

const ConversationPage = ({ user }) => {
  return <Conversation loggedInUser={user} />;
};

export default ConversationPage;
