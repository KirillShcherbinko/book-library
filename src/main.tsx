import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';

import { ApolloProvider } from '@apollo/client/react';
import { MantineProvider } from '@mantine/core';

import App from './app/App.tsx';
import './index.css';
import { client } from './shared';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <MantineProvider>
      <ApolloProvider client={client}>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </ApolloProvider>
    </MantineProvider>
  </StrictMode>,
);
