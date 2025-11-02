import { useLocation, useNavigate } from 'react-router-dom';

import { Burger, Drawer, Tabs, useMantineTheme } from '@mantine/core';
import { useDisclosure, useMediaQuery } from '@mantine/hooks';

import type { TTabLinksData } from '../model/types';
import Style from './tab-links.module.css';

type TTabLinksProps = {
  tabLinks: TTabLinksData[];
};

export const TabLinks = ({ tabLinks }: TTabLinksProps) => {
  const navigate = useNavigate();
  const location = useLocation();

  const [opened, { toggle, close }] = useDisclosure(false);

  const theme = useMantineTheme();
  const isMobile = useMediaQuery(`(max-width: ${theme.breakpoints.md})`);

  const possibleTabs = tabLinks.filter((tabLink) => {
    return location.pathname.startsWith(tabLink.route);
  });

  const currentTab = possibleTabs[possibleTabs.length - 1].value || tabLinks[0].value;

  const handleTabChange = (value: string | null) => {
    if (!value) return;

    const newTab = tabLinks.find((tabLink) => tabLink.value === value);
    if (newTab && newTab.route !== location.pathname) {
      navigate(newTab.route, { replace: true });
    }

    if (isMobile) {
      close();
    }
  };

  const tabs = (
    <Tabs
      classNames={{ list: Style.TabsList, tab: Style.Tab }}
      orientation={isMobile ? 'vertical' : 'horizontal'}
      value={currentTab}
      onChange={handleTabChange}
    >
      <Tabs.List grow={isMobile}>
        {tabLinks.map((tabLink) => (
          <Tabs.Tab key={tabLink.value} value={tabLink.value} aria-label={tabLink.label}>
            {tabLink.label}
          </Tabs.Tab>
        ))}
      </Tabs.List>
    </Tabs>
  );

  return isMobile ? (
    <>
      <Burger opened={opened} onClick={toggle} aria-label="Toggle navigation" />
      <Drawer opened={opened} onClose={close} title="Navigation">
        {tabs}
      </Drawer>
    </>
  ) : (
    tabs
  );
};
