import device from 'current-device';
import _ from 'lodash/fp';
import React, { Component } from 'react';

import { CssBaseline } from '@material-ui/core';
import { amber } from '@material-ui/core/colors';
import { createMuiTheme, MuiThemeProvider, StyleRulesCallback, withStyles, WithStyles } from '@material-ui/core/styles';

import { About, Network } from './components';
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

  theme = createMuiTheme({
    palette: {
      type: 'dark'
    }
  });

  profilePictureURL = getResourceURL('profile.jpg');

  getClassName = (className: string): string => {
    return this.props.classes[className + _.upperFirst(this.state.orientation)];
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
            <About
              classes={{
                avatar: this.getClassName('avatar'),
                about: this.getClassName('about')
              }}
            />
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

  // TODO: add sass-loader
  const about: any = {
    zIndex: 1,
    '& h1': {
      fontWeight: 500,
      textTransform: 'uppercase'
    },
    '& h2': {
      marginBottom: 20
    },
    '& a': {
      color: amber[400]
    },
    '& p': {
      fontSize: `${device.mobile() ? 0.875 : 1}em`,
      maxWidth: _.clamp(320, 475)((2 / 3) * window.innerWidth)
    }
  };

  return {
    background: {
      gridRow: '1 / end',
      gridColumn: '1 / end',
      zIndex: 0
    },
    gridLandscape: {
      ...grid,
      gridTemplateRows: '1fr 2fr 1fr',
      gridTemplateColumns: '1fr auto 5fr',
    },
    gridPortrait: {
      ...grid,
      gridTemplateRows: '1fr auto 2fr',
      gridTemplateColumns: '1fr'
    },
    avatarLandscape: avatar,
    avatarPortrait: {
      ...avatar,
      gridColumn: 1,
      alignSelf: 'end',
      justifySelf: 'center'
    },
    aboutLandscape: {
      ...about,
      gridRow: 2,
      gridColumn: 3,
      margin: '15px 30px',
      '& p': {
        ...about['& p'],
        marginTop: 15
      }
    },
    aboutPortrait: {
      ...about,
      margin: 20,
      gridRow: 3,
      gridColumn: 1,
      textAlign: 'center',
      '& p': {
        ...about['& p'],
        margin: '0 auto 15px'
      }
    }
  };
};

export default withStyles(styles)(App);
