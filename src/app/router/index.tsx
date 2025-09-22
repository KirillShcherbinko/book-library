import { BooksPage } from '@/pages/books-page';
import { HomePage } from '@/pages/home-page';
import { ManiLayout } from '@/pages/layouts/main-layout';
import { LoginPage } from '@/pages/login-page';
import { RegisterPage } from '@/pages/register-page';

import { Outlet, Route, Routes } from 'react-router-dom';

export const AppRouter = () => {
  return (
    <Routes>
      <Route path="/" element={<ManiLayout />}>
        <Route index element={<HomePage />} />
        <Route path="books/subject/:query" element={<BooksPage />} />
        <Route path="books/search/:query" element={<BooksPage />} />
        <Route path="profile" />
        <Route
          path="auth"
          element={
            <>
              <Outlet />
            </>
          }
        >
          <Route path="login" element={<LoginPage />} />
          <Route path="register" element={<RegisterPage />} />
        </Route>
      </Route>
    </Routes>
  );
};
