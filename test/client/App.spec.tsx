import { shallow, ShallowWrapper } from 'enzyme';
import React from 'react';
import App, { DeviceOrientation, IAppState } from 'src/client/App';
import { About, Network } from 'src/client/components';

describe('App', () => {
  let app: ShallowWrapper<{}, IAppState>;

  it('initializes state with current device orientation', () => {
    app = shallow(<App />);

    expect(app.state('orientation')).toBe(DeviceOrientation.Landscape);
  });

  describe('#handleOrientationChange', () => {
    it('updates state when device orientation changes', done => {
      const newOrientation = DeviceOrientation.Portrait;

      app = shallow(<App />);

      app.instance().handleOrientationChange(newOrientation);

      requestAnimationFrame(() => {
        expect(app.state('orientation')).toBe(newOrientation);
        done();
      })
    });
  });

  describe('#render', () => {
    it('renders the network background and site content', () => {
      app = shallow(<App />);

      expect(app.find(Network).exists()).toBe(true);
      expect(app.find(About).exists()).toBe(true);
    });
  });
});
