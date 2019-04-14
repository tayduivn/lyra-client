import gql from 'graphql-tag';

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

export const VOTE = gql`
  mutation vote($postId: ID!) {
    vote(postId: $postId) {
      id
    }
  }
`;

export const MINT_TOKENS = gql`
  mutation mintTokens($amount: Int!) {
    mintTokens(amount: $amount) {
      hash
    }
  }
`;
