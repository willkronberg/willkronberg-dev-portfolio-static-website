/* eslint-disable react/jsx-one-expression-per-line */
import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';
import Avatar from '@material-ui/core/Avatar';
import LinkedInIcon from '@material-ui/icons/LinkedIn';
import GitHubIcon from '@material-ui/icons/GitHub';
import TwitterIcon from '@material-ui/icons/Twitter';

function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {'Copyright © '}
      {' Will Kronberg '}
      {new Date().getFullYear()}
    </Typography>
  );
}

const useStyles = makeStyles((theme) => ({
  footer: {
    marginTop: theme.spacing(5),
    backgroundColor: theme.palette.background.paper,
    paddingTop: theme.spacing(2),
    paddingBottom: theme.spacing(1),
  },
  root: {
    display: 'flex',
    justifyContent: 'center',
    marginBottom: theme.spacing(2),
    flexWrap: 'wrap',
  },
  largeAvatar: {
    width: theme.spacing(7),
    height: theme.spacing(7),
  },
  break: {
    flexBasis: '100%',
    height: 0,
  },
  socialMediaIcon: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    marginTop: theme.spacing(2),
  },
}));

export default function Footer(props: FooterProps) {
  const classes = useStyles();

  return (
    <footer className={classes.footer}>
      <Container maxWidth="lg">
        <div className={classes.root}>
          <Avatar className={classes.largeAvatar} alt="Will Kronberg" src="https://pbs.twimg.com/profile_images/1158534997810089984/2Txvs8UJ_400x400.jpg" />
          <div className={classes.break} />
          <div className={classes.socialMediaIcon}>
            <GitHubIcon />
          </div>
          <div className={classes.socialMediaIcon}>
            <LinkedInIcon />
          </div>
          <div className={classes.socialMediaIcon}>
            <TwitterIcon />
          </div>
        </div>
        <Copyright />
      </Container>
    </footer>
  );
}

interface FooterProps {}
