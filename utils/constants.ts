export const HASURA_ADMIN = 'admin';
export const HASURA_USER = 'user';
export const HASURA_VISITOR = 'visitor';

export const HEADERS = {
  "content-type": "application/json",
  "x-hasura-admin-secret": process.env.NEXT_PUBLIC_HASURA_SECRET as string,
  "x-hasura-access-key": process.env.NEXT_PUBLIC_HASURA_SECRET as string,
  "x-hasura-role": HASURA_ADMIN,
};

export const USER_HEADER = {
  "x-hasura-role": HASURA_USER,
};
