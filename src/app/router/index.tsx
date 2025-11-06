import { BookPage, prefixes } from '@/pages/book-page';
import { BooksPage } from '@/pages/books-page';
import { HomePage } from '@/pages/home-page';
import { AuthLayout } from '@/pages/layouts/auth-layout';
import { ManiLayout } from '@/pages/layouts/main-layout';
import { LibraryPage } from '@/pages/library-page';
import { LoginPage } from '@/pages/login-page';
import { RegisterPage } from '@/pages/register-page';
import { SearchPage } from '@/pages/search-page';
import { SubjectsPage } from '@/pages/subjects-page';

import { Route, Routes } from 'react-router-dom';

import { ProtectedRoute } from '@/features/protected-route';

export const AppRouter = () => {
  return (
    <Routes>
      <Route path="/" element={<ManiLayout />}>
        <Route index element={<HomePage />} />
        <Route path="subjects" element={<SubjectsPage />} />
        <Route path="search" element={<SearchPage />} />
        <Route
          path="library"
          element={
            <ProtectedRoute isAuthRequired={true}>
              <LibraryPage />
            </ProtectedRoute>
          }
        />
        <Route path="books/:subject" element={<BooksPage />} />
        <Route path="subjects/books/:subject" element={<BooksPage />} />
        <Route
          path="auth"
          element={
            <ProtectedRoute>
              <AuthLayout />
            </ProtectedRoute>
          }
        >
          <Route path="login" element={<LoginPage />} />
          <Route path="register" element={<RegisterPage />} />
        </Route>
        {prefixes.map((prefix) => (
          <Route
            key={prefix}
            path={`${prefix ? prefix + '/' : ''}book/:key`}
            element={<BookPage />}
          />
        ))}
      </Route>
    </Routes>
  );
};
