import { gql } from '@apollo/client';

export const GET_BOOKS_BY_SUBJECT = gql`
  query GetBooksBySubject($subject: String!, $limit: Int!, $offset: Int!) {
    booksBySubject(subject: $subject, limit: $limit, offset: $offset) {
      key
      title
      authors
      coverId
    }
  }
`;

export const SEARCH_BOOKS = gql`
  query SearchBooks($searchQuery: String!, $limit: Int!, $offset: Int!) {
    searchBooks(searchQuery: $searchQuery, limit: $limit, offset: $offset) {
      key
      title
      authors
      coverId
    }
  }
`;

export const GET_USER_BOOKS = gql`
  query UserBooks($limit: Int!, $offset: Int!) {
    userBooks(limit: $limit, offset: $offset) {
      key
      title
      authors
      coverId
    }
  }
`;
