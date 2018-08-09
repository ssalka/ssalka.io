import device from 'current-device';
import React, { Component, Fragment } from 'react';

import { Button, Fade, IconButton, Paper, Typography } from '@material-ui/core';
import EmailIcon from '@material-ui/icons/EmailOutlined';
import {
  FaGithub as GitHubIcon,
  FaLinkedinIn as LinkedInIcon
} from 'react-icons/fa';

import { getResourceURL } from 'src/client/util/s3';

import './About.scss';

interface ILink {
  name: string;
  url: string;
}

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
    links: ILink[];
  };
}

class About extends Component<{}, IAboutState> {
  state: IAboutState = {
    loading: true
  };

  profilePictureURL = getResourceURL('profile.jpg');

  resumeURL = getResourceURL('ssalkaResume.pdf');

  iconsByName = {
    github: <GitHubIcon />,
    linkedin: <LinkedInIcon />,
    email: <EmailIcon />
  };

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
        <div id="about">
          <Paper id="avatar" elevation={7} square={false}>
            <img src={this.profilePictureURL} />
          </Paper>

          {about && (
            <Fragment>
              <div id="content">
                <Typography variant={device.landscape() && !device.mobile() ? 'display3' : 'display2'}>
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

              <Button id="resume" href={this.resumeURL} target="_blank">
                Resumé
              </Button>

              <div id="links">
                {about.links.map(({ name, url }) => (
                  <a href={url} key={name} target="_blank">
                    <IconButton>
                      {this.iconsByName[name]}
                    </IconButton>
                  </a>
                ))}
              </div>
            </Fragment>
          )}
        </div>
      </Fade>
    );
  }
}

export default About;
