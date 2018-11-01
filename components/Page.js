import React, {Component} from 'react';
import styled, {injectGlobal} from 'react-emotion';
// import {injectGlobal} from 'emotion';
import {ThemeProvider} from 'emotion-theming';
import Header from './Header';

const theme = {
  alabaster: '#f9f9f9'
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

export default class Page extends Component {
  render() {
    return (
      <ThemeProvider theme={theme}>
        <StyledPage>
          <Header />
          <div>{this.props.children}</div>
        </StyledPage>
      </ThemeProvider>
    );
  }
}
