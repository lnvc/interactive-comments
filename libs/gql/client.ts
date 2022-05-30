import { ApolloClient, createHttpLink, InMemoryCache, split } from "@apollo/client";
import { GraphQLWsLink } from '@apollo/client/link/subscriptions';
import { getMainDefinition } from "@apollo/client/utilities";
import { createClient } from 'graphql-ws';

import { HEADERS } from "../../utils/constants";

const httpLink = createHttpLink({
  uri: process.env.NEXT_PUBLIC_HASURA_ENDPOINT,
  headers: HEADERS,
});

const wsLink = process.title === 'browser' ? new GraphQLWsLink(createClient({
  url: `wss://${process.env.NEXT_PUBLIC_HASURA_URL}`,
  connectionParams: {
    headers: HEADERS,
  },
})) : null;

// The split function takes three parameters:
//
// * A function that's called for each operation to execute
// * The Link to use for an operation if the function returns a "truthy" value
// * The Link to use for an operation if the function returns a "falsy" value
const splitLink = process.title === 'browser' && wsLink ? split(
  ({ query }) => {
    const definition = getMainDefinition(query);
    return (
      definition.kind === 'OperationDefinition' &&
      definition.operation === 'subscription'
    );
  },
  wsLink,
  httpLink,
) : httpLink;


export const client = new ApolloClient({
  link: splitLink,
  cache: new InMemoryCache(),
});
