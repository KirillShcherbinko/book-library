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

export const GET_BOOK = gql`
  query GetBook($key: String!) {
    book(key: $key) {
      key
      title
      authors
      description
      coverIds
      subjects
    }
  }
`;

export const ADD_BOOK = gql`
  mutation AddBook($book: BookInput!) {
    addBook(book: $Book)
  }
`;

export const REMOVE_BOOK = gql`
  mutation RemoveBook($bookKey: String!) {
    removeBokk(bookKey: $bookKey)
  }
`;
