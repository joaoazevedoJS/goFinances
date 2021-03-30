import { FC } from 'react';
import { TransactionsProvider } from './transactions';

const Providers: FC = ({ children }) => {
  return <TransactionsProvider>{children}</TransactionsProvider>;
};

export { Providers };
