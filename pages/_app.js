import 'normalize.css';
import App, {Container} from 'next/app';
import Page from '../components/Page';
import withApolloClient from '../lib/with-apollo-client';
import {ApolloProvider} from 'react-apollo';
import Auth from '../lib/auth/auth';

class MyApp extends App {
  componentDidMount() {
    // const isClient = typeof window !== 'undefined';
    // if (isClient) {
    //   debugger;
    // }
  }

  render() {
    // const isClient = typeof window !== 'undefined';
    // if (isClient) {
    //   debugger;
    // }
    const auth = new Auth(result => console.log('auth result', result), this.props.apolloClient);
    console.log('component did mount!', auth);
    const {Component, pageProps, apolloClient} = this.props;
    return (
      <Container>
        <ApolloProvider client={apolloClient}>
          <Page auth={auth}>
            <Component {...pageProps} name="coolguy" />
          </Page>
        </ApolloProvider>
      </Container>
    );
  }
}

export default withApolloClient(MyApp);
