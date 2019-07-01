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

export const CREATE_POST = gql`
  mutation createPost(
    $link: String
    $name: String
    $tagline: String
    $description: String
    $thumbnail: String
    $topics: [String]
    $galleryThumbs: [String]
  ) {
    createPost(
      link: $link
      name: $name
      tagline: $tagline
      description: $description
      thumbnail: $thumbnail
      topics: $topics
      galleryThumbs: $galleryThumbs
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

export const SIGN_UPLOAD = gql`
  mutation signUpload($fileName: String, $fileType: String) {
    signUpload(fileName: $fileName, fileType: $fileType) {
      signedRequest
      url
    }
  }
`;
