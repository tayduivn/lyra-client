/* eslint class-methods-use-this: 0 */ // --> OFF
import React from 'react';
import gql from 'graphql-tag';
import { Query } from 'react-apollo';
import styled from '@emotion/styled';
import ProductCard from '../components/product-card';
import ProductList from '../components/product-list';
import ConnectedFeed from '../containers/feed/connected-feed';

export const postsQueryVars = {
  first: 5,
  skip: 0
};

const MAX_WIDTH = 1100;
const MIN_WIDTH = 320;

const Container = styled('div')({
  margin: 'auto',
  maxWidth: MAX_WIDTH,
  minWidth: MIN_WIDTH,
  display: 'flex'
});

const Main = styled('main')({
  flex: 1,
  padding: 15
});

const Aside = styled('aside')({
  [`@media only screen and (max-width: ${MAX_WIDTH}px)`]: {
    display: 'none'
  },
  width: 330
});

export default class Index extends React.Component {
  static async getInitialProps(context, apolloClient) {
    return {};
  }

  render() {
    return (
      <Container>
        <Main>
          main panel
          <ConnectedFeed />
          {/* <Query query={postsQuery} variables={postsQueryVars}>
            {({
              loading,
              error,
              data: { posts, _productsMeta },
              fetchMore
            }) => {
              if (loading) return <div>Loading</div>;
              return (
                <div>
                  <a
                    onClick={() =>
                      fetchMore({
                        variables: {
                          skip: posts.length,
                          first: 5
                        },
                        updateQuery: (prev, { fetchMoreResult }) => {
                          if (!fetchMoreResult) return prev;
                          return Object.assign({}, prev, {
                            posts: [...prev.posts, ...fetchMoreResult.posts]
                          });
                        }
                      })
                    }
                  >
                    Load More
                  </a>
                </div>
              );
            }}
          </Query> */}
        </Main>
        <Aside>Side Panel</Aside>
      </Container>
    );
  }
}
