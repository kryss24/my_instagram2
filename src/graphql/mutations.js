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
export const createFollow = /* GraphQL */ `
  mutation CreateFollow(
    $input: CreateFollowInput!
    $condition: ModelFollowConditionInput
  ) {
    createFollow(input: $input, condition: $condition) {
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
export const updateFollow = /* GraphQL */ `
  mutation UpdateFollow(
    $input: UpdateFollowInput!
    $condition: ModelFollowConditionInput
  ) {
    updateFollow(input: $input, condition: $condition) {
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
export const deleteFollow = /* GraphQL */ `
  mutation DeleteFollow(
    $input: DeleteFollowInput!
    $condition: ModelFollowConditionInput
  ) {
    deleteFollow(input: $input, condition: $condition) {
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
export const createNotification = /* GraphQL */ `
  mutation CreateNotification(
    $input: CreateNotificationInput!
    $condition: ModelNotificationConditionInput
  ) {
    createNotification(input: $input, condition: $condition) {
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
export const createNotificationLite = /* GraphQL */ `
  mutation CreateNotification(
    $input: CreateNotificationInput!
  ) {
    createNotification(input: $input) {
      id
      userId
      type
      actorId
      postId
      read
      createdAt
    }
  }
`;

export const updateNotification = /* GraphQL */ `
  mutation UpdateNotification(
    $input: UpdateNotificationInput!
    $condition: ModelNotificationConditionInput
  ) {
    updateNotification(input: $input, condition: $condition) {
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
export const markNotificationRead = /* GraphQL */ `
  mutation MarkNotificationRead($id: ID!) {
    updateNotification(input: { id: $id, read: true }) {
      id
      read
    }
  }
`;

export const deleteNotification = /* GraphQL */ `
  mutation DeleteNotification(
    $input: DeleteNotificationInput!
    $condition: ModelNotificationConditionInput
  ) {
    deleteNotification(input: $input, condition: $condition) {
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
export const createConversation = /* GraphQL */ `
  mutation CreateConversation(
    $input: CreateConversationInput!
    $condition: ModelConversationConditionInput
  ) {
    createConversation(input: $input, condition: $condition) {
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
export const updateConversation = /* GraphQL */ `
  mutation UpdateConversation(
    $input: UpdateConversationInput!
    $condition: ModelConversationConditionInput
  ) {
    updateConversation(input: $input, condition: $condition) {
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
export const deleteConversation = /* GraphQL */ `
  mutation DeleteConversation(
    $input: DeleteConversationInput!
    $condition: ModelConversationConditionInput
  ) {
    deleteConversation(input: $input, condition: $condition) {
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
export const createMessage = /* GraphQL */ `
  mutation CreateMessage(
    $input: CreateMessageInput!
    $condition: ModelMessageConditionInput
  ) {
    createMessage(input: $input, condition: $condition) {
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
export const updateMessage = /* GraphQL */ `
  mutation UpdateMessage(
    $input: UpdateMessageInput!
    $condition: ModelMessageConditionInput
  ) {
    updateMessage(input: $input, condition: $condition) {
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
export const deleteMessage = /* GraphQL */ `
  mutation DeleteMessage(
    $input: DeleteMessageInput!
    $condition: ModelMessageConditionInput
  ) {
    deleteMessage(input: $input, condition: $condition) {
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
