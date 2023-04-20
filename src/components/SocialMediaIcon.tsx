import React, { ReactNode, useState } from 'react';
import { makeStyles } from '@mui/styles';

const useStyles = makeStyles((theme) => ({
  socialMediaIcon: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    marginTop: theme.spacing(2),
    cursor: 'pointer',
  },
}));

export const SocialMediaIcon: React.FC<SocialMediaIconProps> = (props: SocialMediaIconProps) => {
  const classes = useStyles();
  const { children, link } = props;
  const [childColor, setChildColor] = useState<string>('inherit');
  const clonedChildren = React.isValidElement(children) ? React.cloneElement(children) : children;

  return (
    <div
      className={classes.socialMediaIcon}
      onClick={(_) => window.open(link, '_blank')}
      onMouseEnter={() => setChildColor('action')}
      onMouseLeave={() => setChildColor('inherit')}
    >
      {clonedChildren}
    </div>
  );
};

export interface SocialMediaIconProps {
  children: ReactNode;
  link: string;
}

export default SocialMediaIcon;
