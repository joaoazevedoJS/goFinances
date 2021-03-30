import { FC } from 'react';

import { Dashboard } from './pages/Dashboard';

import GlobalStyle from './styles/global';

const App: FC = () => {
  return (
    <>
      <GlobalStyle />

      <Dashboard />
    </>
  );
};

export default App;
