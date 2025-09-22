import { Outlet } from 'react-router-dom';

import { AppShell } from '@mantine/core';
import { useHeadroom } from '@mantine/hooks';

import Style from './main-layout.module.css';

export const ManiLayout = () => {
  const isPinned = useHeadroom({ fixedAt: 120 });
  return (
    <AppShell padding={0} header={{ height: 52, collapsed: !isPinned, offset: false }}>
      <AppShell.Main className={Style.MainLayout}>
        <Outlet />
      </AppShell.Main>
    </AppShell>
  );
};
