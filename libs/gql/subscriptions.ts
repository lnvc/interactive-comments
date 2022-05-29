import { gql } from "@apollo/client";

export const COMMENTS_SUBSCRIPTION = gql`
subscription CommentsSubscription {
  comments(where: {reply_to_id: {_is_null: true}}, order_by: {created_at: asc}) {
    id
    content
    downvotes
    created_at
    reply_to_id
    updated_at
    upvotes
    user_id
    user {
      created_at
      id
      last_seen
      name
      updated_at
      username
    }
    replies(order_by: {id: asc}) {
      id
      content
      created_at
      downvotes
      reply_to_id
      updated_at
      upvotes
      user_id
      user {
        id
        name
        username
        updated_at
        last_seen
        created_at
      }
    }
  }
}
`;
