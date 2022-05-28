import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { createTheme, ThemeProvider } from '@material-ui/core/styles';
import { connect } from 'react-redux';
import CssBaseline from '@material-ui/core/CssBaseline';
import Container from '@material-ui/core/Container';
import { RootState } from './redux';
import { PreferencesState } from './redux/modules/preferences';
import AboutMe from './components/AboutMe';
import Header, { Section } from './components/Header';
import Footer from './components/Footer';
import Blog from './components/Blog';

interface StateProps {
  preferences: PreferencesState;
}

export const App = (props: StateProps) => {
  const theme = React.useMemo(
    () =>
      createTheme({
        palette: {
          type: props.preferences.isDarkModeEnabled ? 'dark' : 'light',
        },
      }),
    [props.preferences.isDarkModeEnabled]
  );

  const sections: Section[] = [
    { title: 'Home', url: '/' },
    { title: 'About Me', url: '/aboutme' },
  ];

  return (
    <div className="App">
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Container maxWidth="lg">
          <Header title="willkronberg.dev" sections={sections} />
          <main>
            <Routes>
              <Route path="/" element={<Blog />} />
              <Route path="/aboutme" element={<AboutMe />} />
            </Routes>
          </main>
        </Container>
        <Footer />
      </ThemeProvider>
    </div>
  );
};

const mapStateToProps = (state: RootState): StateProps => ({
  preferences: state.preferences,
});

export default connect(mapStateToProps, {})(App);
