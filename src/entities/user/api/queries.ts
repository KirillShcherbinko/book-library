import { gql } from '@apollo/client';

export const LOGIN = gql`
  mutation Login($email: String, $password: String) {
    login(email: $email, password: $password) {
      userId
      accessToken
      refreshToken
    }
  }
`;

export const REGISTER = gql`
  mutation Register($email: String, $password: String) {
    register(email: $email, password: $password) {
      userId
      accessToken
      refreshToken
    }
  }
`;

export const LOGOUT = gql`
  mutation Logout {
    logout
  }
`;

export const REFRESH = gql`
  query Refresh {
    refresh {
      accessToken
    }
  }
`;
