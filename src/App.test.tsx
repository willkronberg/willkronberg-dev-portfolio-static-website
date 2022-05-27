import React from 'react';
import { render } from '@testing-library/react';
import { App } from './App';
import configureStore from 'redux-mock-store';
import { Provider } from 'react-redux';

const mockStore = configureStore([])

test('renders the web page', () => {
  const store = mockStore({
    isDarkModeEnabled: false,
  });

  const { getByText } = render(<Provider store={store}><App preferences={{isDarkModeEnabled: false}} /></Provider>);
  const linkElement = getByText(/willkronberg.dev/i);1
  expect(linkElement).toBeInTheDocument();
});
