import { gql } from "@apollo/client";

export const GET_COMMENTS = `
query GetComments {
  comments(order_by: {id: asc}) {
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
  users {
    username
    name
    id
    last_seen
    created_at
    updated_at
  }
}
`;
