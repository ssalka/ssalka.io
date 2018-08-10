import device from 'current-device';
import React, { Component, Fragment } from 'react';

import { Button, Fade, IconButton, Paper } from '@material-ui/core';
import Typography, { TypographyProps } from '@material-ui/core/Typography';
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

  static getHeaderDisplayVariant(): 1 | 2 | 3 {
    if (device.landscape() && !device.mobile()) return 3;
    else if (device.mobile() && window.innerWidth < 600) return 1;
    else return 2;
  }

  render() {
    const { loading, error, about } = this.state;

    // TODO: render error state
    return (
      <Fade in={!loading && !error}>
        <main>
          <Paper id="avatar" elevation={7} square={false}>
            <img src={this.profilePictureURL} />
          </Paper>

          {about && (
            <Fragment>
              <section id="content">
                <Typography variant={`display${About.getHeaderDisplayVariant()}` as TypographyProps['variant']}>
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
              </section>

              <Button id="resume" href={this.resumeURL} target="_blank" size={device.mobile() ? 'medium' : 'large'}>
                Resumé
              </Button>

              <section id="links">
                {about.links.map(({ name, url }) => (
                  <a href={url} key={name} target="_blank">
                    <IconButton>
                      {this.iconsByName[name]}
                    </IconButton>
                  </a>
                ))}
              </section>
            </Fragment>
          )}
        </main>
      </Fade>
    );
  }
}

export default About;
