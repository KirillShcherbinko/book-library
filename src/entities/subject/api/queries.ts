import { gql } from '@apollo/client';

export const GET_POPULAR_BOOKS_SUBJECTS = gql`
  query GetPopularBooksSubjects {
    popularBooksSubjects
  }
`;

export const GET_BASIC_SUBJECTS = gql`
  query GetBasicSubjects {
    subjects {
      title
      icon
    }
  }
`;

export const GET_ALL_SUBJECTS = gql`
  query GetBasicSubjects {
    subjects {
      title
      subjects
    }
  }
`;
