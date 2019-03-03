import gql from 'graphql-tag';

export const followTopic = gql`
  mutation followTopic($userId: ID!, $topicId: ID!) {
    followTopic(userId: $userId, topicId: $topicId) {
      id
    }
  }
`;
