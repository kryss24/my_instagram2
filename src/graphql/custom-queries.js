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