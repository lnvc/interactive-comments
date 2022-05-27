import { ApolloClient, createHttpLink, InMemoryCache } from "@apollo/client";
import { setContext } from '@apollo/client/link/context';

import { HASURA_ADMIN, HASURA_USER } from "../../utils/constants";

const initHeaders = {
  "content-type": "application/json",
  "x-hasura-admin-secret": process.env.NEXT_PUBLIC_HASURA_SECRET as string,
  "x-hasura-role": HASURA_ADMIN,
};

const httpLink = createHttpLink({
  uri: process.env.NEXT_PUBLIC_HASURA_ENDPOINT,
});

const authLink = setContext((_, { headers }) => {
  // get the authentication token from local storage if it exists
  if (typeof window !== 'undefined') {
    const user = localStorage.getItem('user');
    console.log('storage', user);
    if (user) {
      return {
        headers: {
          ...initHeaders,
          "x-hasura-role": HASURA_USER,
          "x-hasura-user-id": user,
        }
      }
    }
  }
  // return the headers to the context so httpLink can read them
  return {
    headers: {
      ...initHeaders,
    }
  }
});

export const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});
