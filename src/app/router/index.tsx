import { Outlet, Route, Routes } from 'react-router-dom';

export const AppRouter = () => {
  return (
    <Routes>
      <Route
        path="/"
        element={
          <>
            <Outlet />
          </>
        }
      >
        <Route index element={<>home</>} />
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
