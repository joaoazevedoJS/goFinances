import { FC } from 'react';
import { TransactionsProvider } from './hooks/transactions';

import { Dashboard } from './pages/Dashboard';

import GlobalStyle from './styles/global';

const App: FC = () => {
  return (
    <>
      <GlobalStyle />

      <TransactionsProvider>
        <Dashboard />
      </TransactionsProvider>
    </>
  );
};

export default App;
