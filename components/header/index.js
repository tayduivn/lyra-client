import React, { Component } from 'react';
import styled from '@emotion/styled';
import Link from 'next/link';
import { withRouter } from 'next/router';
import { compose } from 'react-apollo';
import { withTheme } from 'emotion-theming';
import User from '../user.jsx';
import Logo from './logo';
import Avatar from './avatar';

const Wrapper = styled('div')(({ theme: { COLORS: { WHITE, LILAC } } }) => ({
  backgroundColor: WHITE,
  borderBottom: `1px solid ${LILAC}`,
  boxShadow: '0 1px 1px 0 rgba(0,0,0,.05)'
}));

const Container = styled.div`
  max-width: 1100px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 13px 10px 13px 10px;
  margin: auto;
`;

const Header = ({ router: { pathname } }) => (
  <Wrapper>
    <Container>
      <Logo />
      <User>
        {({ data: { me } }) => (
          <React.Fragment>{me && <Avatar avatar={me.avatar} />}</React.Fragment>
        )}
      </User>
    </Container>
  </Wrapper>
);

export default compose(
  withTheme,
  withRouter
)(Header);

// export default withTheme(Header);

// export default withRouter(Header);
