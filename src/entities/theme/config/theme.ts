import { createTheme } from '@mantine/core';

export const theme = createTheme({
  fontFamily: 'Inter, sans-serif',
  components: {
    Text: {
      defaultProps: {
        lh: 1.2,
      },
    },
  },
});
