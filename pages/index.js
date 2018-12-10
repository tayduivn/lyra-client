import React from 'react';
import cookie from 'cookie';
import { ApolloConsumer } from 'react-apollo';
import App from '../components/App';
import Header from '../components/Header';
import Submit from '../components/Submit';
import PostList from '../components/PostList';
import ProductCard from '../components/product-card';
import { Query } from 'react-apollo';
import gql from 'graphql-tag';
import checkLoggedIn from '../lib/checkLoggedIn';

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

export default class Index extends React.Component {
  static async getInitialProps(context, apolloClient) {
    // const { loggedInUser } = await checkLoggedIn(context.apolloClient);
    // if (!loggedInUser.user) {
    //   // If not signed in, send them somewhere more useful
    //   redirect(context, '/signin')
    // }
    return {};
  }

  // signout = apolloClient => () => {
  //   document.cookie = cookie.serialize('token', '', {
  //     maxAge: -1 // Expire the cookie immediately
  //   });

  //   // Force a reload of all the current queries now that the user is
  //   // logged in, so we don't accidentally leave any state around.
  //   apolloClient.cache.reset().then(() => {
  //     // Redirect to a more useful page when signed out
  //     redirect({}, '/signin');
  //   });
  // };

  render() {
    return (
      <Query query={productsQuery} variables={productsQueryVars}>
        {({ loading, error, data: { products, _productsMeta }, fetchMore }) => {
          if (loading) return <div>Loading</div>;

          // console.log(error);
          // console.log('products', products);
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
          // return <pre>{products.toString()}</pre>;
        }}
      </Query>
      // <ApolloConsumer>
      //   {client => (
      //     <div>
      //       {/* Hello {this.props.loggedInUser.user.name}!<br /> */}
      //       <button onClick={this.signout(client)}>Sign out</button>
      //     </div>
      //   )}
      // </ApolloConsumer>
    );
  }
}

// const Home = props => (
//   <App>
//     {props.name}
// {
/* <Query query={productsQuery} variables={productsQueryVars}>
      {({loading, error, data: {products, _productsMeta}, fetchMore}) => {
        if (loading) return <div>Loading</div>;
        // console.log(error);
        // console.log('products', products);
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
    </Query> */
// }
//   </App>
// );

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

// export default Home;
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

// import React from 'react';
// import cookie from 'cookie';
// import {ApolloConsumer} from 'react-apollo';

// import redirect from '../lib/redirect';
// import checkLoggedIn from '../lib/checkLoggedIn';

// export default class Index extends React.Component {
//   static async getInitialProps(context, apolloClient) {
//     const {loggedInUser} = await checkLoggedIn(context.apolloClient);

//     if (!loggedInUser.user) {
//       // If not signed in, send them somewhere more useful
//       redirect(context, '/signin');
//     }

//     return {loggedInUser};
//   }

//   signout = apolloClient => () => {
//     document.cookie = cookie.serialize('token', '', {
//       maxAge: -1 // Expire the cookie immediately
//     });

//     // Force a reload of all the current queries now that the user is
//     // logged in, so we don't accidentally leave any state around.
//     apolloClient.cache.reset().then(() => {
//       // Redirect to a more useful page when signed out
//       redirect({}, '/signin');
//     });
//   };

//   render() {
//     return (
//       <ApolloConsumer>
//         {client => (
//           <div>
//             {/* Hello {this.props.loggedInUser.user.name}!<br /> */}
//             <button onClick={this.signout(client)}>Sign out</button>
//           </div>
//         )}
//       </ApolloConsumer>
//     );
//   }
// }
