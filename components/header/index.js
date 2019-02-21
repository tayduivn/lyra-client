import React from 'react';
import styled from '@emotion/styled';
import Link from 'next/link';
import { withRouter } from 'next/router';
import User from '../user.jsx';
import Logo from './logo';
import Avatar from './avatar';
import PlusIcon from './icons/plus.svg';

const Wrapper = styled.header`
  background-color: ${props => props.theme.white};
  border-bottom: 1px solid ${props => props.theme.lilac};
`;

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
      <PlusIcon />
      <User>
        {({ data: { me } }) => (
          <React.Fragment>{me && <Avatar avatar={me.avatar} />}</React.Fragment>
        )}
      </User>
    </Container>
  </Wrapper>
);

// const Header = ({router: {pathname}}) => (
//   <header>
//     <Link prefetch href="/">
//       <a className={pathname === '/' ? 'is-active' : ''}>Home</a>
//     </Link>
//     <Link prefetch href="/about">
//       <a className={pathname === '/about' ? 'is-active' : ''}>About</a>
//     </Link>
//   </header>
// );

export default withRouter(Header);
