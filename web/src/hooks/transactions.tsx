import { createContext, FC, useCallback, useContext, useState } from 'react';
import { NewTransactionsModal } from '../components/NewTransactionsModal';

interface TransactionsContextData {
  isNewTransactionModalOpen: boolean;
  handleOpenModalTransaction(): void;
  handleCloseModalTransaction(): void;
}

const TransactionsContext = createContext({} as TransactionsContextData);

const TransactionsProvider: FC = ({ children }) => {
  const [isNewTransactionModalOpen, setIsNewTransactionModalOpen] = useState(
    false,
  );

  const handleOpenModalTransaction = useCallback(() => {
    setIsNewTransactionModalOpen(true);
  }, []);

  const handleCloseModalTransaction = useCallback(() => {
    setIsNewTransactionModalOpen(false);
  }, []);

  return (
    <TransactionsContext.Provider
      value={{
        isNewTransactionModalOpen,
        handleOpenModalTransaction,
        handleCloseModalTransaction,
      }}
    >
      <NewTransactionsModal />

      {children}
    </TransactionsContext.Provider>
  );
};

function useTransactions(): TransactionsContextData {
  const context = useContext(TransactionsContext);

  if (!context) {
    throw new Error('useTransactions must be used within TransactionsProvider');
  }

  return context;
}

export { TransactionsProvider, useTransactions };
