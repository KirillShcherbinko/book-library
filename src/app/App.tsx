import { observer } from 'mobx-react-lite';

import { AppRouter } from './router';
import { ApolloProvider } from '@apollo/client/react';
import { client } from './api/apollo-client';

const App = observer(() => {
  return (
    <ApolloProvider client={client}>
      <AppRouter />
    </ApolloProvider>
  );
});

export default App;
