import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';

import '@mantine/carousel/styles.css';
import '@mantine/core/styles.css';
import { Notifications } from '@mantine/notifications';
import '@mantine/notifications/styles.css';

import App from './app/App.tsx';
import { ThemeProvider } from './entities/theme';
import './index.css';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ThemeProvider>
      <BrowserRouter>
        <Notifications />
        <App />
      </BrowserRouter>
    </ThemeProvider>
  </StrictMode>,
);
