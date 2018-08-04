import React, { SFC } from 'react';
import Particles from 'react-particles-js';

import config from './config.json';

const style = {
  backgroundColor: '#124'
};

const Network: SFC = () => (
  <Particles
    height="100vh"
    width="100vw"
    params={config}
    style={style}
  />
);

export default Network;
