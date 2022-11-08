import { configureStore } from '@reduxjs/toolkit';
import { AwsRum, AwsRumConfig } from 'aws-rum-web';
import React from 'react';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import { persistReducer, persistStore } from 'redux-persist';
import { PersistGate } from 'redux-persist/integration/react';
import storage from 'redux-persist/lib/storage';
import thunk from 'redux-thunk';
import 'typeface-roboto';
import App from './App';
import './index.css';
import { rootReducer } from './redux';
import * as serviceWorker from './serviceWorker';

try {
  const config: AwsRumConfig = {
    sessionSampleRate: 1,
    endpoint: 'https://dataplane.rum.us-east-1.amazonaws.com',
    telemetries: ['errors', 'performance', 'http'],
    allowCookies: true,
    enableXRay: true,
  };

  const APPLICATION_ID: string = 'f53b18fc-ef5c-42d9-8a7c-a27aeb29b53d';
  const APPLICATION_VERSION: string = '1.0.0';
  const APPLICATION_REGION: string = 'us-east-1';

  const awsRum: AwsRum = new AwsRum(APPLICATION_ID, APPLICATION_VERSION, APPLICATION_REGION, config);
  console.info(awsRum);

  console.info('CloudWatch RUM Service Started');
} catch (error) {
  // Ignore errors thrown during CloudWatch RUM web client initialization
}

const persistConfig = {
  key: 'root',
  storage,
  blacklist: ['inventory', 'articles'],
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = configureStore({
  reducer: persistedReducer,
  devTools: true,
  middleware: [thunk],
});

const persistor = persistStore(store);

const container = document.getElementById('root');
const root = createRoot(container!);

root.render(
  <React.StrictMode>
    <BrowserRouter>
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <App />
        </PersistGate>
      </Provider>
    </BrowserRouter>
  </React.StrictMode>
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
