import gql from 'graphql-tag';

export const FEED_QUERY = gql`
  query sections($first: Int!, $skip: Int!, $after: String) {
    sections(first: $first, skip: $skip, after: $after) {
      id
      date
      posts {
        id
        name
        slug
        description
        thumbnail
        votesCount
        upvoted
        votes {
          id
        }
        topics {
          id
          name
          slug
        }
      }
    }
  }
`;

export const postsQuery = gql`
  query posts($first: Int!, $skip: Int!) {
    posts(first: $first, skip: $skip) {
      id
      name
      slug
      description
      imageUrl
      topics {
        id
        name
        slug
      }
    }
  }
`;

export const CURRENT_USER_QUERY = gql`
  query {
    me {
      id
      email
      name
      avatar
      followedTopics {
        id
        name
      }
    }
  }
`;
