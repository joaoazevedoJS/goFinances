import { FC } from 'react';

import incomeImg from '../../assets/income.svg';
import outcomeImg from '../../assets/outcome.svg';
import totalImg from '../../assets/total.svg';
import { useTransactions } from '../../hooks/transactions';

import { Container } from './styles';

const Summary: FC = () => {
  const { balance } = useTransactions();

  return (
    <Container>
      <div>
        <header>
          <p>Entradas</p>

          <img src={incomeImg} alt="Entradas" />
        </header>

        <strong>
          {new Intl.NumberFormat('pt-BR', {
            style: 'currency',
            currency: 'BRL',
          }).format(balance.deposits)}
        </strong>
      </div>

      <div>
        <header>
          <p>Saídas</p>

          <img src={outcomeImg} alt="Saídas" />
        </header>

        <strong>
          -
          {new Intl.NumberFormat('pt-BR', {
            style: 'currency',
            currency: 'BRL',
          }).format(balance.withdrawns)}
        </strong>
      </div>

      <div>
        <header>
          <p>Total</p>

          <img src={totalImg} alt="Total" />
        </header>

        <strong>
          {new Intl.NumberFormat('pt-BR', {
            style: 'currency',
            currency: 'BRL',
          }).format(balance.total)}
        </strong>
      </div>
    </Container>
  );
};

export { Summary };
