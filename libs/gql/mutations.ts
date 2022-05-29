import { gql } from "@apollo/client";

export const UPDATE_USER = gql`
mutation UpdateUser($username: String) {
  update_users(_set: {username: $username}, where: {}) {
    returning {
      id
      name
      username
    }
  }
}
`;

export const INSERT_COMMENT = gql`
mutation InsertComment($content: String) {
  insert_comments_one(object: {content: $content}) {
    id
    content
    created_at
    downvotes
    updated_at
    upvotes
    user_id
    reply_to {
      id
      user_id
    }
  }
}
`;

export const DELETE_COMMENT = gql`
mutation DeleteComment($id: Int!) {
  delete_comments_by_pk(id: $id) {
    id
  }
}
`;

export const UPDATE_COMMENT = gql`
mutation UpdateComment($id: Int!, $content: String) {
  update_comments_by_pk(pk_columns: {id: $id}, _set: {content: $content}) {
    id
    content
    created_at
    downvotes
    updated_at
    upvotes
    user_id
    reply_to {
      id
      user_id
    }
  }
}
`;
