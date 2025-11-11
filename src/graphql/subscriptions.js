/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const onCreateUser = /* GraphQL */ `
  subscription OnCreateUser(
    $filter: ModelSubscriptionUserFilterInput
    $owner: String
  ) {
    onCreateUser(filter: $filter, owner: $owner) {
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
export const onUpdateUser = /* GraphQL */ `
  subscription OnUpdateUser(
    $filter: ModelSubscriptionUserFilterInput
    $owner: String
  ) {
    onUpdateUser(filter: $filter, owner: $owner) {
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
export const onDeleteUser = /* GraphQL */ `
  subscription OnDeleteUser(
    $filter: ModelSubscriptionUserFilterInput
    $owner: String
  ) {
    onDeleteUser(filter: $filter, owner: $owner) {
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
export const onCreatePost = /* GraphQL */ `
  subscription OnCreatePost(
    $filter: ModelSubscriptionPostFilterInput
    $owner: String
  ) {
    onCreatePost(filter: $filter, owner: $owner) {
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
export const onUpdatePost = /* GraphQL */ `
  subscription OnUpdatePost(
    $filter: ModelSubscriptionPostFilterInput
    $owner: String
  ) {
    onUpdatePost(filter: $filter, owner: $owner) {
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
export const onDeletePost = /* GraphQL */ `
  subscription OnDeletePost(
    $filter: ModelSubscriptionPostFilterInput
    $owner: String
  ) {
    onDeletePost(filter: $filter, owner: $owner) {
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
export const onCreateLike = /* GraphQL */ `
  subscription OnCreateLike(
    $filter: ModelSubscriptionLikeFilterInput
    $owner: String
  ) {
    onCreateLike(filter: $filter, owner: $owner) {
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
export const onUpdateLike = /* GraphQL */ `
  subscription OnUpdateLike(
    $filter: ModelSubscriptionLikeFilterInput
    $owner: String
  ) {
    onUpdateLike(filter: $filter, owner: $owner) {
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
export const onDeleteLike = /* GraphQL */ `
  subscription OnDeleteLike(
    $filter: ModelSubscriptionLikeFilterInput
    $owner: String
  ) {
    onDeleteLike(filter: $filter, owner: $owner) {
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
export const onCreateComment = /* GraphQL */ `
  subscription OnCreateComment(
    $filter: ModelSubscriptionCommentFilterInput
    $owner: String
  ) {
    onCreateComment(filter: $filter, owner: $owner) {
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
export const onUpdateComment = /* GraphQL */ `
  subscription OnUpdateComment(
    $filter: ModelSubscriptionCommentFilterInput
    $owner: String
  ) {
    onUpdateComment(filter: $filter, owner: $owner) {
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
export const onDeleteComment = /* GraphQL */ `
  subscription OnDeleteComment(
    $filter: ModelSubscriptionCommentFilterInput
    $owner: String
  ) {
    onDeleteComment(filter: $filter, owner: $owner) {
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
