import { ApolloClient, InMemoryCache } from "@apollo/client";
import { HASURA_ADMIN } from "../../utils/constants";

export const client = new ApolloClient({
  uri: process.env.NEXT_PUBLIC_HASURA_ENDPOINT,
  headers: {
    "content-type": "application/json",
    "x-hasura-admin-secret": process.env.NEXT_PUBLIC_HASURA_SECRET as string,
    "x-hasura-role": HASURA_ADMIN,
  },
  cache: new InMemoryCache(),
});
