import _ from 'lodash/fp';
import React, { HTMLProps, SFC } from 'react';
import Particles from 'react-particles-js';

import { indigo } from '@material-ui/core/colors';

import config from './config.json';

const style = {
  background: `linear-gradient(to bottom right, #124, ${indigo[900]}, #06245e)`
};

const constrainValue = _.flow(_.clamp(20, 75), _.floor);

const params = _.merge(config, {
  particles: {
    number: {
      value: constrainValue(
        window.innerHeight * window.innerWidth /
        (9000 * window.devicePixelRatio ** 3)
      )
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
