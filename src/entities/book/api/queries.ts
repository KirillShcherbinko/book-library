import { gql } from '@apollo/client';

export const GET_BOOKS_BY_SUBJECT = gql`
  query GetBooksBySubject($subject: String!, $limit: Int!, $page: Int!) {
    booksBySubject(subject: $subject, limit: $limit, page: $page) {
      key
      title
      authors
      coverId
    }
  }
`;
