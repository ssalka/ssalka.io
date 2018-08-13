import bind from 'bind-decorator';
import device from 'current-device';
import _ from 'lodash/fp';
import React, { Component, Fragment } from 'react';

import { CssBaseline } from '@material-ui/core';
import { createMuiTheme, MuiThemeProvider } from '@material-ui/core/styles';

import { About, Network } from './components';

import './App.scss';

export const enum DeviceOrientation {
  Landscape = 'landscape',
  Portrait = 'portrait'
}

export interface IAppState {
  orientation: DeviceOrientation;
}

class App extends Component<{}, IAppState> {
  state = {
    orientation: device.orientation
  };

  theme = createMuiTheme({
    palette: {
      type: 'dark'
    }
  });

  componentDidMount() {
    device.onChangeOrientation(this.handleOrientationChange);
  }

  @bind
  handleOrientationChange(orientation: DeviceOrientation) {
    if (orientation !== this.state.orientation) {
      requestAnimationFrame(() =>  this.setState({ orientation }));
    }
  }

  render() {
    return (
      <MuiThemeProvider theme={this.theme}>
        <CssBaseline>
          <Fragment>
            <Network className="background" />
            <About />
          </Fragment>
        </CssBaseline>
      </MuiThemeProvider>
    );
  }
}

export default App;
