import { BooksPage } from '@/pages/books-page';
import { HomePage } from '@/pages/home-page';
import { AuthLayout } from '@/pages/layouts/auth-layout';
import { ManiLayout } from '@/pages/layouts/main-layout';
import { LoginPage } from '@/pages/login-page';
import { RegisterPage } from '@/pages/register-page';
import { SearchPage } from '@/pages/search-page';
import { SubjectsPage } from '@/pages/subjects-page';

import { Route, Routes } from 'react-router-dom';

export const AppRouter = () => {
  return (
    <Routes>
      <Route path="/" element={<ManiLayout />}>
        <Route index element={<HomePage />} />
        <Route path="subjects" element={<SubjectsPage />} />
        <Route path="books/:subject" element={<BooksPage />} />
        <Route path="books/search" element={<SearchPage />} />
        <Route path="profile" element={<>profile</>} />
        <Route path="auth" element={<AuthLayout />}>
          <Route path="login" element={<LoginPage />} />
          <Route path="register" element={<RegisterPage />} />
        </Route>
      </Route>
    </Routes>
  );
};
