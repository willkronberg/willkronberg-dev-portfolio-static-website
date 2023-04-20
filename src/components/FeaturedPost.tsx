import React from 'react';
import { makeStyles } from '@mui/styles';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import CardActionArea from '@mui/material/CardActionArea';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import { Link } from '@mui/material';

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

  const pubDate = new Date(post.date);

  return (
    <Grid item xs={12} md={12}>
      <CardActionArea component="a" href={post.link}>
        <Card className={classes.card}>
          <div className={classes.cardDetails}>
            <CardContent>
              <Typography component="h2" variant="h5">
                {post.title}
              </Typography>
              <Typography variant="subtitle1" paragraph>
                {post.description}
              </Typography>
              <Typography variant="subtitle2" color="textSecondary">
                {pubDate.toLocaleString()}
              </Typography>
              {/* <Link variant="subtitle1" href={post.link}>
                Continue Reading
              </Link> */}
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
  date: string;
  description: string;
  image: string;
  imageText?: string;
  link?: string;
}

export interface FeaturedPostProps {
  post: Post;
}

export default FeaturedPost;
