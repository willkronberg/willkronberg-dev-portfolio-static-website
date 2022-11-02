import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import { Link } from '@material-ui/core';

const useStyles = makeStyles({
  card: {
    display: 'flex',
  },
  cardDetails: {
    flex: 1,
  },
  cardMedia: {
    width: 80,
  },
});

export const Album: React.FC<AlbumProps> = (props: AlbumProps) => {
  const classes = useStyles();
  const { album } = props;

  return (
    <Grid item xs={12} md={12}>
      <CardActionArea component="a" href="#">
        <Card className={classes.card}>
          <div className={classes.cardDetails}>
            <CardContent>
              <Typography component="h2" variant="h5">
                {album.title}
              </Typography>
              <Typography variant="subtitle1" paragraph>
                {album.artist}
              </Typography>
              <Typography variant="subtitle1" color="textSecondary">
                {`Year: ${album.addedOn}`}
              </Typography>
              <Typography variant="subtitle1" color="textSecondary">
                {`Date Added: ${album.addedOn}`}
              </Typography>
              <Link href={album.link}>More Information</Link>
            </CardContent>
          </div>
        </Card>
      </CardActionArea>
    </Grid>
  );
};

export interface Album {
  title: string;
  artist: string;
  year: number;
  addedOn: string;
  link: string;
}

export interface AlbumProps {
  album: Album;
}

export default Album;
