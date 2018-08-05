import device from 'current-device';
import React, { Component, CSSProperties } from 'react';

import { CssBaseline, Paper, Typography } from '@material-ui/core';
import { createMuiTheme, MuiThemeProvider, StyleRulesCallback, withStyles, WithStyles } from '@material-ui/core/styles';

import { Network } from './components';
import { getResourceURL } from './util/s3';

const enum DeviceOrientation {
  Landscape = 'landscape',
  Portrait = 'portrait'
}

interface IAppState {
  orientation: DeviceOrientation;
}

class App extends Component<WithStyles, IAppState> {
  state = {
    orientation: device.orientation
  };

  theme = createMuiTheme();

  profilePictureURL = getResourceURL('profile.jpg');

  getClassName = (className: string): string => {
    const orientation = this.state.orientation.charAt(0).toUpperCase() + this.state.orientation.slice(1);

    return this.props.classes[className + orientation];
  }

  componentDidMount() {
    device.onChangeOrientation((orientation: DeviceOrientation) => {
      if (orientation !== this.state.orientation) {
        this.setState({ orientation });
      }
    });
  }

  render() {
    const { classes } = this.props;

    return (
      <MuiThemeProvider theme={this.theme}>
        <CssBaseline>
          <div className={this.getClassName('grid')}>
            <Network className={classes.background} />

            <Paper className={this.getClassName('avatar')} elevation={7} square={false}>
              <img src={this.profilePictureURL} />
            </Paper>

            <Typography className={this.getClassName('name')} variant={device.landscape() ? 'display3' : 'display2'}>
              Steven Salka
            </Typography>
          </div>
        </CssBaseline>
      </MuiThemeProvider>
    );
  }
}

const styles: StyleRulesCallback = theme => {
  const grid = {
    display: 'grid',
    height: '100vh'
  };

  const avatar = {
    height: '30vmax',
    width: '30vmax',
    maxHeight: 300,
    maxWidth: 300,
    gridColumn: 2,
    gridRow: 2,
    borderRadius: '50%',
    overflow: 'hidden',
    zIndex: 1,
    '& img': {
      height: '100%',
      width: '100%'
    }
  };

  const name: CSSProperties = {
    color: 'white',
    fontWeight: 500,
    textTransform: 'uppercase',
    margin: 30
  };

  return {
    background: {
      gridRow: '1 / end',
      gridColumn: '1 / end',
      zIndex: -1
    },
    gridLandscape: {
      ...grid,
      gridTemplateRows: '1fr 2fr 1fr',
      gridTemplateColumns: '1fr 2fr 5fr',
    },
    gridPortrait: {
      ...grid,
      gridTemplateRows: '1fr minmax(auto, 300px) 2fr',
      gridTemplateColumns: '1fr'
    },
    avatarLandscape: avatar,
    avatarPortrait: {
      ...avatar,
      gridColumn: 1,
      alignSelf: 'end',
      justifySelf: 'center'
    },
    nameLandscape: {
      ...name,
      gridRow: 2,
      gridColumn: 3
    },
    namePortrait: {
      ...name,
      gridRow: 3,
      gridColumn: 1,
      textAlign: 'center'
    }
  };
};

export default withStyles(styles)(App);
