/* eslint-disable implicit-arrow-linebreak */
import React from 'react';
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';
import Blog from './Blog';
import { connect } from 'react-redux';
import { RootState } from './redux';
import { PreferencesState } from './redux/modules/preferences';

interface StateProps {
  preferences: PreferencesState
}

export const App = (props: StateProps) => {
  const theme = React.useMemo(
    () =>
      createMuiTheme({
        palette: {
          type: props.preferences.isDarkModeEnabled ? 'dark' : 'light',
        },
      }),
    [props.preferences.isDarkModeEnabled]
  );

  return (
    <div className="App">
      <ThemeProvider theme={theme}>
        <Blog />
      </ThemeProvider>
    </div>
  );
};

const mapStateToProps = (state: RootState): StateProps => ({
  preferences: state.preferences,
})

export default connect(mapStateToProps, {})(App);
