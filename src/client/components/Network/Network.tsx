import React, { HTMLProps, SFC } from 'react';
import Particles from 'react-particles-js';

import config from './config.json';

const style = {
  backgroundColor: '#124'
};

function getParticleCount(): number {
  return Math.max(1000, window.innerWidth, window.innerHeight) / 50;
}

const params = {
  ...config,
  particles: {
    ...config.particles,
    number: {
      ...config.particles.number,
      value: getParticleCount()
    }
  }
};

const Network: SFC<Pick<HTMLProps<HTMLDivElement>, 'className'>> = props => (
  <Particles
    params={params}
    style={style}
    {...props}
  />
);

export default Network;
