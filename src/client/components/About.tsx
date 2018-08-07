import device from 'current-device';
import React, { Component } from 'react';

import { Fade, Paper, Typography } from '@material-ui/core';

import { getResourceURL } from 'src/client/util/s3';

import './About.scss';

interface IAboutState {
  loading: boolean;
  error?: boolean;
  about?: {
    header: string;
    profession: {
      title: string;
      company: Record<'name' | 'website', string>;
    };
    blurb: string[];
  };
}

class About extends Component<{}, IAboutState> {
  state: IAboutState = {
    loading: true
  };

  profilePictureURL = getResourceURL('profile.jpg');

  async componentDidMount() {
    try {
      const response = await fetch(getResourceURL('about.json'));
      const about: IAboutState['about'] = await response.json();

      this.setState({ about, loading: false });
    }
    catch {
      this.setState({ error: true });
    }
  }

  render() {
    const { loading, error, about } = this.state;

    // TODO: render error state
    return (
      <Fade in={!loading && !error}>
        <div className="about">
          <Paper className="avatar" elevation={7} square={false}>
            <img src={this.profilePictureURL} />
          </Paper>

          {about && (
            <div className="content">
              <Typography
                variant={device.landscape() && !device.mobile() ? 'display3' : 'display2'}
              >
                {about.header}
              </Typography>

              <Typography variant="title">
                {about.profession.title} @ {(
                  <a href={about.profession.company.website} target="_blank">
                    {about.profession.company.name}
                  </a>
                )}
              </Typography>

              {about.blurb.map((line, i) => (
                <Typography key={i}>{line}</Typography>
              ))}
            </div>
          )}
        </div>
      </Fade>
    );
  }
}

export default About;
