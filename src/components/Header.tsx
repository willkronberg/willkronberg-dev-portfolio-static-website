import React from 'react';
import { makeStyles } from '@mui/styles';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Brightness4Icon from '@mui/icons-material/Brightness4';
import Link from '@mui/material/Link';
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

export const Header: React.FC<Props> = (props: Props) => {
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

export interface HeaderProps {
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
