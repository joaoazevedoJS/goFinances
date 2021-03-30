import { getCustomRepository } from 'typeorm';

import AppError from '../errors/AppError';

import TransactionsRepository from '../repositories/TransactionsRepository';

class DeleteTransactionService {
  public async execute(id: string): Promise<void> {
    const transactionsRepositories = getCustomRepository(
      TransactionsRepository,
    );

    const transaction = await transactionsRepositories.findOne(id);

    if (!transaction) {
      throw new AppError('Transaction not found', 404);
    }

    await transactionsRepositories.delete(transaction.id);
  }
}

export default DeleteTransactionService;
