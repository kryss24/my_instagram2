import { graphql } from 'aws-amplify/api';

// Requête pour obtenir les posts avec les informations de l'utilisateur
export const listPostsWithUser = /* GraphQL */ `
  query ListPostsWithUser(
    $filter: ModelPostFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listPosts(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        content
        image
        video
        audio
        location
        tags
        hashtags
        mentions
        createdAt
        updatedAt
        owner
        user {
          id
          username
          preferred_username
          email
          avatar
          accountType
        }
      }
      nextToken
    }
  }
`;

// Requête pour obtenir un post spécifique avec les informations de l'utilisateur
export const getPostWithUser = /* GraphQL */ `
  query GetPostWithUser($id: ID!) {
    getPost(id: $id) {
      id
      content
      image
      video
      audio
      location
      tags
      hashtags
      mentions
      createdAt
      updatedAt
      owner
      user {
        id
        username
        email
        avatar
        accountType
      }
    }
  }
`;

export const getUserWithFollows = /* GraphQL */ `
  query GetUserWithFollows($username: String!) {
    getUser(username: $username) {
      id
      username
      preferred_username
      email
      phone_number
      gender
      bio
      avatar
      accountType
      posts {
        items {
          id
          content
          createdAt
        }
        nextToken
        __typename
      }
      likes {
        items {
          id
        }
        nextToken
        __typename
      }
      comments {
        items {
          id
        }
        nextToken
        __typename
      }
      following {
        items {
          id
          followedId
          followed {
            id
            username
            avatar
          }
        }
        nextToken
        __typename
      }
      followers {
        items {
          id
          follower {
            id
            username
            avatar
          }
        }
        nextToken
        __typename
      }
      createdAt
      updatedAt
      owner
      __typename
    }
  }
`;

export const getConversation = /* GraphQL */ `
  query GetConversation($id: ID!) {
    getConversation(id: $id) {
      id
      members
      messages(sortDirection: ASC) { # Fetch messages sorted by creation time
        items {
          id
          content
          senderId
          createdAt
          sender { # Fetch sender details
            id
            username
            preferred_username
            avatar
          }
        }
      }
      createdAt
      updatedAt
    }
  }
`;

export const listConversationsByMember = /* GraphQL */ `
  query ListConversationsByMember(
    $filter: ModelConversationFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listConversations(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        members
        createdAt
        updatedAt
        messages(limit: 1, sortDirection: DESC) { # Fetch only the last message
          items {
            id
            content
            senderId
            createdAt
            sender {
              id
              username
              preferred_username
              avatar
            }
          }
        }
      }
      nextToken
    }
  }
`;