import device from 'current-device';
import React, { SFC } from 'react';
import Particles from 'react-particles-js';

import config from './config.json';

const style = {
  backgroundColor: '#124'
};

function getParticleCount(): number {
  switch (device.type) {
    case 'tablet':
      return 20;
    case 'mobile':
      return 30;
    case 'desktop':
    default:
      return 70;
  }
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

const Network: SFC = () => (
  <Particles
    height="100vh"
    width="100vw"
    params={params}
    style={style}
  />
);

export default Network;
