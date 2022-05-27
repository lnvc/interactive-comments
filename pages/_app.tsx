/* eslint-disable react/jsx-props-no-spreading */
import React, { useEffect } from 'react';
import { ApolloProvider, ApolloClient, createHttpLink, InMemoryCache } from "@apollo/client";
import { setContext } from '@apollo/client/link/context';
import type { AppProps } from 'next/app';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';

import '../styles/globals.css';

import {store, persistor} from '../libs/redux/store';
import { client } from '../libs/gql/client';
import { HASURA_ADMIN, HASURA_USER } from '../utils/constants';

const MyApp = ({ Component, pageProps }: AppProps) => {
  // const initHeaders = {
  //   "content-type": "application/json",
  //   "x-hasura-admin-secret": process.env.NEXT_PUBLIC_HASURA_SECRET as string,
  //   "x-hasura-role": HASURA_ADMIN,
  // };

  // const httpLink = createHttpLink({
  //   uri: process.env.NEXT_PUBLIC_HASURA_ENDPOINT,
  // });

  // const authLink = setContext((_, { headers }) => {
  //   // get the authentication token from local storage if it exists
  //   if (typeof window !== 'undefined') {
  //     const user = localStorage.getItem('user');
  //     console.log('storage', user && JSON.parse(user).id);
  //     return {
  //       headers: {
  //         ...initHeaders,
  //         "x-hasura-role": HASURA_USER,
  //         "x-hasura-user-id": user,
  //       }
  //     }
  //   }
  //   // return the headers to the context so httpLink can read them
  //   return {
  //     headers: {
  //       ...initHeaders,
  //     }
  //   }
  // });

  //   const client = new ApolloClient({
  //   link: authLink.concat(httpLink),
  //   cache: new InMemoryCache(),
  // });

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
