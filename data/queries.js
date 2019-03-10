import gql from 'graphql-tag';

export const productsQuery = gql`
  query products($first: Int!, $skip: Int!) {
    products(first: $first, skip: $skip) {
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
