import { observer } from 'mobx-react-lite';

import type { ReactNode } from 'react';
import { Navigate } from 'react-router-dom';

import { authStore } from '@/entities/user';

type TProtectedRouteProps = {
  children: ReactNode;
  isAuthRequired?: boolean;
};

export const ProtectedRoute = observer(
  ({ children, isAuthRequired = false }: TProtectedRouteProps) => {
    const isValid = authStore.isValid();

    if (isAuthRequired && !isValid) {
      return <Navigate to="/auth/login" replace />;
    }

    if (!isAuthRequired && isValid) {
      return <Navigate to="/" replace />;
    }

    return children;
  },
);
