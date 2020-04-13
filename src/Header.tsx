/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Brightness4Icon from '@material-ui/icons/Brightness4';
import Link from '@material-ui/core/Link';

const useStyles = makeStyles((theme) => ({
  toolbar: {
    borderBottom: `1px solid ${theme.palette.divider}`,
  },
  toolbarTitle: {
    flex: 1,
  },
  toolbarSecondary: {
    justifyContent: 'space-around',
    overflowX: 'auto',
  },
  toolbarLink: {
    padding: theme.spacing(1),
    flexShrink: 0,
  },
}));

export default function Header(props: HeaderProps) {
  const classes = useStyles();
  const { sections, title, isDarkMode, setIsDarkMode } = props;

  return (
    <>
      <Toolbar className={classes.toolbar}>
        <Typography component="h2" variant="h5" color="inherit" align="center" noWrap className={classes.toolbarTitle}>
          {title}
        </Typography>
        <div onClick={() => setIsDarkMode(!isDarkMode)}>
          <Brightness4Icon fontSize="large" />
        </div>
      </Toolbar>
      <Toolbar component="nav" variant="dense" className={classes.toolbarSecondary}>
        {sections.map((section) => (
          <Link color="inherit" noWrap key={section.title} variant="body2" href={section.url} className={classes.toolbarLink}>
            {section.title}
          </Link>
        ))}
      </Toolbar>
    </>
  );
}

export interface Section {
  title: string;
  url: string;
}

interface HeaderProps {
  sections: Section[];
  title: string;
  isDarkMode: boolean;
  setIsDarkMode: (isDarkMode: boolean) => void;
}
