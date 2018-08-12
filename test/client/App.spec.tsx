import { shallow, ShallowWrapper } from 'enzyme';
import React from 'react';
import App, { DeviceOrientation, IAppState } from 'src/client/App';
import { About, Network } from 'src/client/components';

describe('App', () => {
  let wrapper: ShallowWrapper<{}, IAppState>;

  it('initializes state with current device orientation', () => {
    wrapper = shallow(<App />);

    expect(wrapper.state('orientation')).toBe(DeviceOrientation.Landscape);
  });

  describe('#handleOrientationChange', () => {
    it('updates state when device orientation changes', done => {
      const newOrientation = DeviceOrientation.Portrait;

      wrapper = shallow(<App />);

      wrapper.instance().handleOrientationChange(newOrientation);

      requestAnimationFrame(() => {
        expect(wrapper.state('orientation')).toBe(newOrientation);
        done();
      })
    });
  });

  describe('#render', () => {
    it('renders the network background and site content', () => {
      wrapper = shallow(<App />);

      expect(wrapper.find(Network).exists()).toBe(true);
      expect(wrapper.find(About).exists()).toBe(true);
    });
  });
});
