import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';

import { ApolloClient, ApolloLink, HttpLink, InMemoryCache } from '@apollo/client';
import { ApolloProvider } from '@apollo/client/react';
import '@mantine/carousel/styles.css';
import '@mantine/core/styles.css';

import App from './app/App.tsx';
import { ThemeProvider } from './entities/theme';
import { authLink, errorLink } from './entities/user';
import './index.css';

const httpLink = new HttpLink({
  uri: import.meta.env.BASE_URL,
  credentials: 'include',
});

const client = new ApolloClient({
  link: ApolloLink.from([errorLink, authLink, httpLink]),
  cache: new InMemoryCache(),
});

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
