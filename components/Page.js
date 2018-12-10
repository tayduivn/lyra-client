import React, {Component} from 'react';
import styled, {injectGlobal} from 'react-emotion';
// import {injectGlobal} from 'emotion';
import {ThemeProvider} from 'emotion-theming';
import Header from './Header';

const theme = {
  alabaster: '#f9f9f9',
  lilac: '#e8e8e8',
  white: '#fff',
  black: '#000'
};

// const StyledPage = styled.div`
//   background: white;
// `;

// const Inner = styled.div`
//   margin: 0 auto;
// `;

const StyledPage = styled('div')({
  background: 'white'
});

const Inner = styled('div')({
  margin: '0 auto'
});

injectGlobal`
  body {
    background-color: ${theme.alabaster}
  }
`;

import {show} from '../lib/utils/lock';

export default class Page extends Component {
  render() {
    return (
      <ThemeProvider theme={theme}>
        <StyledPage>
          <Header />
          <br />
          <a onClick={() => show()}>Login BLAH BLAHG</a>
          <br />
          <div>{this.props.children}</div>
        </StyledPage>
      </ThemeProvider>
    );
  }
}
