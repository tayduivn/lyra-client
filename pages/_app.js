import App, {Container} from 'next/app';
import Page from '../components/Page';
import withApolloClient from '../lib/with-apollo-client';
import {ApolloProvider} from 'react-apollo';

class MyApp extends App {
  render() {
    const {Component, pageProps, apolloClient} = this.props;
    return (
      <Container>
        <ApolloProvider client={apolloClient}>
          <Page>
            <Component {...pageProps} />
          </Page>
        </ApolloProvider>
      </Container>
    );
  }
}

export default withApolloClient(MyApp);
