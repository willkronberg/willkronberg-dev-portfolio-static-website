import Grid from '@mui/material/Grid';
import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import { RootState } from '../redux';
import { ArticlesState, fetchArticles } from '../redux/modules/articles';
import FeaturedPost from './FeaturedPost';
import ErrorBoundary from './ErrorBoundary';

interface DispatchProps {
  fetchArticles: () => void;
}

export interface ReduxStateProps {
  articles: ArticlesState;
}

type Props = DispatchProps & ReduxStateProps;

export const Blog: React.FC<Props> = (props) => {
  useEffect(() => {
    if (!props.articles.isLoading) {
      props.fetchArticles();
    }
  }, []);

  const posts = props.articles.data.map((article) => ({
    title: article.title,
    description: article.description,
    date: article.published_date,
    image: 'https://source.unsplash.com/random',
    imageText: 'Randomized Photo',
    link: article.link,
  }));

  return (
    <ErrorBoundary>
      <Grid container spacing={4}>
        {posts.map((post) => (
          <FeaturedPost key={post.title} post={post} />
        ))}
      </Grid>
    </ErrorBoundary>
  );
};

const mapStateToProps = (state: RootState) => ({
  articles: state.articles,
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
  fetchArticles: () => dispatch<any>(fetchArticles()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Blog);
