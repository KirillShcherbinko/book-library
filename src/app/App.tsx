import { useAuthInit } from '@/entities/user';

import { AppRouter } from './router';

function App() {
  useAuthInit();
  
  return <AppRouter />;
}

export default App;
