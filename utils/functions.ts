import { HASURA_ADMIN } from "./constants";

const headers = {
  'Content-Type': 'application/json',
  "x-hasura-admin-secret": process.env.NEXT_PUBLIC_HASURA_SECRET as string,
  "x-hasura-role": HASURA_ADMIN,
};

export const gqlFetcher = async (...args: any[]) => {
  const options = {
    headers: headers,
    method: 'POST',
    body: JSON.stringify(args[0])
  };
  const res = await fetch(process.env.NEXT_PUBLIC_HASURA_ENDPOINT as string, options)
  const resJson = await res.json();
  if (resJson.errors) {
    throw (JSON.stringify(resJson.errors));
  }
  return resJson.data;
};
