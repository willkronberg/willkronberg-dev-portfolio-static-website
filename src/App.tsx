import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { createTheme, ThemeProvider, Theme } from '@mui/material/styles';
import { connect } from 'react-redux';
import Container from '@mui/material/Container';
import CssBaseline from '@mui/material/CssBaseline';
import { RootState } from './redux';
import { PreferencesState } from './redux/modules/preferences';
import AboutMe from './components/AboutMe';
import Header, { Section } from './components/Header';
import Footer from './components/Footer';
import Blog from './components/Blog';
import Inventory from './components/Inventory';
import April from './components/April';

declare module '@mui/styles/defaultTheme' {
  interface DefaultTheme extends Theme {}
}

interface StateProps {
  preferences: PreferencesState;
}

export const App = (props: StateProps) => {
  const theme = React.useMemo(
    () =>
      createTheme({
        palette: {
          mode: props.preferences.isDarkModeEnabled ? 'dark' : 'light',
        },
      }),
    [props.preferences.isDarkModeEnabled]
  );

  const sections: Section[] = [
    { title: 'Home', url: '/' },
    { title: 'Record Collection', url: '/collection' },
  ];

  return (
    <div className="App">
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Container maxWidth="lg">
          <Header title="willkronberg.dev" sections={sections} />
          <main style={{ minHeight: '65vh' }}>
            <div>
              <Routes>
                <Route path="/" element={<Blog />} />
                <Route path="/aboutme" element={<AboutMe />} />
                <Route path="/collection" element={<Inventory />} />
                <Route path="/april" element={<April />} />
              </Routes>
            </div>
          </main>
          <Footer />
        </Container>
      </ThemeProvider>
    </div>
  );
};

const mapStateToProps = (state: RootState): StateProps => ({
  preferences: state.preferences,
});

export default connect(mapStateToProps, {})(App);
