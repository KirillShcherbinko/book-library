import { ManiLayout } from '@/pages/layouts/main-layout';

import { Outlet, Route, Routes } from 'react-router-dom';

import { BookList } from '@/widgets/book-list';

export const AppRouter = () => {
  return (
    <Routes>
      <Route path="/" element={<ManiLayout />}>
        <Route index element={<BookList variant="scroll" />} />
        <Route path="categories" element={<>categories</>} />
        <Route path="profile" />
        <Route
          path="auth"
          element={
            <>
              <Outlet />
            </>
          }
        >
          <Route path="login" element={<>login</>} />
          <Route path="register" element={<>register</>} />
        </Route>
      </Route>
    </Routes>
  );
};
