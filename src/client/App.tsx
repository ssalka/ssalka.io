import device from 'current-device';
import _ from 'lodash/fp';
import React, { Component } from 'react';

import { CssBaseline } from '@material-ui/core';
import { createMuiTheme, MuiThemeProvider } from '@material-ui/core/styles';

import { About, Network } from './components';

import './App.scss';

const enum DeviceOrientation {
  Landscape = 'landscape',
  Portrait = 'portrait'
}

interface IAppState {
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
    device.onChangeOrientation((orientation: DeviceOrientation) => {
      if (orientation !== this.state.orientation) {
        this.setState({ orientation });
      }
    });
  }

  render() {
    return (
      <MuiThemeProvider theme={this.theme}>
        <CssBaseline>
          <div className="app">
            <Network className="background" />
            <About />
          </div>
        </CssBaseline>
      </MuiThemeProvider>
    );
  }
}

export default App;
