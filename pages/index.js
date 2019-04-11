/* eslint class-methods-use-this: 0 */ // --> OFF
import React from 'react';
import styled from '@emotion/styled';
import ConnectedFeed from '../containers/feed/connected-feed';
import { Container, Main, Aside } from '../shared/library/components/layout';

export const postsQueryVars = {
  first: 5,
  skip: 0
};

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
        </Main>
        <Aside>Side Panel</Aside>
      </Container>
    );
  }
}
