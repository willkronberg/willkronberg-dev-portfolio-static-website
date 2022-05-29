import React from 'react';
import Grid from '@material-ui/core/Grid';
import FeaturedPost from './FeaturedPost';

export const Blog: React.FC = () => {
  const featuredPosts = [
    {
      title: 'Coming Soon',
      date: 'May 25, 2022',
      description: 'Content Coming Soon',
      image: 'https://source.unsplash.com/random',
      imageText: 'Image Text',
    },
  ];

  return (
    <>
      <Grid container spacing={4}>
        {featuredPosts.map((post) => (
          <FeaturedPost key={post.title} post={post} />
        ))}
      </Grid>
    </>
  );
};

export default Blog;
