/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
import React, { ReactNode, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  socialMediaIcon: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    marginTop: theme.spacing(2),
    cursor: 'pointer',
  },
}));

export default function SocialMediaIcon(props: SocialMediaIconProps) {
  const classes = useStyles();
  const { children } = props;
  const [childColor, setChildColor] = useState<string>('inherit');
  const clonedChildren = React.isValidElement(children) ? React.cloneElement(children, { color: childColor }) : children;

  return (
    <div
      className={classes.socialMediaIcon}
      onClick={(_) => window.open('https://github.com/willkronberg', '_blank')}
      onMouseEnter={() => setChildColor('action')}
      onMouseLeave={() => setChildColor('inherit')}
    >
      {clonedChildren}
    </div>
  );
}

interface SocialMediaIconProps {
  children: ReactNode;
  link: string;
}
