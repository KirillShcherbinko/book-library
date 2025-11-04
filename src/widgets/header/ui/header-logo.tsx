import { useNavigate } from 'react-router-dom';

import { Image } from '@mantine/core';

import { LibraryLogo } from '@/shared';

export const HeaderLogo = () => {
  const navigate = useNavigate();

  return (
    <Image w={128 / 3} h={32} src={LibraryLogo} alt="Library logo" onClick={() => navigate('/')} />
  );
};
