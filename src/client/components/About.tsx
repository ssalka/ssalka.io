import device from 'current-device';
import React, { Component, Fragment } from 'react';

import { Fade, Paper, Typography } from '@material-ui/core';
import { WithStyles } from '@material-ui/core/styles';

import { getResourceURL } from 'src/client/util/s3';

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

class About extends Component<WithStyles, IAboutState> {
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
    const { classes } = this.props;
    const { loading, error, about } = this.state;

    // TODO: render error state
    return (
      <Fade in={!loading && !error}>
        <Fragment>
        <Paper className={classes.avatar} elevation={7} square={false}>
          <img src={this.profilePictureURL} />
        </Paper>

        {about && (
          <div className={classes.about}>
            <Typography
              variant={device.landscape() ? 'display3' : 'display2'}
              gutterBottom={device.portrait()}
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
          </div>
        )}
        </Fragment>
      </Fade>
    );
  }
}

export default About;
