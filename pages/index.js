/* eslint class-methods-use-this: 0 */ // --> OFF
import React from 'react';
import gql from 'graphql-tag';
import { Query } from 'react-apollo';
import styled from '@emotion/styled';
import ProductCard from '../components/product-card';

const productsQuery = gql`
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

export const productsQueryVars = {
  first: 5,
  skip: 0
};

const Container = styled('div')({
  margin: 'auto',
  maxWidth: 1100,
  minWidth: 320,
  display: 'flex'
});

const Main = styled('main')({
  flex: 1
});

const Aside = styled('aside')({
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
          <Query query={productsQuery} variables={productsQueryVars}>
            {({
              loading,
              error,
              data: { products, _productsMeta },
              fetchMore
            }) => {
              // if (error) return <div>error</div>;
              if (loading) return <div>Loading</div>;
              return (
                <div>
                  {/* <pre>{products.toString()}</pre> */}
                  {products.map(product => {
                    return (
                      <ProductCard
                        key={product.id}
                        name={product.name}
                        description={product.description}
                        imageUrl={product.imageUrl}
                        tags={product.topics}
                      />
                    );
                  })}
                  <a
                    onClick={() =>
                      fetchMore({
                        variables: {
                          skip: products.length,
                          first: 5
                        },
                        updateQuery: (prev, { fetchMoreResult }) => {
                          if (!fetchMoreResult) return prev;
                          return Object.assign({}, prev, {
                            products: [
                              ...prev.products,
                              ...fetchMoreResult.products
                            ]
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
          </Query>
        </Main>
        <Aside>Side Panel</Aside>
      </Container>
    );
  }
}
