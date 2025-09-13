import { Outlet } from 'react-router-dom';

import { AppShell } from '@mantine/core';
import { useHeadroom } from '@mantine/hooks';

export const ManiLayout = () => {
  const isPinned = useHeadroom({ fixedAt: 120 });
  return (
    <AppShell padding="md" header={{ height: 52, collapsed: !isPinned, offset: false }}>
      <AppShell.Main h="100%" mih="100vh">
        <Outlet />
      </AppShell.Main>
    </AppShell>
  );
};
