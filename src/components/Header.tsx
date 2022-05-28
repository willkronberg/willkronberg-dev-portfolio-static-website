/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
import React, { MouseEventHandler } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Brightness4Icon from '@material-ui/icons/Brightness4';
import Link from '@material-ui/core/Link';
import { Dispatch } from 'redux';
import { connect } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { RootState } from '../redux';
import { toggleDarkMode } from '../redux/modules/preferences';

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

interface DispatchProps {
  toggleDarkMode: () => void;
}

type Props = DispatchProps & HeaderProps;

export const Header = (props: Props) => {
  const classes = useStyles();
  const navigate = useNavigate();
  const { sections, title } = props;

  return (
    <>
      <Toolbar className={classes.toolbar}>
        <Typography component="h2" variant="h5" color="inherit" align="center" noWrap className={classes.toolbarTitle}>
          {title}
        </Typography>
        <div onClick={() => props.toggleDarkMode()}>
          <Brightness4Icon fontSize="large" />
        </div>
      </Toolbar>
      <Toolbar component="nav" variant="dense" className={classes.toolbarSecondary}>
        {sections.map((section) => (
          <Link color="inherit" noWrap key={section.title} variant="body2" href="#" className={classes.toolbarLink} onClick={() => navigate(section.url)}>
            {section.title}
          </Link>
        ))}
      </Toolbar>
    </>
  );
};

export interface Section {
  title: string;
  url: string;
}

interface HeaderProps {
  sections: Section[];
  title: string;
}

const mapStateToProps = (state: RootState) => ({
  preferences: state.preferences,
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
  toggleDarkMode: () => dispatch(toggleDarkMode()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Header);
