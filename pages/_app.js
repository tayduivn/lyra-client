import App, { Container } from 'next/app';
import React from 'react';
import { ApolloProvider } from 'react-apollo';
import withApollo from '../lib/with-apollo-old';
// import withApolloClient from '../lib/with-apollo-client';
import Page from '../components/Page';

class MyApp extends App {
  // static async getInitialProps({ Component, ctx }) {
  static async getInitialProps(ctx) {
    // console.log('ctxbro', ctx);s
    // console.log()
    // let pageProps = {};
    // if (Component.getInitialProps) {
    //   pageProps = await Component.getInitialProps(ctx);
    // }
    // // this exposes the query to the user
    // pageProps.query = ctx.query;
    // return { pageProps };
  }
  render() {
    const { Component, pageProps, apolloClient } = this.props;
    return (
      <Container>
        <ApolloProvider client={apolloClient}>
          <Page>
            <Component {...pageProps} client={apolloClient} />
          </Page>
        </ApolloProvider>
      </Container>
    );
  }
}

export default withApollo(MyApp);
