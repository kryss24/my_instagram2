/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const searchUsers = /* GraphQL */ `
  query SearchUsers($query: String!) {
    searchUsers(query: $query) {
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
      following {
        nextToken
        __typename
      }
      followers {
        nextToken
        __typename
      }
      notifications {
        nextToken
        __typename
      }
      messages {
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
      following {
        nextToken
        __typename
      }
      followers {
        nextToken
        __typename
      }
      notifications {
        nextToken
        __typename
      }
      messages {
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
      isPublic
      likes {
        nextToken
        __typename
      }
      comments {
        nextToken
        __typename
      }
      notifications {
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
        isPublic
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
        isPublic
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
        isPublic
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
export const getFollow = /* GraphQL */ `
  query GetFollow($id: ID!) {
    getFollow(id: $id) {
      id
      followerId
      followedId
      follower {
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
      followed {
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
      __typename
    }
  }
`;
export const listFollows = /* GraphQL */ `
  query ListFollows(
    $filter: ModelFollowFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listFollows(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        followerId
        followedId
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
export const getNotification = /* GraphQL */ `
  query GetNotification($id: ID!) {
    getNotification(id: $id) {
      id
      userId
      type
      actorId
      actor {
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
      postId
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
        isPublic
        createdAt
        updatedAt
        owner
        userPostsUsername
        __typename
      }
      read
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const listNotifications = /* GraphQL */ `
  query ListNotifications(
    $filter: ModelNotificationFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listNotifications(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        userId
        type
        actorId
        postId
        read
        createdAt
        updatedAt
        __typename
      }
      nextToken
      __typename
    }
  }
`;
export const getConversation = /* GraphQL */ `
  query GetConversation($id: ID!) {
    getConversation(id: $id) {
      id
      members
      messages {
        nextToken
        __typename
      }
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const listConversations = /* GraphQL */ `
  query ListConversations(
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
        __typename
      }
      nextToken
      __typename
    }
  }
`;
export const getMessage = /* GraphQL */ `
  query GetMessage($id: ID!) {
    getMessage(id: $id) {
      id
      conversationId
      senderId
      sender {
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
      content
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const listMessages = /* GraphQL */ `
  query ListMessages(
    $filter: ModelMessageFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listMessages(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        conversationId
        senderId
        content
        createdAt
        updatedAt
        __typename
      }
      nextToken
      __typename
    }
  }
`;
export const postsByUserIdAndCreatedAt = /* GraphQL */ `
  query PostsByUserIdAndCreatedAt(
    $userId: String!
    $createdAt: ModelStringKeyConditionInput
    $sortDirection: ModelSortDirection
    $filter: ModelPostFilterInput
    $limit: Int
    $nextToken: String
  ) {
    postsByUserIdAndCreatedAt(
      userId: $userId
      createdAt: $createdAt
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
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
        isPublic
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
export const followsByFollowerIdAndFollowedId = /* GraphQL */ `
  query FollowsByFollowerIdAndFollowedId(
    $followerId: String!
    $followedId: ModelStringKeyConditionInput
    $sortDirection: ModelSortDirection
    $filter: ModelFollowFilterInput
    $limit: Int
    $nextToken: String
  ) {
    followsByFollowerIdAndFollowedId(
      followerId: $followerId
      followedId: $followedId
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        id
        followerId
        followedId
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
export const followsByFollowedIdAndFollowerId = /* GraphQL */ `
  query FollowsByFollowedIdAndFollowerId(
    $followedId: String!
    $followerId: ModelStringKeyConditionInput
    $sortDirection: ModelSortDirection
    $filter: ModelFollowFilterInput
    $limit: Int
    $nextToken: String
  ) {
    followsByFollowedIdAndFollowerId(
      followedId: $followedId
      followerId: $followerId
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        id
        followerId
        followedId
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
export const notificationsByUserIdAndCreatedAt = /* GraphQL */ `
  query NotificationsByUserIdAndCreatedAt(
    $userId: String!
    $createdAt: ModelStringKeyConditionInput
    $sortDirection: ModelSortDirection
    $filter: ModelNotificationFilterInput
    $limit: Int
    $nextToken: String
  ) {
    notificationsByUserIdAndCreatedAt(
      userId: $userId
      createdAt: $createdAt
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        id
        userId
        type
        actorId
        postId
        read
        createdAt
        updatedAt
        __typename
      }
      nextToken
      __typename
    }
  }
`;
export const notificationsByPostIdAndCreatedAt = /* GraphQL */ `
  query NotificationsByPostIdAndCreatedAt(
    $postId: ID!
    $createdAt: ModelStringKeyConditionInput
    $sortDirection: ModelSortDirection
    $filter: ModelNotificationFilterInput
    $limit: Int
    $nextToken: String
  ) {
    notificationsByPostIdAndCreatedAt(
      postId: $postId
      createdAt: $createdAt
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        id
        userId
        type
        actorId
        postId
        read
        createdAt
        updatedAt
        __typename
      }
      nextToken
      __typename
    }
  }
`;
export const messagesByConversationIdAndCreatedAt = /* GraphQL */ `
  query MessagesByConversationIdAndCreatedAt(
    $conversationId: ID!
    $createdAt: ModelStringKeyConditionInput
    $sortDirection: ModelSortDirection
    $filter: ModelMessageFilterInput
    $limit: Int
    $nextToken: String
  ) {
    messagesByConversationIdAndCreatedAt(
      conversationId: $conversationId
      createdAt: $createdAt
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        id
        conversationId
        senderId
        content
        createdAt
        updatedAt
        __typename
      }
      nextToken
      __typename
    }
  }
`;
export const messagesBySenderIdAndCreatedAt = /* GraphQL */ `
  query MessagesBySenderIdAndCreatedAt(
    $senderId: String!
    $createdAt: ModelStringKeyConditionInput
    $sortDirection: ModelSortDirection
    $filter: ModelMessageFilterInput
    $limit: Int
    $nextToken: String
  ) {
    messagesBySenderIdAndCreatedAt(
      senderId: $senderId
      createdAt: $createdAt
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        id
        conversationId
        senderId
        content
        createdAt
        updatedAt
        __typename
      }
      nextToken
      __typename
    }
  }
`;
