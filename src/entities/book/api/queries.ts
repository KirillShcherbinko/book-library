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

export const SEARCH_BOOKS = gql`
  query SearchBooks($searchQuery: String!, $limit: Int!, $page: Int!) {
    searchBooks(searchQuery: $searchQuery, limit: $limit, page: $page) {
      key
      title
      authors
      coverId
    }
  }
`;

export const GET_USER_BOOKS = gql`
  query UserBooks($limit: Int!, $page: Int!) {
    userBooks(limit: $limit, page: $page) {
      key
      title
      authors
      coverId
    }
  }
`;
