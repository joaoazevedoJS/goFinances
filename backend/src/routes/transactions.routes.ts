import { Router } from 'express';
import { getCustomRepository } from 'typeorm';
import multer from 'multer';

import uploadConfig from '../config/upload';

import TransactionsRepository from '../repositories/TransactionsRepository';
import CreateTransactionService from '../services/CreateTransactionService';
import DeleteTransactionService from '../services/DeleteTransactionService';
import ImportTransactionsService from '../services/ImportTransactionsService';
import CSVTransactionValidService from '../services/CSVTransactionValidService';

const transactionsRouter = Router();
const upload = multer(uploadConfig);

interface File {
  path: string;
}

transactionsRouter.get('/', async (request, response) => {
  const transactionsRepositories = getCustomRepository(TransactionsRepository);

  const transactions = await transactionsRepositories.find();

  const balance = await transactionsRepositories.getBalance();

  return response.json({ transactions, balance });
});

transactionsRouter.post('/', async (request, response) => {
  const { title, value, type, category } = request.body;

  const createTransaction = new CreateTransactionService();

  const transaction = await createTransaction.execute({
    title,
    value,
    type,
    category,
  });

  return response
    .status(201)
    .json({ id: transaction.id, title, value, type, category });
});

transactionsRouter.delete('/:id', async (request, response) => {
  const { id } = request.params;

  const deleteTransaction = new DeleteTransactionService();

  await deleteTransaction.execute(id);

  return response.status(204).send();
});

transactionsRouter.post(
  '/import',
  upload.array('file'),
  async (request, response) => {
    const CSVTransactionValid = new CSVTransactionValidService();
    const createTransaction = new CreateTransactionService();

    const importTransactions = new ImportTransactionsService({
      CSVTransactionValid,
      createTransaction,
    });

    const files = request.files as File[];

    const transactions = await importTransactions.execute(files);

    return response.status(201).json(transactions);
  },
);

export default transactionsRouter;
