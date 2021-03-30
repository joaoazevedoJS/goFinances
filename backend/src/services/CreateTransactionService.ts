import { getCustomRepository, getRepository } from 'typeorm';

import AppError from '../errors/AppError';

import Category from '../models/Category';
import Transaction from '../models/Transaction';

import TransactionsRepository from '../repositories/TransactionsRepository';

interface Request {
  title: string;
  value: number;
  type: string;
  category: string;
}

class CreateTransactionService {
  public async execute({
    title,
    value,
    type,
    category,
  }: Request): Promise<Transaction> {
    if (!category) {
      throw new AppError('Category not informed');
    }

    const categoriesRepositories = getRepository(Category);

    const transactionsRepositories = getCustomRepository(
      TransactionsRepository,
    );

    const { total } = await transactionsRepositories.getBalance();

    if (type === 'outcome' && total - value < 0) {
      throw new AppError('You not have money available');
    }

    let categoryColumn = await categoriesRepositories.findOne({
      where: { title: category },
    });

    if (!categoryColumn) {
      categoryColumn = categoriesRepositories.create({ title: category });

      await categoriesRepositories.save(categoryColumn);
    }

    if (type !== 'income' && type !== 'outcome') {
      throw new AppError('Type is invalid');
    }

    const transaction = transactionsRepositories.create({
      title,
      value,
      type,
      category: categoryColumn,
    });

    await transactionsRepositories.save(transaction);

    return transaction;
  }
}

export default CreateTransactionService;
