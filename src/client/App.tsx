import bind from 'bind-decorator';
import device from 'current-device';
import _ from 'lodash/fp';
import React, { Component } from 'react';

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
  handleOrientationChange() {
    const orientation = (window.orientation as number) % 180
      ? DeviceOrientation.Landscape
      : DeviceOrientation.Portrait;

    if (orientation !== this.state.orientation) {
      // current-device library typically does this, but fails on iOS devices
      document.querySelector('html').classList.add(orientation);
      document.querySelector('html').classList.remove(this.state.orientation);

      requestAnimationFrame(() =>  this.setState({ orientation }));
    }
  }

  render() {
    return (
      <MuiThemeProvider theme={this.theme}>
        <CssBaseline />
        <Network className="background" />
        <About />
      </MuiThemeProvider>
    );
  }
}

export default App;
