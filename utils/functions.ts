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

export const getCommentsAndReplies = async (dataComments: any) => {
  const comments = [] as any;
  for (let i = 0; i < dataComments.comments.length; i++) {
    await comments.push(dataComments. comments[i]);
    if (dataComments.comments[i].replies.length) {
      await comments.splice(comments.length, 0, ...dataComments.comments[i].replies);
    }
  }
  return comments;
};
