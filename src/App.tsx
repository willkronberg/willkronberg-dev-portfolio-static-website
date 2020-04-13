/* eslint-disable implicit-arrow-linebreak */
import React, { useState } from 'react';
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';
import Blog from './Blog';

export const App = () => {
  const [isDarkMode, setIsDarkMode] = useState<boolean>(false);

  const theme = React.useMemo(
    () =>
      createMuiTheme({
        palette: {
          type: isDarkMode ? 'dark' : 'light',
        },
      }),
    [isDarkMode]
  );

  return (
    <div className="App">
      <ThemeProvider theme={theme}>
        <Blog setIsDarkMode={setIsDarkMode} isDarkMode={isDarkMode} />
      </ThemeProvider>
    </div>
  );
};

export default App;
