import { useLocation, useNavigate } from 'react-router-dom';

import { Tabs } from '@mantine/core';

import type { TTabLinksData } from '../model/types';
import Style from './tab-links.module.css';

type TTabLinksProps = {
  tabLinks: TTabLinksData[];
};

export const TabLinks = ({ tabLinks }: TTabLinksProps) => {
  const navigate = useNavigate();
  const location = useLocation();

  const possibleTabs = tabLinks.filter((tabLink) => {
    return location.pathname.startsWith(tabLink.route);
  });

  const currentTab = possibleTabs[possibleTabs.length - 1].value || tabLinks[0].value;

  const handleTabChange = (value: string | null) => {
    const newTab = tabLinks.find((tabLink) => tabLink.value === value);
    if (newTab && newTab.route !== location.pathname) {
      navigate(newTab.route, { replace: true });
    }
  };

  return (
    <Tabs classNames={{ list: Style.TabsList }} value={currentTab} onChange={handleTabChange}>
      <Tabs.List>
        {tabLinks.map((tabLink) => (
          <Tabs.Tab key={tabLink.value} value={tabLink.value} aria-label={tabLink.label}>
            {tabLink.label}
          </Tabs.Tab>
        ))}
      </Tabs.List>
    </Tabs>
  );
};
