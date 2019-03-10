import gql from 'graphql-tag';

// eslint-disable-next-line
export const UPDATE_FOLLOWED_TOPIC = gql`
  mutation updateFollowedTopic(
    $userId: ID!
    $topicId: ID!
    $following: Boolean!
  ) {
    updateFollowedTopic(
      userId: $userId
      topicId: $topicId
      following: $following
    ) {
      id
    }
  }
`;
