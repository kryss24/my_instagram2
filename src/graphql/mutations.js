/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const createUser = /* GraphQL */ `
  mutation CreateUser(
    $input: CreateUserInput!
    $condition: ModelUserConditionInput
  ) {
    createUser(input: $input, condition: $condition) {
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
export const updateUser = /* GraphQL */ `
  mutation UpdateUser(
    $input: UpdateUserInput!
    $condition: ModelUserConditionInput
  ) {
    updateUser(input: $input, condition: $condition) {
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
export const deleteUser = /* GraphQL */ `
  mutation DeleteUser(
    $input: DeleteUserInput!
    $condition: ModelUserConditionInput
  ) {
    deleteUser(input: $input, condition: $condition) {
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
export const createPost = /* GraphQL */ `
  mutation CreatePost(
    $input: CreatePostInput!
    $condition: ModelPostConditionInput
  ) {
    createPost(input: $input, condition: $condition) {
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
export const updatePost = /* GraphQL */ `
  mutation UpdatePost(
    $input: UpdatePostInput!
    $condition: ModelPostConditionInput
  ) {
    updatePost(input: $input, condition: $condition) {
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
export const deletePost = /* GraphQL */ `
  mutation DeletePost(
    $input: DeletePostInput!
    $condition: ModelPostConditionInput
  ) {
    deletePost(input: $input, condition: $condition) {
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
export const createLike = /* GraphQL */ `
  mutation CreateLike(
    $input: CreateLikeInput!
    $condition: ModelLikeConditionInput
  ) {
    createLike(input: $input, condition: $condition) {
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
export const updateLike = /* GraphQL */ `
  mutation UpdateLike(
    $input: UpdateLikeInput!
    $condition: ModelLikeConditionInput
  ) {
    updateLike(input: $input, condition: $condition) {
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
export const deleteLike = /* GraphQL */ `
  mutation DeleteLike(
    $input: DeleteLikeInput!
    $condition: ModelLikeConditionInput
  ) {
    deleteLike(input: $input, condition: $condition) {
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
export const createComment = /* GraphQL */ `
  mutation CreateComment(
    $input: CreateCommentInput!
    $condition: ModelCommentConditionInput
  ) {
    createComment(input: $input, condition: $condition) {
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
export const updateComment = /* GraphQL */ `
  mutation UpdateComment(
    $input: UpdateCommentInput!
    $condition: ModelCommentConditionInput
  ) {
    updateComment(input: $input, condition: $condition) {
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
export const deleteComment = /* GraphQL */ `
  mutation DeleteComment(
    $input: DeleteCommentInput!
    $condition: ModelCommentConditionInput
  ) {
    deleteComment(input: $input, condition: $condition) {
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
