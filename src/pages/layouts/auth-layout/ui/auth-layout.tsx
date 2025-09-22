import { Outlet } from 'react-router-dom';

import { Card } from '@mantine/core';

import Style from './auth-layout.module.css';

export const AuthLayout = () => {
  return (
    <div className={Style.AuthLayout}>
      <Card className={Style.Card} radius={24} padding={40}>
        <Outlet />
      </Card>
    </div>
  );
};
