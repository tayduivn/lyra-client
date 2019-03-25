import React from 'react';
import styled from '@emotion/styled';
import { withRouter } from 'next/router';
import { compose } from 'react-apollo';
import { withTheme } from 'emotion-theming';
import { Link } from '../../routes';
import User from '../user';
import Logo from './logo';
import Avatar from './avatar';
import PlusIcon from '../../shared/style/icons/plus.svg';

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

const Header = ({ theme, router: { pathname } }) => (
  <Wrapper theme={theme}>
    <Container>
      <Logo />
      <Link route="/posts/new">
        <PlusIcon />
      </Link>
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
