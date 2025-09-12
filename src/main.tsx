import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';

import { ApolloClient, HttpLink, InMemoryCache } from '@apollo/client';
import { ApolloProvider } from '@apollo/client/react';
import { MantineProvider } from '@mantine/core';

import App from './app/App.tsx';
import './index.css';

const client = new ApolloClient({
  link: new HttpLink({ uri: import.meta.env.VITE_BASE_URL }),
  cache: new InMemoryCache(),
});

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
