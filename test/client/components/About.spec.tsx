import { shallow, ShallowWrapper } from 'enzyme';
import _ from 'lodash/fp';
import React from 'react';

import { Fade, Typography } from '@material-ui/core';

import About, { IAboutState } from 'src/client/components/About';

describe('About', () => {
  let about: ShallowWrapper<{}, IAboutState>;

  const testContent: IAboutState['about'] = {
    header: 'Test Header',
    profession: {
      title: 'Test Job',
      company: {
        name: 'Test Company',
        website: '127.0.0.1'
      }
    },
    blurb: ['Test blurb 1', 'Test blurb 2'],
    links: [{
      name: 'github',
      url: 'https://github.com'
    }]
  };

  beforeEach(() => {
    spyOn(window, 'fetch').and.callFake(async () => ({
      async json() {
        return testContent;
      }
    }));
  });

  it('initializes with a loading state', () => {
    about = shallow(<About />);

    expect(about.state('loading')).toBe(true);
  });

  it('loads data to display', async () => {
    about = shallow(<About />);

    expect(window.fetch).toHaveBeenCalledWith(about.instance().urls.content);

    requestAnimationFrame(() => {
      expect(about.state('error')).not.toBeDefined();
      expect(about.state('loading')).toBe(false);
      expect(about.state('about')).toEqual(testContent);
    });
  });

  describe('#render', () => {
    describe('before content loaded', () => {
      it('renders a hidden main element', () => {
        about = shallow(<About />);

        expect(about.find(Fade).prop('in')).toBe(false);
        expect(about.find('main').exists()).toBe(true);
      });
    });



    describe('once content is loaded', () => {
      it('renders about info from request', done => {
        about = shallow(<About />);

        expect(window.fetch).toHaveBeenCalledWith(about.instance().urls.content);

        requestAnimationFrame(() => {
          about.update();

          expect(about.find(Fade).prop('in')).toBe(true);

          const contentTypography = about.find(Typography);
          const header = contentTypography.get(0);

          expect(header.props.children).toBe(testContent.header);

          const profession = contentTypography.get(1);
          const [testJob, at, testCompany] = profession.props.children;

          expect(testCompany.props.href).toBe(testContent.profession.company.website);
          expect([testJob, at, testCompany.props.children]).toEqual([
            testContent.profession.title, ' @ ', testContent.profession.company.name
          ]);

          const blurb1 = contentTypography.get(2);
          const blurb2 = contentTypography.get(3);

          expect(blurb1.props.children).toBe(testContent.blurb[0]);
          expect(blurb2.props.children).toBe(testContent.blurb[1]);

          done();
        });
      });
    });
  });
});
