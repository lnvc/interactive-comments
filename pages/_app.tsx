/* eslint-disable react/jsx-props-no-spreading */
import React, { useEffect } from 'react';
import { ApolloProvider } from '@apollo/client';
import type { AppProps } from 'next/app';
import { Provider } from 'react-redux';
import * as blah from 'redux-persist';
import { PersistGate } from 'redux-persist/integration/react';

import '../styles/globals.css';

import {store, persistor} from '../libs/redux/store';
import { client } from '../libs/gql/client';

const MyApp = ({ Component, pageProps }: AppProps) => {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <ApolloProvider client={client}>
          <Component {...pageProps} />
        </ApolloProvider>
      </PersistGate>
    </Provider>
  );
}

export default MyApp;
