import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';

import { ApolloProvider } from '@apollo/client/react';
import '@mantine/carousel/styles.css';
import '@mantine/core/styles.css';

import App from './app/App.tsx';
import { ThemeProvider } from './entities/theme';
import './index.css';
import { client } from './shared';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ThemeProvider>
      <ApolloProvider client={client}>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </ApolloProvider>
    </ThemeProvider>
  </StrictMode>,
);
