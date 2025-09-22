import { createTheme } from '@mantine/core';

import { lightColorsVariants } from './light-colors-variants';

export const theme = createTheme({
  fontFamily: 'Inter, sans-serif',
  colors: {
    light: lightColorsVariants,
  },
  components: {
    Text: {
      defaultProps: {
        lh: 1.2,
      },
    },
  },
});
