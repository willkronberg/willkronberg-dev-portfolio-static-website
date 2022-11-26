import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Grid, List, ListItem, ListItemIcon, ListItemText, Modal, Paper } from '@material-ui/core';
import AlbumIcon from '@material-ui/icons/Album';
import PersonIcon from '@material-ui/icons/Person';
import EventAvailableIcon from '@material-ui/icons/EventAvailable';
import { Album } from './Inventory';

function getModalStyle() {
  const top = 50;
  const left = 50;

  return {
    top: `${top}%`,
    left: `${left}%`,
    transform: `translate(-${top}%, -${left}%)`,
  };
}

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    position: 'absolute',
    height: '47vh',
    width: '30vh',
    border: '2px solid #000',
    boxShadow: theme.shadows[5],
    backgroundColor: theme.palette.background.paper,
  },
  listRoot: {
    width: '100%',
  },
  details: {
    width: '30vw',
  },
  cover: {
    height: '30vh',
    width: '30vh',
    objectFit: 'contain',
  },
}));

export const AlbumInstanceModal: React.FC<AlbumInstanceModalProps> = (props: AlbumInstanceModalProps) => {
  const classes = useStyles();
  // getModalStyle is not a pure function, we roll the style only on the first render
  const [modalStyle] = React.useState(getModalStyle);
  const { album, isVisible, handleClose } = props;
  const addedOn = new Date(album.addedOn);

  const body = (
    <div style={modalStyle} className={classes.paper}>
      <Grid container>
        <Grid item xs>
          <img className={classes.cover} src={album.coverImage} srcSet={`${album.coverImage}`} alt={album.title} loading="lazy" />
        </Grid>
        <Grid item xs={12} lg className={classes.details}>
          <List component="nav" className={classes.listRoot} aria-label="contacts">
            <ListItem>
              <ListItemIcon>
                <AlbumIcon />
              </ListItemIcon>
              <ListItemText primary={album.title} />
            </ListItem>
            <ListItem>
              <ListItemIcon>
                <PersonIcon />
              </ListItemIcon>
              <ListItemText primary={album.artist} />
            </ListItem>
            <ListItem>
              <ListItemIcon>
                <EventAvailableIcon />
              </ListItemIcon>
              <ListItemText primary={addedOn.toLocaleDateString()} />
            </ListItem>
          </List>
        </Grid>
      </Grid>
    </div>
  );

  return (
    <Modal open={isVisible} onClose={handleClose} aria-labelledby="simple-modal-title" aria-describedby="simple-modal-description">
      {body}
    </Modal>
  );
};

export interface AlbumInstanceModalProps {
  album: Album;
  isVisible: boolean;
  handleClose: () => void;
}

export default AlbumInstanceModal;
