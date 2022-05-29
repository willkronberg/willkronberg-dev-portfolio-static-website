import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';

const useStyles = makeStyles({
  card: {
    display: 'flex',
  },
  cardDetails: {
    flex: 1,
  },
  cardMedia: {
    width: 160,
  },
});

export const FeaturedPost: React.FC<FeaturedPostProps> = (props: FeaturedPostProps) => {
  const classes = useStyles();
  const { post } = props;

  return (
    <Grid item xs={12} md={12}>
      <CardActionArea component="a" href="#">
        <Card className={classes.card}>
          <div className={classes.cardDetails}>
            <CardContent>
              <Typography component="h2" variant="h5">
                {post.title}
              </Typography>
              <Typography variant="subtitle1" color="textSecondary">
                {post.date}
              </Typography>
              <Typography variant="subtitle1" paragraph>
                {post.description}
              </Typography>
              <Typography variant="subtitle1" color="primary">
                Continue reading...
              </Typography>
            </CardContent>
          </div>
          <CardMedia className={classes.cardMedia} image={post.image} title={post.imageText} />
        </Card>
      </CardActionArea>
    </Grid>
  );
};

export interface Post {
  title: string;
  date?: string;
  description: string;
  image: string;
  imageText?: string;
}

export interface FeaturedPostProps {
  post: Post;
}

export default FeaturedPost;
