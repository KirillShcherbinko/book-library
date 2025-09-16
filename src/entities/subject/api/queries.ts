import { gql } from '@apollo/client';

export const GET_POPULAR_BOOKS_SUBJECTS = gql`
  query GetPopularBooksSubjects {
    popularBooksSubjects
  }
`;
