import fs from 'fs';
import csvParse from 'csv-parse';
import { getCustomRepository } from 'typeorm';

import Transaction from '../models/Transaction';
import TransactionsRepository from '../repositories/TransactionsRepository';

import CSVTransactionValidService from './CSVTransactionValidService';
import CreateTransactionService from './CreateTransactionService';

interface TransactionDTO {
  CSVTransactionValid: CSVTransactionValidService;
  createTransaction: CreateTransactionService;
}

interface File {
  path: string;
}

class ImportTransactionsService {
  private csvTransactionValid: CSVTransactionValidService;

  private createTransaction: CreateTransactionService;

  constructor({ createTransaction, CSVTransactionValid }: TransactionDTO) {
    this.csvTransactionValid = CSVTransactionValid;
    this.createTransaction = createTransaction;
  }

  async execute(files: File[]): Promise<Transaction[]> {
    const transactionsRepositories = getCustomRepository(
      TransactionsRepository,
    );

    const transactions: Array<Transaction> = [];

    await Promise.all(
      files.map(async file => {
        const csvStream = fs.createReadStream(file.path);

        const parseStream = csvParse({ ltrim: true, rtrim: true });

        const parseCSV = csvStream.pipe(parseStream);

        const titles: string[] = [];
        const columns: Array<string[]> = [];

        parseCSV.on('data', (line: string[]) => {
          if (titles.length === 0) {
            titles.push(...line);
          } else {
            columns.push(line);
          }
        });

        await new Promise(resolve => parseCSV.on('end', resolve));

        await fs.promises.unlink(file.path);

        const { total } = await transactionsRepositories.getBalance();

        this.csvTransactionValid.execute({ titles, columns, balance: total });

        const indexTitle = titles.indexOf('title');
        const indexType = titles.indexOf('type');
        const indexValue = titles.indexOf('value');
        const indexCategory = titles.indexOf('category');

        // eslint-disable-next-line no-restricted-syntax
        for (const lines of columns) {
          const title = lines[indexTitle];
          const value = Number(lines[indexValue]);
          const category = lines[indexCategory];
          const type = lines[indexType];

          // eslint-disable-next-line no-await-in-loop
          const transaction = await this.createTransaction.execute({
            title,
            value,
            category,
            type,
          });

          transactions.push(transaction);
        }
      }),
    );

    return transactions;
  }
}

export default ImportTransactionsService;
