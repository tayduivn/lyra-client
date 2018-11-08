import styled from 'react-emotion';
import Link from 'next/link';
import {withRouter} from 'next/router';

const Wrapper = styled.header`
  background-color: ${props => props.theme.white};
  height: 66px;
  border-bottom: 1px solid ${props => props.theme.lilac};
`;

const Container = styled.div`
  max-width: 1100px;
  display: flex;
  margin: auto;
`;

const Header = ({router: {pathname}}) => (
  <Wrapper>
    <Container>
      <Link prefetch href="/">
        <a className={pathname === '/' ? 'is-active' : ''}>Home</a>
      </Link>
      <Link prefetch href="/about">
        <a className={pathname === '/about' ? 'is-active' : ''}>About</a>
      </Link>
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
