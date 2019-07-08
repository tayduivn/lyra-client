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
        tagline
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

export const POST_QUERY = gql`
  query post($slug: String!) {
    post(slug: $slug) {
      id
      name
      slug
      description
      tagline
      thumbnail
      votesCount
      upvoted
      link
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
`;

export const TOPICS_QUERY = gql`
  query topics {
    topics {
      id
      name
      slug
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
