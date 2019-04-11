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

const LinkList = styled('ul')({
  listStyle: 'none'
});

const LinkWrapper = styled('li')({
  display: 'inline-flex',
  marginRight: 20,
  ' > a': {
    textDecoration: 'none'
  }
});

const Wrapper = styled('div')(({ theme: { COLORS: { WHITE, LILAC } } }) => ({
  backgroundColor: WHITE,
  borderBottom: `1px solid ${LILAC}`,
  boxShadow: '0 1px 1px 0 rgba(0,0,0,.05)'
}));

const Main = styled('div')({
  display: 'flex',
  alignItems: 'center'
});

const Aside = styled('div')({
  display: 'flex',
  alignItems: 'center'
});

const Container = styled('div')({
  maxWidth: 1100,
  display: 'flex',
  justifyContent: 'space-between',
  padding: '13px 10px 13px 10px',
  margin: 'auto'
});

const Header = ({ theme, router: { pathname } }) => (
  <Wrapper theme={theme}>
    <Container>
      <Main>
        <Logo />
        <LinkList>
          <LinkWrapper>
            <Link route="/">Posts</Link>
          </LinkWrapper>
          <LinkWrapper>
            <Link route="/block-explorer">Block Explorer</Link>
          </LinkWrapper>
        </LinkList>
      </Main>
      <Aside>
        <Link route="/posts/new">
          <PlusIcon />
        </Link>
        <User>
          {({ data: { me } }) => (
            <React.Fragment>
              {me && <Avatar avatar={me.avatar} />}
            </React.Fragment>
          )}
        </User>
      </Aside>
    </Container>
  </Wrapper>
);

export default compose(
  withTheme,
  withRouter
)(Header);
