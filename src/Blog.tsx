import React from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';
import Grid from '@material-ui/core/Grid';
import Container from '@material-ui/core/Container';
import Header, { Section } from './Header';
import FeaturedPost from './FeaturedPost';
import Footer from './Footer';

const sections: Section[] = [
  { title: 'Home', url: '/',  },
  { title: 'About Me', url: '/aboutme' },
];

const featuredPosts = [
  {
    title: 'Coming Soon',
    date: 'May 25, 2022',
    description: 'Content Coming Soon',
    image: 'https://source.unsplash.com/random',
    imageText: 'Image Text',
  },
];

export default function Blog(props: BlogProps) {
  const { isDarkMode, setIsDarkMode } = props;

  return (
    <>
      <CssBaseline />
      <Container maxWidth="lg">
        <Header title="willkronberg.dev" sections={sections} isDarkMode={isDarkMode} setIsDarkMode={setIsDarkMode} />
        <main>
          <Grid container spacing={4}>
            {featuredPosts.map((post) => (
              <FeaturedPost key={post.title} post={post} />
            ))}
          </Grid>
        </main>
      </Container>
      <Footer />
    </>
  );
}

interface BlogProps {
  isDarkMode: boolean;
  setIsDarkMode: (isDarkMode: boolean) => void;
}
