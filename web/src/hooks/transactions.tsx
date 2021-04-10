import {
  createContext,
  FC,
  useCallback,
  useContext,
  useEffect,
  useState,
} from 'react';

import { NewTransactionsModal } from '../components/NewTransactionsModal';

import fakeapi from '../services/fakeapi';

export interface TransactionData {
  id: number;
  title: string;
  type: 'deposit' | 'withdraw';
  category: string;
  value: number;
  createdAt: Date;
}

export interface CreateTransaction {
  title: string;
  value: number;
  category: string;
  type: string;
}

export interface Balance {
  deposits: number;
  withdrawns: number;
  total: number;
}

interface TransactionsContextData {
  transactions: TransactionData[];
  balance: Balance;
  isNewTransactionModalOpen: boolean;
  handleOpenModalTransaction(): void;
  handleCloseModalTransaction(): void;
  handleCreateTransaction(data: CreateTransaction): Promise<void>;
}

const TransactionsContext = createContext({} as TransactionsContextData);

const TransactionsProvider: FC = ({ children }) => {
  const [transactions, setTransactions] = useState<TransactionData[]>([]);
  const [balance, setBalance] = useState<Balance>({
    deposits: 0,
    withdrawns: 0,
    total: 0,
  });

  const [isNewTransactionModalOpen, setIsNewTransactionModalOpen] = useState(
    false,
  );

  useEffect(() => {
    fakeapi
      .get('/transactions')
      .then(response => setTransactions(response.data.transactions));
  }, []);

  useEffect(() => {
    const { deposits, withdrawns } = transactions.reduce(
      (acc, transaction) => {
        const value = Number(transaction.value);

        if (transaction.type === 'deposit') {
          acc.deposits += value;
        } else {
          acc.withdrawns += value;
        }

        return acc;
      },
      {
        deposits: 0,
        withdrawns: 0,
      },
    );

    const balanceTransaction = {
      deposits,
      withdrawns,
      total: deposits - withdrawns,
    };

    setBalance(balanceTransaction);
  }, [transactions]);

  const handleOpenModalTransaction = useCallback(() => {
    setIsNewTransactionModalOpen(true);
  }, []);

  const handleCloseModalTransaction = useCallback(() => {
    setIsNewTransactionModalOpen(false);
  }, []);

  const handleCreateTransaction = useCallback(
    async ({ title, type, category, value }: CreateTransaction) => {
      const transaction = {
        title,
        value,
        type,
        category,
        createdAt: new Date(),
      };

      const { data } = await fakeapi.post<{ transaction: TransactionData }>(
        '/transactions',
        transaction,
      );

      setTransactions([...transactions, data.transaction]);

      handleCloseModalTransaction();
    },
    [handleCloseModalTransaction, transactions],
  );

  return (
    <TransactionsContext.Provider
      value={{
        transactions,
        balance,
        isNewTransactionModalOpen,
        handleOpenModalTransaction,
        handleCloseModalTransaction,
        handleCreateTransaction,
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
