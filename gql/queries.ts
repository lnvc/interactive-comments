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
    }
  }
}
`;
