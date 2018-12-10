import withApollo from 'next-with-apollo';
import ApolloClient from 'apollo-boost';
import { endpoint, prodEndpoint } from '../config';
// import { LOCAL_STATE_QUERY } from '../components/Cart';

function createClient({ headers }) {
  const client = new ApolloClient(
    {
      // uri: process.env.NODE_ENV === 'development' ? endpoint : prodEndpoint,
      uri: 'http://localhost:4000',
      ssrMode: true,
      request: operation => {
        operation.setContext({
          fetchOptions: {
            credentials: 'include'
          },
          headers
        });
      }
    },
    {
      getDataFromTree: 'ssr'
    }
  );
  console.log('client', client);
  return client;
}

export default withApollo(createClient);
