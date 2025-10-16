import { Outlet } from 'react-router-dom';

import { AppShell } from '@mantine/core';
import { useHeadroom } from '@mantine/hooks';

import { Header } from '@/widgets/header';
import { TabLinks } from '@/widgets/tab-links';

import { tabLinks } from '../config/tab-links';
import Style from './main-layout.module.css';

export const ManiLayout = () => {
  const isPinned = useHeadroom({ fixedAt: 120 });
  return (
    <AppShell padding={0} header={{ height: 64, collapsed: !isPinned, offset: false }}>
      <Header>
        <TabLinks tabLinks={tabLinks} />
      </Header>
      <AppShell.Main className={Style.MainLayout}>
        <Outlet />
      </AppShell.Main>
    </AppShell>
  );
};
