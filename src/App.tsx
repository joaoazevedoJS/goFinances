import { FC } from 'react';

import { Header } from './components/Header';

import GlobalStyle from './styles/global';

const App: FC = () => {
  return (
    <>
      <GlobalStyle />

      <Header />
    </>
  );
};

export default App;
