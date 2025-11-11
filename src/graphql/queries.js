/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const getUser = /* GraphQL */ `
  query GetUser($username: String!) {
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
        nextToken
        __typename
      }
      likes {
        nextToken
        __typename
      }
      comments {
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
export const listUsers = /* GraphQL */ `
  query ListUsers(
    $username: String
    $filter: ModelUserFilterInput
    $limit: Int
    $nextToken: String
    $sortDirection: ModelSortDirection
  ) {
    listUsers(
      username: $username
      filter: $filter
      limit: $limit
      nextToken: $nextToken
      sortDirection: $sortDirection
    ) {
      items {
        id
        username
        preferred_username
        email
        phone_number
        gender
        bio
        avatar
        accountType
        createdAt
        updatedAt
        owner
        __typename
      }
      nextToken
      __typename
    }
  }
`;
export const getPost = /* GraphQL */ `
  query GetPost($id: ID!) {
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
      userId
      user {
        id
        username
        preferred_username
        email
        phone_number
        gender
        bio
        avatar
        accountType
        createdAt
        updatedAt
        owner
        __typename
      }
      likes {
        nextToken
        __typename
      }
      comments {
        nextToken
        __typename
      }
      createdAt
      updatedAt
      owner
      userPostsUsername
      __typename
    }
  }
`;
export const listPosts = /* GraphQL */ `
  query ListPosts(
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
        userId
        createdAt
        updatedAt
        owner
        userPostsUsername
        __typename
      }
      nextToken
      __typename
    }
  }
`;
export const getLike = /* GraphQL */ `
  query GetLike($id: ID!) {
    getLike(id: $id) {
      id
      postId
      userId
      post {
        id
        content
        image
        video
        audio
        location
        tags
        hashtags
        mentions
        userId
        createdAt
        updatedAt
        owner
        userPostsUsername
        __typename
      }
      user {
        id
        username
        preferred_username
        email
        phone_number
        gender
        bio
        avatar
        accountType
        createdAt
        updatedAt
        owner
        __typename
      }
      createdAt
      owner
      updatedAt
      userLikesUsername
      postLikesId
      __typename
    }
  }
`;
export const listLikes = /* GraphQL */ `
  query ListLikes(
    $filter: ModelLikeFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listLikes(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        postId
        userId
        createdAt
        owner
        updatedAt
        userLikesUsername
        postLikesId
        __typename
      }
      nextToken
      __typename
    }
  }
`;
export const getComment = /* GraphQL */ `
  query GetComment($id: ID!) {
    getComment(id: $id) {
      id
      postId
      userId
      content
      post {
        id
        content
        image
        video
        audio
        location
        tags
        hashtags
        mentions
        userId
        createdAt
        updatedAt
        owner
        userPostsUsername
        __typename
      }
      user {
        id
        username
        preferred_username
        email
        phone_number
        gender
        bio
        avatar
        accountType
        createdAt
        updatedAt
        owner
        __typename
      }
      createdAt
      updatedAt
      owner
      userCommentsUsername
      postCommentsId
      __typename
    }
  }
`;
export const listComments = /* GraphQL */ `
  query ListComments(
    $filter: ModelCommentFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listComments(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        postId
        userId
        content
        createdAt
        updatedAt
        owner
        userCommentsUsername
        postCommentsId
        __typename
      }
      nextToken
      __typename
    }
  }
`;
export const likesByPostId = /* GraphQL */ `
  query LikesByPostId(
    $postId: ID!
    $sortDirection: ModelSortDirection
    $filter: ModelLikeFilterInput
    $limit: Int
    $nextToken: String
  ) {
    likesByPostId(
      postId: $postId
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        id
        postId
        userId
        createdAt
        owner
        updatedAt
        userLikesUsername
        postLikesId
        __typename
      }
      nextToken
      __typename
    }
  }
`;
export const likesByUserId = /* GraphQL */ `
  query LikesByUserId(
    $userId: String!
    $sortDirection: ModelSortDirection
    $filter: ModelLikeFilterInput
    $limit: Int
    $nextToken: String
  ) {
    likesByUserId(
      userId: $userId
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        id
        postId
        userId
        createdAt
        owner
        updatedAt
        userLikesUsername
        postLikesId
        __typename
      }
      nextToken
      __typename
    }
  }
`;
export const commentsByPostId = /* GraphQL */ `
  query CommentsByPostId(
    $postId: ID!
    $sortDirection: ModelSortDirection
    $filter: ModelCommentFilterInput
    $limit: Int
    $nextToken: String
  ) {
    commentsByPostId(
      postId: $postId
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        id
        postId
        userId
        content
        createdAt
        updatedAt
        owner
        userCommentsUsername
        postCommentsId
        __typename
      }
      nextToken
      __typename
    }
  }
`;
export const commentsByUserId = /* GraphQL */ `
  query CommentsByUserId(
    $userId: String!
    $sortDirection: ModelSortDirection
    $filter: ModelCommentFilterInput
    $limit: Int
    $nextToken: String
  ) {
    commentsByUserId(
      userId: $userId
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        id
        postId
        userId
        content
        createdAt
        updatedAt
        owner
        userCommentsUsername
        postCommentsId
        __typename
      }
      nextToken
      __typename
    }
  }
`;
