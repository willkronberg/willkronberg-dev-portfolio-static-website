import React from 'react';
import { render } from '@testing-library/react';
import { App } from './App';
import configureStore from 'redux-mock-store';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import '@testing-library/jest-dom/extend-expect';

const mockStore = configureStore([]);

test('renders the web page', () => {
  const store = mockStore({
    isDarkModeEnabled: false,
  });

  const toggleDarkModeMock = jest.fn();

  const { getByText } = render(
    <BrowserRouter>
      <Provider store={store}>
        <App preferences={{ isDarkModeEnabled: false }} toggleDarkMode={toggleDarkModeMock} />
      </Provider>
    </BrowserRouter>
  );

  const linkElement = getByText(/willkronberg.dev/i);

  expect(linkElement).toBeInTheDocument();
});
