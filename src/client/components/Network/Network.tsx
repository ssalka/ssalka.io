import device from 'current-device';
import _ from 'lodash/fp';
import React, { HTMLProps, SFC } from 'react';
import Particles from 'react-particles-js';

import { indigo } from '@material-ui/core/colors';

import config from './config.json';

const style = {
  background: `linear-gradient(to bottom right, #124, ${indigo[900]}, #06245e)`
};

function getParticleCount(): number {
  const maxCount = device.tablet() ? 20 : 50;

  return _.clamp(15, maxCount)(window.innerWidth * window.innerHeight / 25000);
}

const params = _.merge(config, {
  particles: {
    number: {
      value: getParticleCount()
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
