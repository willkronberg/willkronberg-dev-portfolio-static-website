import React from 'react';
import Grid from '@mui/material/Grid';
import FeaturedPost from './FeaturedPost';

export const AmountMe: React.FC = () => {
  const featuredPosts = [
    {
      title: 'About Me Coming Soon',
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

export default AmountMe;
