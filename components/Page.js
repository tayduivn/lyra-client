import React, { Component } from 'react';
import styled from '@emotion/styled';
import { Global, css } from '@emotion/core';
// import {injectGlobal} from 'emotion';
import { ThemeProvider } from 'emotion-theming';
import Header from './header';

const THEME = {
  COLORS: {
    ALABASTER: '#f9f9f9',
    RICE_CAKE: '#f3f3f3',
    LILAC: '#e8e8e8',
    WHITE: '#fff',
    BLACK: '#000'
  }
};

const StyledPage = styled('div')({});

// TODO: Remove margin override and use CSS reset (normalize)
// injectGlobal`
//   body {
//
//     margin: 0;
//   }
// `;

import { show } from '../lib/utils/lock';

export default class Page extends Component {
  render() {
    return (
      <ThemeProvider theme={THEME}>
        <StyledPage>
          <Global
            styles={css`
              body {
                background-color: ${THEME.COLORS.RICE_CAKE};
                margin: 0;
              }
            `}
          />
          <Header />
          <a onClick={() => show()}>Login BLAH BLAHG</a>
          <React.Fragment>{this.props.children}</React.Fragment>
        </StyledPage>
      </ThemeProvider>
    );
  }
}
