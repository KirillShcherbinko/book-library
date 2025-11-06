import { Loader } from '@mantine/core';

import Style from './loader-layout.module.css';

export const LoaderLayout = () => {
  return (
    <div className={Style.LoaderLayout}>
      <Loader />
    </div>
  );
};
