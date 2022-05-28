import { gql } from "@apollo/client";

export const COMMENTS_SUBSCRIPTION = gql`
subscription CommentsSubscription {
  comments(order_by: {id: asc}) {
    content
    created_at
    downvotes
    id
    reply_to {
      id
      user_id
    }
    updated_at
    upvotes
    user_id
    user {
      id
      last_seen
      name
      username
    }
  }
}
`;
