/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Brightness4Icon from '@material-ui/icons/Brightness4';
import Link from '@material-ui/core/Link';
import { RootState } from './redux';
import { Dispatch } from 'redux';
import { PreferencesState, toggleDarkMode } from './redux/modules/preferences';
import { connect } from 'react-redux';

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

interface StateProps {
  preferences: PreferencesState
}

interface DispatchProps {
  toggleDarkMode: () => void
}

type Props = StateProps & DispatchProps & HeaderProps;

export const Header = (props: Props) => {
  const classes = useStyles();
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
}

const mapStateToProps = (state: RootState) => ({
  preferences: state.preferences,
})

const mapDispatchToProps = (dispatch: Dispatch) => ({
  toggleDarkMode: () => dispatch(toggleDarkMode())
})

export default connect(mapStateToProps, mapDispatchToProps)(Header);