import React, { Component } from 'react';

import { CssBaseline } from '@material-ui/core';
import { createMuiTheme, MuiThemeProvider } from '@material-ui/core/styles';

import { Network } from './components';

const theme = createMuiTheme();

export default class App extends Component {
  render() {
    return (
      <MuiThemeProvider theme={theme}>
        <CssBaseline>
          <Network />
        </CssBaseline>
      </MuiThemeProvider>
    );
  }
}
