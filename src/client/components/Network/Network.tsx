import device from 'current-device';
import _ from 'lodash/fp';
import React, { HTMLProps, SFC } from 'react';
import Particles from 'react-particles-js';

import { indigo } from '@material-ui/core/colors';

import config from './config.json';

const style = {
  background: `linear-gradient(to bottom right, #124, ${indigo[900]}, #06245e)`
};

const DENSITY_DIVISOR = device.mobile() ? 100 : 200;

const params = _.merge(config, {
  particles: {
    number: {
      density: {
        value_area: window.innerHeight * window.innerWidth / DENSITY_DIVISOR
      }
    }
  }
});

const Network: SFC<Pick<HTMLProps<HTMLDivElement>, 'className'>> = props => (
  <Particles
    params={params}
    style={style}
    {...props}
  />
);

export default Network;
