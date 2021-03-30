import AppError from '../errors/AppError';

interface CSVTransactionDTO {
  titles: string[];
  columns: Array<string[]>;
  balance: number;
}

class CSVTransactionValidService {
  public execute({ titles, columns, balance }: CSVTransactionDTO): void {
    const types = ['title', 'type', 'value', 'category'];

    const containsAllTypes = types.filter(type => titles.includes(type));

    if (containsAllTypes.length !== types.length) {
      throw new AppError('CSV - Headers column invalid');
    }

    const indexType = titles.indexOf('type');
    const indexValue = titles.indexOf('value');

    columns.forEach(lines => {
      const type = lines[indexType];

      if (type !== 'outcome' && type !== 'income') {
        throw new AppError('CSV - Type is invalid');
      }
    });

    const csvTotalBalance = columns.reduce((value, transaction) => {
      let balanceValue = value;

      const valueTransaction = Number(transaction[indexValue]);

      if (transaction[indexType] === 'income') {
        balanceValue += valueTransaction;
      } else {
        balanceValue -= valueTransaction;
      }

      return balanceValue;
    }, 0);

    if (balance + csvTotalBalance < 0) {
      throw new AppError('CSV - You not have money available.', 401);
    }
  }
}

export default CSVTransactionValidService;
