import { EntityRepository, Repository } from 'typeorm';

import Transaction from '../models/Transaction';

interface Balance {
  income: number;
  outcome: number;
  total: number;
}

@EntityRepository(Transaction)
class TransactionsRepository extends Repository<Transaction> {
  public async getBalance(): Promise<Balance> {
    const transactions = await this.find();

    const balance = transactions.reduce(
      (value, transaction) => {
        const balanceValue = value;
        const valueTransaction = Number(transaction.value);

        if (transaction.type === 'income') {
          balanceValue.income += valueTransaction;
          balanceValue.total += valueTransaction;
        } else {
          balanceValue.outcome += valueTransaction;
          balanceValue.total -= valueTransaction;
        }

        return balanceValue;
      },
      {
        income: 0,
        outcome: 0,
        total: 0,
      },
    );

    return balance;
  }
}

export default TransactionsRepository;
