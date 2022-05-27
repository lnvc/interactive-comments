import { gql } from "@apollo/client";

export const UPDATE_USER = gql`
mutation UpdateUser($name: String, $username: String) {
  update_users(where: {name: {_eq: $name}}, _set: {username: $username}) {
    returning {
      id
      last_seen
      name
      username
    }
  }
}
`;
