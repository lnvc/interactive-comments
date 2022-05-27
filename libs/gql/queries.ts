import { gql } from "@apollo/client";

export const GET_COMMENTS = `
query GetComments {
  comments {
    content
    created_at
    downvotes
    id
    updated_at
    upvotes
    user {
      id
      last_seen
      name
      username
    }
    reply_to {
      id
      user_id
    }
  }
}
`;

export const GET_USER = gql`
query GetUser($name: String) {
  users(limit: 1, where: {name: {_eq: $name}}) {
    username
    name
    id
    last_seen
  }
}
`;
