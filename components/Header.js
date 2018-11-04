import styled from 'react-emotion';
import Link from 'next/link';
import {withRouter} from 'next/router';

const Container = styled.header`
  background-color: ${props => props.theme.black};
`;

const Header = ({router: {pathname}}) => (
  <Container>
    <Link prefetch href="/">
      <a className={pathname === '/' ? 'is-active' : ''}>Home</a>
    </Link>
    <Link prefetch href="/about">
      <a className={pathname === '/about' ? 'is-active' : ''}>About</a>
    </Link>
  </Container>
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
