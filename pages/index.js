import React from 'react';
import App from '../components/App';
import Header from '../components/Header';
import Submit from '../components/Submit';
import PostList from '../components/PostList';
import ProductCard from '../components/product-card';
import {Query} from 'react-apollo';
import gql from 'graphql-tag';

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

const Home = props => (
  <App>
    {props.name}
    <Query query={productsQuery} variables={productsQueryVars}>
      {({loading, error, data: {products, _productsMeta}, fetchMore}) => {
        if (loading) return <div>Loading</div>;
        // console.log(error);
        console.log('products', products);
        return (
          <div>
            <pre>{products.toString()}</pre>
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
                  updateQuery: (prev, {fetchMoreResult}) => {
                    if (!fetchMoreResult) return prev;
                    return Object.assign({}, prev, {
                      products: [...prev.products, ...fetchMoreResult.products]
                    });
                  }
                })
              }
            >
              Load More
            </a>
          </div>
        );
        // return <pre>{products.toString()}</pre>;
      }}
    </Query>
  </App>
);

const FEED_QUERY = gql`
  query Feed($type: FeedType!, $offset: Int, $limit: Int) {
    currentUser {
      login
    }
    feed(type: $type, offset: $offset, limit: $limit) {
      id
      # ...
    }
  }
`;

export default Home;
//
// const FeedData = ({ match }) => (
//   <Query
//     query={FEED_QUERY}
//     variables={{
//       type: match.params.type.toUpperCase() || "TOP",
//       offset: 0,
//       limit: 10
//     }}
//     fetchPolicy="cache-and-network"
//   >
//     {({ data, fetchMore }) => (
//       <Feed
//         entries={data.feed || []}
//         onLoadMore={() =>
//           fetchMore({
//             variables: {
//               offset: data.feed.length
//             },
//             updateQuery: (prev, { fetchMoreResult }) => {
//               if (!fetchMoreResult) return prev;
//               return Object.assign({}, prev, {
//                 feed: [...prev.feed, ...fetchMoreResult.feed]
//               });
//             }
//           })
//         }
//       />
//     )}
//   </Query>
// );
